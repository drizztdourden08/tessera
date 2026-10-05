/* @layer renderer-components @kind component */
import { useCallback, useId } from 'react';
import type { CSSProperties } from 'react';
import { Box } from '../../../primitives/Box';
import type { BubblePlace } from '../behavior/tour-internal.type';
import { useTopLayer } from '../behavior/useTopLayer';
import { TourBubbleCard } from './TourBubbleCard';
import type { TourBubbleProps } from './TourBubble.type';

const placed = (place: BubblePlace | null, centred: boolean): CSSProperties | undefined => {
  if (place) return { top: place.box.y, left: place.box.x };
  return centred ? undefined : { opacity: 0 };
};

const TourBubble = (props: TourBubbleProps) => {
  const { tour, step, place, centred, nodeRef } = props;
  const id = useId();
  const layerRef = useTopLayer<HTMLElement>();
  const attach = useCallback((node: HTMLElement | null) => {
    layerRef.current = node;
    nodeRef(node);
  }, [layerRef, nodeRef]);

  return (
    <Box
      ref={attach}
      popover="manual"
      role="dialog"
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-body`}
      tabIndex={-1}
      className={centred ? 'guided-tour__bubble guided-tour__bubble--center' : 'guided-tour__bubble'}
      data-side={place?.side}
      style={placed(place, centred)}
    >
      <TourBubbleCard tour={tour} step={step} id={id} />
    </Box>
  );
};

export { TourBubble };
