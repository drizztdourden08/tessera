/* @layer renderer-components @kind logic */
import type { ContextMenuPoint, ContextMenuRect } from '../ContextMenu.type';
import { keyboardPoint } from './keyboard-point';

const eventPoint = (pointer: ContextMenuPoint, rect: ContextMenuRect): ContextMenuPoint =>
  (pointer.x === 0 && pointer.y === 0 ? keyboardPoint(rect) : pointer);

export { eventPoint };
