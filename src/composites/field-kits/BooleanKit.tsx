/* @layer renderer-components @kind component */
import type { ReactNode } from 'react';
import { registerFieldTester } from '../../data/filter/tester-registry';
import { registerComparator, registerGroupKey } from '../../data/table/strategy-registry';
import { Badge } from '../../primitives/Badge';
import { Text } from '../../primitives/Text';
import { Toggle } from '../../primitives/Toggle';
import { isNullish } from './coerce';
import { nullsLast } from './compare';
import { ABSENT, NO, YES } from './BooleanKit.constants';
import { registerFieldKit } from './registry';
import type { EditorControlProps, FieldTypeStrategy } from './registry.type';
import '../../theme/field-kits.css';

const test = (value: unknown, op: string): boolean => {
  if (op === 'isTrue') return value === true;
  if (op === 'isFalse') return value === false;
  return true;
};

const compare = nullsLast((a, b) => Number(a === true) - Number(b === true));

const groupKey = (value: unknown): string => {
  if (isNullish(value)) return '';
  return value === true ? YES : NO;
};

const FilterControl = () => null;

const EditorControl = (props: EditorControlProps) => {
  const { field, value, onChange, disabled } = props;
  return <Toggle checked={value === true} disabled={disabled} onChange={onChange} aria-label={field.label} />;
};

const renderCell = (value: unknown): ReactNode => {
  if (isNullish(value)) return <Text className="field-kit__muted">{ABSENT}</Text>;
  return <Badge variant={value === true ? 'success' : 'neutral'}>{value === true ? YES : NO}</Badge>;
};

const booleanKit: FieldTypeStrategy = { kind: 'boolean', FilterControl, EditorControl, renderCell };

registerFieldTester('boolean', { test });
registerComparator('boolean', compare);
registerGroupKey('boolean', groupKey);
registerFieldKit(booleanKit);
