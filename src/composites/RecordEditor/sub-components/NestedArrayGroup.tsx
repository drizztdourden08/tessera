/* @layer renderer-components @kind component */
import { Flex } from '../../../primitives/Flex';
import { Text } from '../../../primitives/Text';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { countLabel } from '../../field-kits/count-label';
import { blankFor } from '../../../data/schema/blank-value/blank-for';
import { replacedAt } from '../../field-kits/list-edits';
import { removedAt } from '../../field-kits/removed-at';
import { AddItemButton } from '../../field-kits/sub-components/AddItemButton';
import { RemoveItemButton } from '../../field-kits/sub-components/RemoveItemButton';
import { ArrayItemFrame } from './ArrayItemFrame';
import type { NestedArrayGroupProps } from './NestedArrayGroup.type';

const NestedArrayGroup = (props: NestedArrayGroupProps) => {
  const { address, index, row, inner, Control, binding, addLabel, onRowChange, onRemove } = props;
  const { disabled } = binding;
  const { records } = useTesseraStrings();

  return (
    <ArrayItemFrame index={index} controls={<RemoveItemButton disabled={disabled} onRemove={onRemove} />}>
      <Flex direction="column" gap="xs" className="record-editor__nested">
        {!row.length && <Text variant="caption" className="record-editor__empty">{countLabel(0, records)}</Text>}
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
    </ArrayItemFrame>
  );
};

export { NestedArrayGroup };
