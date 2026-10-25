/* @layer renderer-components @kind logic */
import { MIN_BAR_PX, SHARE_EPSILON } from '../ToolbarDock.constants';
import type { ToolbarPlace } from '../ToolbarDock.type';

const toolbarDropSize = (kept: ToolbarPlace, before: number, span: number, others: readonly ToolbarPlace[]): number | null => {
  const minShare = Math.min(MIN_BAR_PX / span, 1);
  const wanted = before > 0 ? (kept.size * before) / span : kept.size;
  const room = 1 - others.reduce((sum, place) => sum + place.size, 0);
  const size = Math.min(Math.max(wanted, minShare), room);
  return size < minShare - SHARE_EPSILON ? null : size;
};

export { toolbarDropSize };
