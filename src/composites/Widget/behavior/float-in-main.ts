/* @layer renderer-components @kind logic */
import { GAP, floatingRect, placeFloating } from '../../DockLayout';
import type { Rect, WidgetId } from '../../DockLayout';
import { FALLBACK_FLOAT_SIZE } from '../Widget.constants';
import type { WidgetDefinition, WidgetLayout } from '../Widget.type';
import { dockOnEdge } from './dock-on-edge';
import { floatWidget } from './float-widget';

const floatInMain = (layout: WidgetLayout, id: WidgetId, main: Rect, definition?: WidgetDefinition): WidgetLayout => {
  const wanted = { x: main.x + GAP, y: main.y + GAP, ...(definition?.defaultFloatingSize ?? FALLBACK_FLOAT_SIZE) };
  const others = layout.floating.filter((f) => f.id !== id).map((f) => floatingRect(f, main));
  const placed = placeFloating(main, others, wanted);
  return placed ? floatWidget(layout, id, placed, main) : dockOnEdge(layout, id, definition?.defaultSide ?? 'right');
};

export { floatInMain };
