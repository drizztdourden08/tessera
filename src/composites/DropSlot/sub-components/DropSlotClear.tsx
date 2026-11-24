/* @layer renderer-components @kind component */
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';

interface DropSlotClearProps {
  label: string;
  disabled?: boolean;
  onClear: () => void;
}

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
