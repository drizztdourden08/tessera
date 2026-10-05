/* @layer renderer-components @kind component */
import { IconButton } from '../../../primitives/IconButton';
import { Icon } from '../../../primitives/Icon';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { moved } from '../moved';
import { removedAt } from '../removed-at';
import { RemoveItemButton } from './RemoveItemButton';
import type { ListItemControlsProps } from './ListItemControls.type';

const ListItemControls = ({ list, index, disabled, onChange }: ListItemControlsProps) => {
  const { records } = useTesseraStrings();
  return (
    <>
      <IconButton
        label={records.moveUp}
        disabled={disabled || index === 0}
        onClick={() => onChange(moved(list, index, index - 1))}
      >
        <Icon name="arrow-up" />
      </IconButton>
      <IconButton
        label={records.moveDown}
        disabled={disabled || index === list.length - 1}
        onClick={() => onChange(moved(list, index, index + 1))}
      >
        <Icon name="arrow-down" />
      </IconButton>
      <RemoveItemButton disabled={disabled} onRemove={() => onChange(removedAt(list, index))} />
    </>
  );
};

export { ListItemControls };
