/* @layer renderer-components @kind logic */
import { isIdentityField } from '../../RecordEditor';
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';
import type { DisplaySubstitution } from './display-substitution.type';

const asId = (value: unknown): string => {
  if (value === undefined || value === null) return '';
  return typeof value === 'string' ? value.trim() : String(value).trim();
};

const substituteDisplay = (
  value: unknown,
  field: FieldDescriptor,
  substitution?: DisplaySubstitution,
): string | undefined => {
  if (field.kind !== 'idRef') return undefined;
  const id = asId(value);
  if (!id) return undefined;
  const { displayField, resolve, resolveDefault } = substitution ?? {};
  if (displayField && resolve && field.targetKind) return resolve(field.targetKind, id, displayField);
  if (isIdentityField(field.path)) return undefined;
  return resolveDefault?.(id, field.targetKind);
};

export { substituteDisplay };
