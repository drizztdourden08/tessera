/* @layer renderer-components @kind component */
import type { ReactNode } from 'react';
import { registerFieldTester } from '../../data/filter/tester-registry';
import { Tag } from '../../primitives/Tag';
import { Text } from '../../primitives/Text';
import { isNullish } from './coerce';
import { ABSENT } from './EnumKit.constants';
import { optionLabelOf } from './option-label';
import { registerFieldKit } from './registry';
import { toText } from './to-text';
import { EnumEditorControl } from './sub-components/EnumEditorControl';
import { EnumMultiSelect } from './sub-components/EnumMultiSelect';
import type { FieldTypeStrategy, FilterControlProps } from './registry.type';
import type { FieldDescriptor } from '../../data/schema/field-descriptor';
import '../../theme/field-kits.css';

const toSelection = (operand: unknown): readonly string[] => {
  if (Array.isArray(operand)) return operand.map(toText);
  return isNullish(operand) || operand === '' ? [] : [toText(operand)];
};

const test = (value: unknown, op: string, operand: unknown): boolean => {
  const selection = toSelection(operand);
  if (!selection.length) return true;
  const present = selection.includes(toText(value));
  if (op === 'anyOf') return present;
  if (op === 'noneOf') return !present;
  return true;
};

const FilterControl = (props: FilterControlProps) => {
  const { field, value, onChange } = props;
  return (
    <EnumMultiSelect
      options={field.options ?? []}
      selected={toSelection(value)}
      placeholder={field.label}
      labelOf={optionLabelOf(field)}
      onChange={(selected) => onChange([...selected])}
    />
  );
};

const renderCell = (value: unknown, field: FieldDescriptor): ReactNode => {
  if (isNullish(value) || value === '') return <Text className="field-kit__muted">{ABSENT}</Text>;
  return <Tag>{optionLabelOf(field)(toText(value))}</Tag>;
};

const enumKit: FieldTypeStrategy = { kind: 'enum', FilterControl, EditorControl: EnumEditorControl, renderCell };

registerFieldTester('enum', { test });
registerFieldKit(enumKit);
