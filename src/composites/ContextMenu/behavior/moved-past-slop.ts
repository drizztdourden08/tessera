/* @layer renderer-components @kind logic */
import { LONG_PRESS_SLOP } from '../ContextMenu.constants';
import type { ContextMenuPoint } from '../ContextMenu.type';

const movedPastSlop = (from: ContextMenuPoint, to: ContextMenuPoint, slop: number = LONG_PRESS_SLOP): boolean =>
  Math.hypot(to.x - from.x, to.y - from.y) > slop;

export { movedPastSlop };
