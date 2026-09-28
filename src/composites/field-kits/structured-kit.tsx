/* @layer renderer-components @kind component */
import type { ReactNode } from 'react';
import { registerComparator, registerGroupKey } from '../../data/table/strategy-registry';
import { registerFieldTester } from '../../data/filter/tester-registry';
import { Text } from '../../primitives/Text';
import { isNullish } from './coerce';
import { nullsLast } from './compare';
import { naturalTextCompare } from './naturalTextCompare';
import { registerFieldKit } from './registry';
import { ABSENT } from './structured-kit.constants';
import { summarizeEntries } from './summary';
import { testExistence } from './testExistence';
import { toJson } from './toJson';
import { truncate } from './truncate';
import type { EditorControlProps, FieldControl, FieldTypeStrategy } from './registry.type';
import type { FieldKind } from '../../data/schema/field-descriptor';
import '../../theme/field-kits.css';

const structuredCompare = nullsLast((a, b) => naturalTextCompare(toJson(a), toJson(b)));

const structuredGroupKey = (value: unknown): string => (isNullish(value) ? '' : truncate(toJson(value)));

const FilterControl = () => null;

const renderCell = (value: unknown): ReactNode => {
  if (isNullish(value)) return <Text className="field-kit__muted">{ABSENT}</Text>;
  return (
    <Text className="field-kit__text" title={toJson(value)}>
      {truncate(summarizeEntries(value))}
    </Text>
  );
};

const createPlaceholderEditor = (note: string) => {
  const EditorControl = (props: EditorControlProps) => {
    const { field } = props;
    return <Text className="field-kit__placeholder" title={field.path}>{note}</Text>;
  };
  return EditorControl;
};

const createStructuredKit = (kind: FieldKind, editor: string | FieldControl<EditorControlProps>): FieldTypeStrategy => {
  const kit: FieldTypeStrategy = {
    kind,
    FilterControl,
    EditorControl: typeof editor === 'string' ? createPlaceholderEditor(editor) : editor,
    renderCell,
  };
  registerFieldTester(kind, { test: testExistence });
  registerComparator(kind, structuredCompare);
  registerGroupKey(kind, structuredGroupKey);
  registerFieldKit(kit);
  return kit;
};

export { createStructuredKit };
