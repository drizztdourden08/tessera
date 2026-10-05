/* @layer renderer-components @kind hook */
import type { TourStep } from '../GuidedTour.type';
import { bubblePlace } from './bubble-place';
import type { BubblePlace, SpotlightState, TourBox } from './tour-internal.type';
import { useNodeBox } from './useNodeBox';
import { useNodeSize } from './useNodeSize';

const useBubblePlace = (bubble: HTMLElement | null, step: TourStep | null, target: HTMLElement | null, spot: SpotlightState) => {
  const size = useNodeSize(bubble);
  const { hole, view } = spot;
  const place: BubblePlace | null = hole && size && view.width > 0 ? bubblePlace(hole, size, view, step?.placement) : null;
  const centred = useNodeBox(bubble, size);
  const bubbleBox: TourBox | null = target ? place?.box ?? null : centred;
  return { place, centred: target === null, bubbleBox };
};

export { useBubblePlace };
