/* @layer renderer-components @kind component */
import { Anchored } from '../../../primitives/Anchored';
import { keepSegmentFocus } from '../behavior/keep-segment-focus';
import type { SlotPopoverProps } from './SlotPopover.type';

const SlotPopover = (props: SlotPopoverProps) => {
  const { field, anchorRef, variant, children } = props;
  return (
    <Anchored
      ref={field.popoverRef}
      anchorRef={anchorRef}
      placement="bottom-start"
      className={`dynamic-input__panel dynamic-input__panel--${variant} control-size--${field.size}`}
      onMouseDown={keepSegmentFocus}
    >
      {children}
    </Anchored>
  );
};

export { SlotPopover };
