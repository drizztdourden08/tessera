/* @layer renderer-components @kind component */
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import type { DropSlotClearProps } from './DropSlotClear.type';

const DropSlotClear = ({ label, disabled, onClear }: DropSlotClearProps) => (
  <IconButton
    variant="quiet"
    size="2xs"
    label={label}
    disabled={disabled}
    className="drop-slot__clear"
    onClick={(event) => { event.stopPropagation(); onClear(); }}
    onKeyDown={(event) => event.stopPropagation()}
  >
    <Icon name="x" />
  </IconButton>
);

export { DropSlotClear };
