/* @layer renderer-components @kind logic */
import { toFloating } from '../../DockLayout';
import type { Rect, WidgetId } from '../../DockLayout';
import type { WidgetLayout } from '../Widget.type';
import { removeEverywhere } from './remove-everywhere';

const floatWidget = (layout: WidgetLayout, id: WidgetId, rect: Rect, main: Rect): WidgetLayout => {
  const cleared = removeEverywhere(layout, id);
  return { ...cleared, floating: [...cleared.floating, toFloating(id, rect, main)] };
};

export { floatWidget };
