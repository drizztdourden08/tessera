/* @layer renderer-components @kind util */
import { JOIN_FLUSH } from '../DropdownMenu.constants';
import type { JoinBend } from './sub-menu-join.type';

const joinBend = (room: number, corner: number, fillet: number): JoinBend => {
  if (room <= JOIN_FLUSH) return { corner: 0, fillet: 0 };
  const scale = Math.min(1, room / (corner + fillet));
  return { corner: corner * scale, fillet: fillet * scale };
};

export { joinBend };
