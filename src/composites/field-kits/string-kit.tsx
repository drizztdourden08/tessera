/* @layer renderer-components @kind component */
import type { ReactNode } from 'react';
import { findOperator } from '../../data/filter/operators';
import { Text } from '../../primitives/Text';
import { TextInput } from '../../primitives/TextInput';
import { isEmptyValue } from './emptiness';
import { registerTextKit } from './register-text-kit';
import { toText } from './toText';
import { StringEditorControl } from './sub-components/StringEditorControl';
import type { FieldTypeStrategy, FilterControlProps } from './registry.type';
import type { FilterTestOptions } from '../../data/filter/tester-registry';
import '../../theme/field-kits.css';

const test = (
  value: unknown,
  op: string,
  operand: unknown,
  options?: FilterTestOptions,
): boolean => {
  if (op === 'isEmpty') return isEmptyValue(value);
  if (op === 'isNotEmpty') return !isEmptyValue(value);
  const fold = (text: string): string => (options?.caseSensitive ? text : text.toLowerCase());
  const text = fold(toText(value));
  const needle = fold(toText(operand));
  if (op === 'contains') return text.includes(needle);
  if (op === 'startsWith') return text.startsWith(needle);
  if (op === 'endsWith') return text.endsWith(needle);
  if (op === 'eq') return text === needle;
  if (op === 'neq') return text !== needle;
  return true;
};

const FilterControl = (props: FilterControlProps) => {
  const { field, op, value, onChange } = props;
  if (findOperator(field.kind, op)?.arity === 'none') return null;
  return (
    <TextInput
      value={toText(value)}
      placeholder={field.label}
      onChange={(event) => onChange(event.target.value)}
    />
  );
};

const renderCell = (value: unknown): ReactNode => {
  const text = toText(value);
  return <Text className="field-kit__text" title={text}>{text}</Text>;
};

const stringKit: FieldTypeStrategy = { kind: 'string', FilterControl, EditorControl: StringEditorControl, renderCell };

registerTextKit(stringKit, test);
