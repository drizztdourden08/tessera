/* @layer renderer-components @kind logic */
import { MASCOT_CLEAR, RING_WIDTH } from '../GuidedTour.constants';
import type { TourBox } from './tour-internal.type';

const ringRoom = (hole: TourBox): TourBox => {
  const inset = RING_WIDTH + MASCOT_CLEAR;
  return { x: hole.x + inset, y: hole.y + inset, width: hole.width - 2 * inset, height: hole.height - 2 * inset };
};

export { ringRoom };
