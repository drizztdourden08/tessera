/* @layer renderer-components @kind logic */
import { createClause } from '../../../data/filter/clause';
import type { FilterClause } from '../../../data/filter/clause';
import type { SchemaIndex } from '../../../data/schema/build-schema';
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';
import { NO, YES } from './clause-from-token.constants';

const lower = (text: string): string => text.trim().toLowerCase();

const fieldNamed = (index: SchemaIndex, key: string): FieldDescriptor | undefined =>
  index.all().find((field) => field.hidden !== true && [field.path, field.label].some((name) => lower(name) === key));

const enumValue = (field: FieldDescriptor, text: string): string | undefined => {
  const declared = field.declaredOptions?.find((option) => lower(option.label) === lower(text) || lower(String(option.value)) === lower(text));
  if (declared !== undefined) return String(declared.value);
  const plain = field.options?.find((option) => lower(option) === lower(text));
  if (plain !== undefined) return plain;
  return field.closed === true ? undefined : text;
};

const booleanClause = (field: FieldDescriptor, text: string): FilterClause | null => {
  if (YES.includes(lower(text))) return createClause(field.path, 'isTrue');
  return NO.includes(lower(text)) ? createClause(field.path, 'isFalse') : null;
};

const clauseOfKind = (field: FieldDescriptor, text: string): FilterClause | null => {
  if (field.kind === 'string') return createClause(field.path, 'contains', text);
  if (field.kind === 'idRef') return createClause(field.path, 'eq', text);
  if (field.kind === 'boolean') return booleanClause(field, text);
  if (field.kind === 'number') return Number.isFinite(Number(text)) ? createClause(field.path, 'eq', Number(text)) : null;
  if (field.kind !== 'enum') return null;
  const value = enumValue(field, text);
  return value === undefined ? null : createClause(field.path, 'anyOf', [value]);
};

const clauseFromToken = (index: SchemaIndex, token: string): FilterClause | null => {
  const at = token.indexOf(':');
  const text = token.slice(at + 1);
  if (at < 1 || text === '') return null;
  const field = fieldNamed(index, lower(token.slice(0, at)));
  return field === undefined ? null : clauseOfKind(field, text);
};

export { clauseFromToken };
