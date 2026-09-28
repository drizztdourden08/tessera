/* @layer renderer-components @kind component */
import type { ReactNode } from 'react';
import { registerFieldTester } from '../../data/filter/tester-registry';
import { registerComparator } from '../../data/table/strategy-registry';
import { NumberInput } from '../../primitives/NumberInput';
import { Text } from '../../primitives/Text';
import { nullsLast } from './compare';
import { inputValue } from './inputValue';
import { HEX_WIDTH } from './number-kit.constants';
import { registerFieldKit } from './registry';
import { toNumber } from './toNumber';
import { toPair } from './toPair';
import { toText } from './toText';
import { NumberEditorControl } from './sub-components/NumberEditorControl';
import { NumberRange } from './sub-components/NumberRange';
import type { FieldTypeStrategy, FilterControlProps } from './registry.type';
import type { FieldDescriptor } from '../../data/schema/field-descriptor';
import '../../theme/field-kits.css';

const testBetween = (subject: number, operand: unknown): boolean => {
  const [rawLow, rawHigh] = toPair(operand, operand);
  const low = toNumber(rawLow);
  const high = toNumber(rawHigh);
  const from = Number.isFinite(low) ? low : -Infinity;
  const to = Number.isFinite(high) ? high : Infinity;
  return subject >= Math.min(from, to) && subject <= Math.max(from, to);
};

const test = (value: unknown, op: string, operand: unknown): boolean => {
  const subject = toNumber(value);
  if (!Number.isFinite(subject)) return op === 'neq';
  if (op === 'between') return testBetween(subject, operand);
  const target = toNumber(operand);
  if (!Number.isFinite(target)) return true;
  if (op === 'eq') return subject === target;
  if (op === 'neq') return subject !== target;
  if (op === 'gt') return subject > target;
  if (op === 'gte') return subject >= target;
  if (op === 'lt') return subject < target;
  if (op === 'lte') return subject <= target;
  return true;
};

const compare = nullsLast((a, b) => {
  const left = toNumber(a);
  const right = toNumber(b);
  if (!Number.isFinite(left) && !Number.isFinite(right)) return 0;
  if (!Number.isFinite(left)) return 1;
  if (!Number.isFinite(right)) return -1;
  return left - right;
});

const formatCell = (raw: number, format: FieldDescriptor['format']): { text: string; title: string } => {
  if (!format) {
    const text = String(raw);
    return { text, title: text };
  }
  const hex = `0x${Math.trunc(raw).toString(16).toUpperCase().padStart(HEX_WIDTH[format], '0')}`;
  return { text: hex, title: `${hex} (${raw})` };
};

const FilterControl = (props: FilterControlProps) => {
  const { field, op, value, onChange } = props;
  if (op === 'between') return <NumberRange value={value} onChange={onChange} />;
  return (
    <NumberInput
      value={inputValue(value)}
      placeholder={field.label}
      onChange={(entered) => onChange(Number.isNaN(entered) ? null : entered)}
    />
  );
};

const renderCell = (value: unknown, field: FieldDescriptor): ReactNode => {
  const raw = toNumber(value);
  if (!Number.isFinite(raw)) {
    const text = toText(value);
    return <Text className="field-kit__num" title={text}>{text}</Text>;
  }
  const { text, title } = formatCell(raw, field.format);
  return <Text className="field-kit__num" title={title}>{text}</Text>;
};

const numberKit: FieldTypeStrategy = { kind: 'number', FilterControl, EditorControl: NumberEditorControl, renderCell };

registerFieldTester('number', { test });
registerComparator('number', compare);
registerFieldKit(numberKit);
