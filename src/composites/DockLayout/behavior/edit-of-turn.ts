/* @layer renderer-components @kind logic */
import type { LayoutEdit } from '../DockLayout.type';
import type { CornerHandle, CornerTurn } from './corner.type';

const editOfTurn = (handle: CornerHandle, turn: CornerTurn): LayoutEdit => ({
  type: 'take-corner', key: handle.key, end: handle.end, along: handle.along, ...(turn === 'give' ? { give: true } : {}),
});

export { editOfTurn };
