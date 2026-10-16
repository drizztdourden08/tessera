/* @layer renderer-components @kind logic */
import type { CollapseToggleSide } from '../CollapseToggle.type';

const pointsTo = (side: CollapseToggleSide, collapsed: boolean): CollapseToggleSide => {
  const towardEdge = !collapsed;
  if (side === 'start') return towardEdge ? 'start' : 'end';
  return towardEdge ? 'end' : 'start';
};

export { pointsTo };
