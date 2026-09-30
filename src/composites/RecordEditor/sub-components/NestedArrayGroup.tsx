/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Flex } from '../../../primitives/Flex';
import { Text } from '../../../primitives/Text';
import { Span } from '../../../primitives/text-elements';
import { countLabel } from '../../field-kits/count-label';
import { blankFor } from '../../field-kits/blank-for';
import { replacedAt } from '../../field-kits/list-edits';
import { removedAt } from '../../field-kits/removed-at';
import { AddItemButton } from '../../field-kits/sub-components/AddItemButton';
import { RemoveItemButton } from '../../field-kits/sub-components/RemoveItemButton';
import type { NestedArrayGroupProps } from './NestedArrayGroup.type';

const NestedArrayGroup = (props: NestedArrayGroupProps) => {
  const { address, index, row, inner, Control, binding, addLabel, onRowChange, onRemove } = props;
  const { disabled } = binding;

  return (
    <Box className="record-editor__array-item">
      <Flex className="record-editor__array-item-head" gap="xs" align="center">
        <Span tone="muted" className="record-editor__array-index">{`#${index + 1}`}</Span>
        <RemoveItemButton disabled={disabled} onRemove={onRemove} />
      </Flex>
      <Flex direction="column" gap="xs" className="record-editor__nested">
        {!row.length && <Text variant="caption" className="record-editor__empty">{countLabel(0)}</Text>}
        {row.map((entry, innerIndex) => (
          <Flex key={`${address}.${innerIndex}`} gap="xs" align="center">
            <Control
              field={inner}
              value={entry}
              disabled={disabled}
              resolveIdRefOptions={binding.resolveIdRefOptions}
              onChange={(next) => onRowChange(replacedAt(row, innerIndex, next))}
            />
            <RemoveItemButton disabled={disabled} onRemove={() => onRowChange(removedAt(row, innerIndex))} />
          </Flex>
        ))}
        <AddItemButton label={addLabel} disabled={disabled} onAdd={() => onRowChange([...row, blankFor(inner)])} />
      </Flex>
    </Box>
  );
};

export { NestedArrayGroup };
