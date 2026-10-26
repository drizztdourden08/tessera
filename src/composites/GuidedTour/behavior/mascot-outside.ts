/* @layer renderer-components @kind logic */
import { RING_CLEARANCE } from '../GuidedTour.constants';
import type { TourBox } from './tour-internal.type';

const mascotOutside = (box: TourBox, hole: TourBox | null): boolean =>
  hole === null
  || box.x + box.width + RING_CLEARANCE <= hole.x
  || hole.x + hole.width + RING_CLEARANCE <= box.x
  || box.y + box.height + RING_CLEARANCE <= hole.y
  || hole.y + hole.height + RING_CLEARANCE <= box.y;

export { mascotOutside };
