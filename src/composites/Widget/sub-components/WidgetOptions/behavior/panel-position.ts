/* @layer renderer-components @kind logic */
import { ANCHOR_GAP, EDGE_MARGIN, PANEL_HEIGHT, PANEL_WIDTH } from '../WidgetOptions.constants';

const panelPositionFor = (rect: DOMRect, view: Window): { top: number; left: number } => {
  let top = rect.bottom + ANCHOR_GAP;
  let left = rect.right - PANEL_WIDTH;
  if (left < EDGE_MARGIN) left = EDGE_MARGIN;
  if (left + PANEL_WIDTH > view.innerWidth - EDGE_MARGIN) left = view.innerWidth - PANEL_WIDTH - EDGE_MARGIN;
  if (top + PANEL_HEIGHT > view.innerHeight - EDGE_MARGIN) top = rect.top - PANEL_HEIGHT - ANCHOR_GAP;
  if (top < EDGE_MARGIN) top = EDGE_MARGIN;
  return { top, left };
};

export { panelPositionFor };
