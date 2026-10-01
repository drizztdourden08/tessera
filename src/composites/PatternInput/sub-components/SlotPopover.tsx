/* @layer renderer-components @kind component */
import { Anchored, useAnchorSupport } from '../../../primitives/Anchored';
import { useAnchorTracking } from '../../../primitives/Portal';
import { keepSegmentFocus } from '../behavior/keep-segment-focus';
import { popoverFallback } from '../behavior/popover-fallback';
import type { SlotPopoverProps } from './SlotPopover.type';

const SlotPopover = (props: SlotPopoverProps) => {
  const { field, anchorRef, variant, children } = props;
  const native = useAnchorSupport(anchorRef);
  const { position } = useAnchorTracking({ active: !native, anchorRef, compute: popoverFallback });

  return (
    <Anchored
      ref={field.popoverRef}
      anchorRef={anchorRef}
      placement="bottom-start"
      fallback={position}
      className={`pattern-input__panel pattern-input__panel--${variant} control-size--${field.size}`}
      onMouseDown={keepSegmentFocus}
    >
      {children}
    </Anchored>
  );
};

export { SlotPopover };
