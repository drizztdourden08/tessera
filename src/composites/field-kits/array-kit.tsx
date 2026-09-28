/* @layer renderer-components @kind component */
import type { ReactNode } from 'react';
import { registerFieldTester } from '../../data/filter/tester-registry';
import { registerComparator, registerGroupKey } from '../../data/table/strategy-registry';
import { NumberInput } from '../../primitives/NumberInput';
import { Text } from '../../primitives/Text';
import { LENGTH_OPS } from './array-kit.constants';
import { isNullish } from './coerce';
import { nullsLast } from './compare';
import { countLabel } from './countLabel';
import { isBlankOperand } from './isBlankOperand';
import { registerFieldKit } from './registry';
import { summarizeList } from './summarizeList';
import { toJson } from './toJson';
import { toList } from './toList';
import { toNumber } from './toNumber';
import { toText } from './toText';
import { ArrayValueEditor } from './sub-components/ArrayValueEditor';
import { ElementValueInput } from './sub-components/ElementValueInput';
import { IdRefBadgeList } from './sub-components/IdRefBadgeList';
import type { CellRenderOptions, FieldTypeStrategy, FilterControlProps } from './registry.type';
import type { FieldDescriptor } from '../../data/schema/field-descriptor';
import '../../theme/field-kits.css';

const elementMatches = (element: unknown, needle: string): boolean => {
  if (element !== null && typeof element === 'object') {
    return toJson(element).toLowerCase().includes(needle);
  }
  return toText(element).toLowerCase() === needle;
};

const test = (value: unknown, op: string, operand: unknown): boolean => {
  const list = toList(value);
  if (op === 'isEmpty') return list.length === 0;
  if (op === 'isNotEmpty') return list.length > 0;
  if (isBlankOperand(operand)) return true;
  if (op === 'containsValue') {
    const needle = toText(operand).trim().toLowerCase();
    return list.some((element) => elementMatches(element, needle));
  }
  const target = toNumber(operand);
  if (!Number.isFinite(target)) return true;
  if (op === 'lengthEq') return list.length === target;
  if (op === 'lengthGt') return list.length > target;
  if (op === 'lengthLt') return list.length < target;
  return true;
};

const compare = nullsLast((a, b) => toList(a).length - toList(b).length);

const groupKey = (value: unknown): string => (isNullish(value) ? '' : countLabel(toList(value).length));

const FilterControl = (props: FilterControlProps) => {
  const { field, op, value, onChange } = props;
  if (LENGTH_OPS.includes(op)) {
    const parsed = toNumber(value);
    return (
      <NumberInput
        value={Number.isFinite(parsed) ? parsed : ''}
        min={0}
        placeholder="count"
        onChange={(entered) => onChange(Number.isNaN(entered) ? null : entered)}
      />
    );
  }
  return (
    <ElementValueInput
      element={field.of}
      value={value}
      placeholder={field.label}
      onChange={onChange}
    />
  );
};

const renderCell = (value: unknown, field: FieldDescriptor, options?: CellRenderOptions): ReactNode => {
  const list = toList(value);
  if (!list.length) return <Text className="field-kit__muted">{countLabel(0)}</Text>;
  if (field.of?.kind === 'idRef') {
    return (
      <IdRefBadgeList
        list={list}
        targetKind={field.of.targetKind}
        resolveIdRefDisplay={options?.resolveIdRefDisplay}
      />
    );
  }
  return (
    <Text className="field-kit__text" title={`${field.label}: ${toJson(list)}`}>
      {summarizeList(list)}
    </Text>
  );
};

const arrayKit: FieldTypeStrategy = { kind: 'array', FilterControl, EditorControl: ArrayValueEditor, renderCell };

registerFieldTester('array', { test });
registerComparator('array', compare);
registerGroupKey('array', groupKey);
registerFieldKit(arrayKit);
