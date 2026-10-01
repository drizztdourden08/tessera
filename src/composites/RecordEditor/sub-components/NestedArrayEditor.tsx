/* @layer renderer-components @kind component */
import { Flex } from '../../../primitives/Flex';
import { Text } from '../../../primitives/Text';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { toList } from '../../field-kits/to-list';
import { countLabel } from '../../field-kits/count-label';
import { resolveFieldKit } from '../../field-kits';
import { replacedAt } from '../../field-kits/list-edits';
import { removedAt } from '../../field-kits/removed-at';
import { AddItemButton } from '../../field-kits/sub-components/AddItemButton';
import { NestedArrayGroup } from './NestedArrayGroup';
import type { ArrayFieldEditorProps } from '../RecordEditor.type';
import '../../../theme/record-editor.css';

const NestedArrayEditor = (props: ArrayFieldEditorProps) => {
  const { field, value, binding } = props;
  const { records } = useTesseraStrings();
  const outer = field.of;
  const inner = outer?.kind === 'array' ? outer.of : undefined;
  const kit = inner ? resolveFieldKit(inner.kind) : undefined;
  if (!outer || !inner || !kit) return null;

  const rows = toList(value).map(toList);
  const { disabled } = binding;
  const write = (next: readonly (readonly unknown[])[]): void => binding.onChange(field.path, next);

  return (
    <Flex className="record-editor__array" direction="column" gap="sm">
      {!rows.length && <Text variant="caption" className="record-editor__empty">{countLabel(0, records)}</Text>}
      {rows.map((row, outerIndex) => (
        <NestedArrayGroup
          key={`${field.path}.${outerIndex}`}
          address={`${field.path}.${outerIndex}`}
          index={outerIndex}
          row={row}
          inner={inner}
          Control={kit.EditorControl}
          binding={binding}
          addLabel={records.addValue}
          onRowChange={(next) => write(replacedAt(rows, outerIndex, next))}
          onRemove={() => write(removedAt(rows, outerIndex))}
        />
      ))}
      <AddItemButton label={records.addGroup} disabled={disabled} onAdd={() => write([...rows, []])} />
    </Flex>
  );
};

export { NestedArrayEditor };
