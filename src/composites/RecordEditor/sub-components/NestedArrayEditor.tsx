/* @layer renderer-components @kind component */
import { Flex } from '../../../primitives/Flex';
import { Text } from '../../../primitives/Text';
import { toList } from '../../field-kits/to-list';
import { countLabel } from '../../field-kits/count-label';
import { resolveFieldKit } from '../../field-kits';
import { replacedAt } from '../../field-kits/list-edits';
import { removedAt } from '../../field-kits/removed-at';
import { AddItemButton } from '../../field-kits/sub-components/AddItemButton';
import { ADD_INNER, ADD_OUTER } from './NestedArrayEditor.constants';
import { NestedArrayGroup } from './NestedArrayGroup';
import type { ArrayFieldEditorProps } from '../RecordEditor.type';
import '../../../theme/record-editor.css';

const NestedArrayEditor = (props: ArrayFieldEditorProps) => {
  const { field, value, binding } = props;
  const outer = field.of;
  const inner = outer?.kind === 'array' ? outer.of : undefined;
  const kit = inner ? resolveFieldKit(inner.kind) : undefined;
  if (!outer || !inner || !kit) return null;

  const rows = toList(value).map(toList);
  const { disabled } = binding;
  const write = (next: readonly (readonly unknown[])[]): void => binding.onChange(field.path, next);

  return (
    <Flex className="record-editor__array" direction="column" gap="sm">
      {!rows.length && <Text variant="caption" className="record-editor__empty">{countLabel(0)}</Text>}
      {rows.map((row, outerIndex) => (
        <NestedArrayGroup
          key={`${field.path}.${outerIndex}`}
          address={`${field.path}.${outerIndex}`}
          index={outerIndex}
          row={row}
          inner={inner}
          Control={kit.EditorControl}
          binding={binding}
          addLabel={ADD_INNER}
          onRowChange={(next) => write(replacedAt(rows, outerIndex, next))}
          onRemove={() => write(removedAt(rows, outerIndex))}
        />
      ))}
      <AddItemButton label={ADD_OUTER} disabled={disabled} onAdd={() => write([...rows, []])} />
    </Flex>
  );
};

export { NestedArrayEditor };
