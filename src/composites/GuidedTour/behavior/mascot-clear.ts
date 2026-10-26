/* @layer renderer-components @kind logic */
import { MASCOT_CLEAR } from '../GuidedTour.constants';
import { ringRoom } from './ring-room';
import type { TourBox } from './tour-internal.type';

const within = (box: TourBox, room: TourBox): boolean =>
  box.x >= room.x && box.y >= room.y && box.x + box.width <= room.x + room.width && box.y + box.height <= room.y + room.height;

const apart = (box: TourBox, hole: TourBox): boolean =>
  box.x + box.width + MASCOT_CLEAR <= hole.x
  || hole.x + hole.width + MASCOT_CLEAR <= box.x
  || box.y + box.height + MASCOT_CLEAR <= hole.y
  || hole.y + hole.height + MASCOT_CLEAR <= box.y;

const meets = (a: TourBox, b: TourBox): boolean => a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height;

const mascotClear = (box: TourBox, hole: TourBox | null, bubble: TourBox): boolean =>
  hole === null || apart(box, hole) || (meets(bubble, hole) && within(box, ringRoom(hole)));

export { mascotClear };
