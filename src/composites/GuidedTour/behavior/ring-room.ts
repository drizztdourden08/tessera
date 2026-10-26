/* @layer renderer-components @kind logic */
import { RING_CLEARANCE } from '../GuidedTour.constants';
import type { TourBox } from './tour-internal.type';

const ringRoom = (hole: TourBox): TourBox => ({
  x: hole.x + RING_CLEARANCE,
  y: hole.y + RING_CLEARANCE,
  width: hole.width - 2 * RING_CLEARANCE,
  height: hole.height - 2 * RING_CLEARANCE,
});

export { ringRoom };
