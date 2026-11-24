/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { DEFAULT_CLEAR_LABEL } from './DropSlot.constants';
import { dropSlotClasses } from './behavior/drop-slot-classes';
import { useDropSlot } from './behavior/useDropSlot';
import { DropSlotBody } from './sub-components/DropSlotBody';
import type { DropSlotProps } from './DropSlot.type';
import './DropSlot.css';

const DropSlot = (props: DropSlotProps) => {
  const { label, children, filled, size = 'md', clearLabel = DEFAULT_CLEAR_LABEL, disabled, onClear, onPick, className } = props;
  const bind = useDropSlot(props);
  const holds = filled ?? children !== undefined;
  return (
    <Box
      role="group"
      aria-label={label}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      className={dropSlotClasses(size, className)}
      data-filled={holds ? '' : undefined}
      data-over={bind.over ? '' : undefined}
      onClick={disabled ? undefined : onPick}
      onDragEnter={bind.onDragEnter}
      onDragOver={bind.onDragOver}
      onDragLeave={bind.onDragLeave}
      onDrop={bind.onDrop}
      onKeyDown={bind.onKeyDown}
    >
      <DropSlotBody holds={holds} label={label} clearLabel={clearLabel} disabled={disabled} onClear={onClear}>{children}</DropSlotBody>
    </Box>
  );
};

export { DropSlot };
