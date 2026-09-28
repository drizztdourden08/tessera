/* @layer renderer-components @kind component */
import type { ReactNode } from 'react';
import { registerFieldTester } from '../../data/filter/tester-registry';
import { registerComparator, registerGroupKey } from '../../data/table/strategy-registry';
import { Text } from '../../primitives/Text';
import { isNullish } from './coerce';
import { nullsLast } from './compare';
import { naturalTextCompare } from './natural-text-compare';
import { registerFieldKit } from './registry';
import { testExistence } from './test-existence';
import { toJson } from './to-json';
import { truncate } from './truncate';
import { ABSENT } from './UnknownKit.constants';
import type { EditorControlProps, FieldTypeStrategy } from './registry.type';
import '../../theme/field-kits.css';

const compare = nullsLast((a, b) => naturalTextCompare(toJson(a), toJson(b)));

const groupKey = (value: unknown): string => (isNullish(value) ? '' : truncate(toJson(value)));

const FilterControl = () => null;

const EditorControl = (props: EditorControlProps) => {
  const { value } = props;
  const json = toJson(value);
  return <Text className="field-kit__mono" title={json}>{truncate(json)}</Text>;
};

const renderCell = (value: unknown): ReactNode => {
  if (isNullish(value)) return <Text className="field-kit__muted">{ABSENT}</Text>;
  const json = toJson(value);
  return <Text className="field-kit__mono" title={json}>{truncate(json)}</Text>;
};

const unknownKit: FieldTypeStrategy = { kind: 'unknown', FilterControl, EditorControl, renderCell };

registerFieldTester('unknown', { test: testExistence });
registerComparator('unknown', compare);
registerGroupKey('unknown', groupKey);
registerFieldKit(unknownKit);

export { unknownKit };
