/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Flex } from '../../../primitives/Flex';
import { Select } from '../../../primitives/Select';
import { Text } from '../../../primitives/Text';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Span } from '../../../primitives/text-elements';
import { ListItemControls } from '../../field-kits/sub-components/ListItemControls';
import { keyOf } from '../behavior/key-of';
import { rebaseField } from '../behavior/rebase-field';
import { detectUnionBranch } from '../behavior/union-branch';
import { EditorRow } from './EditorRow';
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';
import type { VariantArrayItemProps } from './VariantArrayItem.type';

const branchOptions = (branches: readonly FieldDescriptor[]) =>
  branches.map((branch) => ({ value: keyOf(branch), label: branch.label }));

const VariantArrayItem = (props: VariantArrayItemProps) => {
  const { element, address, list, index, branches, binding, depth, onWrite, onBranch } = props;
  const { records } = useTesseraStrings();
  const rebased = rebaseField(element, element.path, address);
  const branch = detectUnionBranch(rebased, list[index]);
  const shape = branch.status === 'resolved' ? branch.fields[0] : undefined;
  const currentKey = shape ? keyOf(shape) : '';

  return (
    <Box className="record-editor__array-item">
      <Flex className="record-editor__array-item-head" gap="xs" align="center">
        <Span tone="muted" className="record-editor__array-index">{records.itemPosition(index + 1)}</Span>
        <Select
          size="sm"
          value={currentKey}
          placeholder={records.shapePlaceholder}
          disabled={binding.disabled}
          options={branchOptions(branches)}
          onChange={(next) => onBranch(index, next)}
        />
        <ListItemControls list={list} index={index} disabled={binding.disabled} onChange={onWrite} />
      </Flex>
      {branch.status === 'resolved'
        ? (
          <Box className="record-editor__nested">
            {branch.fields.map((child) => (
              <EditorRow key={child.path} field={child} binding={binding} depth={depth + 1} />
            ))}
          </Box>
        )
        : <Text variant="caption" className="record-editor__note">{records.chooseShape}</Text>}
    </Box>
  );
};

export { VariantArrayItem };
