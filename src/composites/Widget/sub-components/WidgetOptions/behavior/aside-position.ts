/* @layer renderer-components @kind logic */
import { ANCHOR_GAP, ASIDE_WIDTH, EDGE_MARGIN } from '../WidgetOptions.constants';

const asidePositionFor = (rect: DOMRect, view: Window): { top: number; left: number } => {
  const right = rect.right + ANCHOR_GAP;
  const fits = right + ASIDE_WIDTH <= view.innerWidth - EDGE_MARGIN;
  return { top: rect.top, left: fits ? right : Math.max(EDGE_MARGIN, rect.left - ANCHOR_GAP - ASIDE_WIDTH) };
};

export { asidePositionFor };
