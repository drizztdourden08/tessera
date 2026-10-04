/* @layer renderer-components @kind component */
import type { ReactNode } from 'react';
import { findOperator } from '../../data/filter/operators';
import { Link } from '../../primitives/Link';
import { Text } from '../../primitives/Text';
import { isEmptyValue } from './emptiness';
import { ABSENT } from './IdRefKit.constants';
import { formatIdRefDisplay } from './id-ref-format';
import { registerTextKit } from './register-text-kit';
import { toText } from './to-text';
import { IdInput } from './sub-components/IdInput';
import { IdRefEditorControl } from './sub-components/IdRefEditorControl';
import type { CellRenderOptions, FieldTypeStrategy, FilterControlProps } from './registry.type';
import type { FieldDescriptor } from '../../data/schema/field-descriptor';
import '../../theme/field-kits.css';

const test = (value: unknown, op: string, operand: unknown): boolean => {
  if (op === 'isEmpty') return isEmptyValue(value);
  if (op === 'isNotEmpty') return !isEmptyValue(value);
  const id = toText(value).trim();
  const target = toText(operand).trim();
  if (!target) return true;
  if (op === 'eq') return id === target;
  if (op === 'neq') return id !== target;
  return true;
};

const FilterControl = (props: FilterControlProps) => {
  const { field, op, value, onChange } = props;
  if (findOperator(field.kind, op)?.arity === 'none') return null;
  return <IdInput placeholder={field.label} value={value} onChange={onChange} />;
};

const renderCell = (
  value: unknown,
  field: FieldDescriptor,
  options?: CellRenderOptions,
): ReactNode => {
  const id = toText(value).trim();
  if (!id) return <Text className="field-kit__muted">{ABSENT}</Text>;
  const ref = {
    className: 'field-kit__ref',
    title: field.targetKind ? `${field.targetKind}: ${id}` : id,
    'data-id-ref': id,
    'data-target-kind': field.targetKind,
  };
  const text = formatIdRefDisplay(id, options?.display);
  const href = options?.resolveIdRefHref?.(id, field.targetKind);
  if (href) return <Link {...ref} variant="subtle" href={href}>{text}</Link>;
  return <Text {...ref}>{text}</Text>;
};

const idRefKit: FieldTypeStrategy = { kind: 'idRef', FilterControl, EditorControl: IdRefEditorControl, renderCell };

registerTextKit(idRefKit, test);
