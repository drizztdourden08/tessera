/* @layer renderer-components @kind component */
import { anchorBoxOf } from '../behavior/anchor-box-of';
import { useOwnFallback } from '../behavior/useOwnFallback';
import { useRectFallback } from '../behavior/useRectFallback';
import { AnchoredFallback } from './AnchoredFallback';
import type { AnchoredPlacedProps } from './AnchoredPlaced.type';

const AnchoredPlaced = (props: AnchoredPlacedProps) => {
  const { anchor, anchorRect, boundary, placement, flip, fallback, popupRef, ...rest } = props;
  const own = useOwnFallback(fallback === undefined && anchorRect === undefined, anchor, placement);
  const fromRect = useRectFallback(anchorRect, placement, popupRef);
  const placed = anchorRect === undefined ? own : fromRect;

  return (
    <AnchoredFallback
      {...rest}
      anchorBox={() => anchorBoxOf(anchorRect, anchor)}
      boundaryRef={boundary}
      fit={flip || boundary !== undefined}
      fallback={fallback === undefined ? placed : fallback}
      place={fallback === undefined ? placement : undefined}
    />
  );
};

export { AnchoredPlaced };
