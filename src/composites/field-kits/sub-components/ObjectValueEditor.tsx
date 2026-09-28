/* @layer renderer-components @kind component */
import { Field } from '../../../primitives/Field';
import { Flex } from '../../../primitives/Flex';
import { Text } from '../../../primitives/Text';
import { keyOf } from '../key-of';
import { resolveFieldKit } from '../resolve-field-kit';
import { EMPTY } from './ObjectValueEditor.constants';
import type { EditorControlProps } from '../registry.type';

const asRecord = (value: unknown): Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value) ? (value as Record<string, unknown>) : {};

const ObjectValueEditor = (props: EditorControlProps) => {
  const { field, value, onChange, disabled, resolveIdRefOptions } = props;
  const record = asRecord(value);
  const children = (field.children ?? []).filter((child) => !child.hidden);
  if (!children.length) return <Text className="field-kit__muted">{EMPTY}</Text>;

  return (
    <Flex className="field-kit__object" direction="column" gap="sm">
      {children.map((child) => {
        const Control = resolveFieldKit(child.kind)?.EditorControl;
        const key = keyOf(child.path);
        if (!Control) return null;
        return (
          <Field key={child.path} label={child.label}>
            <Control
              field={child}
              value={record[key]}
              disabled={disabled}
              resolveIdRefOptions={resolveIdRefOptions}
              onChange={(next) => onChange({ ...record, [key]: next })}
            />
          </Field>
        );
      })}
    </Flex>
  );
};

export { ObjectValueEditor };
