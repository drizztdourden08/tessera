/* @layer renderer-components @kind logic */
import { mascotOutside } from './mascot-outside';
import { ringRoom } from './ring-room';
import type { TourBox } from './tour-internal.type';

const within = (box: TourBox, room: TourBox): boolean =>
  box.x >= room.x && box.y >= room.y && box.x + box.width <= room.x + room.width && box.y + box.height <= room.y + room.height;

const meets = (a: TourBox, b: TourBox): boolean => a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height;

const mascotClear = (box: TourBox, hole: TourBox | null, bubble: TourBox): boolean =>
  mascotOutside(box, hole) || (hole !== null && meets(bubble, hole) && within(box, ringRoom(hole)));

export { mascotClear };
