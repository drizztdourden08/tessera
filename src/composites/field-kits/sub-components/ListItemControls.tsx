/* @layer renderer-components @kind component */
import { IconButton } from '../../../primitives/IconButton';
import { Glyph } from '../../../primitives/Icon';
import { moved } from '../moved';
import { removedAt } from '../removedAt';
import { RemoveItemButton } from './RemoveItemButton';
import type { ListItemControlsProps } from './ListItemControls.type';

const ListItemControls = ({ list, index, disabled, onChange }: ListItemControlsProps) => (
  <>
    <IconButton
      label="Move up"
      disabled={disabled || index === 0}
      onClick={() => onChange(moved(list, index, index - 1))}
    >
      <Glyph name="arrowUp" />
    </IconButton>
    <IconButton
      label="Move down"
      disabled={disabled || index === list.length - 1}
      onClick={() => onChange(moved(list, index, index + 1))}
    >
      <Glyph name="arrowDown" />
    </IconButton>
    <RemoveItemButton disabled={disabled} onRemove={() => onChange(removedAt(list, index))} />
  </>
);

export { ListItemControls };
