/* @layer renderer-components @kind logic */
import type { DockEdge, Rect } from '../DockLayout.type';

const alongEdge = (rect: Rect, edge: DockEdge): number =>
  (edge === 'left' || edge === 'right' ? rect.width : rect.height);

export { alongEdge };
