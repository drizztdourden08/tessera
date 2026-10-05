/* @layer renderer-components @kind component */
import { useId, useMemo } from 'react';
import { Anchored } from '../../../primitives/Anchored';
import { Box } from '../../../primitives/Box';
import { bubbleFallback } from '../behavior/bubble-fallback';
import { TourBubbleCard } from './TourBubbleCard';
import type { TourBubbleProps } from './TourBubble.type';

const TourBubble = (props: TourBubbleProps) => {
  const { tour, step, anchor, hole, nodeRef } = props;
  const id = useId();
  const anchorRef = useMemo(() => ({ current: anchor }), [anchor]);
  const dialog = { ref: nodeRef, role: 'dialog', 'aria-labelledby': `${id}-title`, 'aria-describedby': `${id}-body`, tabIndex: -1 } as const;
  const card = <TourBubbleCard tour={tour} step={step} id={id} />;

  if (!anchor) return <Box {...dialog} className="guided-tour__bubble guided-tour__bubble--center">{card}</Box>;
  return (
    <Anchored
      {...dialog}
      anchorRef={anchorRef}
      placement={step.placement ?? 'bottom-start'}
      portal={false}
      fallback={bubbleFallback(hole)}
      className="guided-tour__bubble"
    >
      {card}
    </Anchored>
  );
};

export { TourBubble };
