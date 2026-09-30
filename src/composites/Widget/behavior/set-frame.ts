/* @layer renderer-components @kind logic */
import type { WidgetId } from '../../DockLayout';
import type { WidgetDefinition, WidgetFrame, WidgetLayout } from '../Widget.type';
import { frameOf } from './frame-of';

const setFrame = (layout: WidgetLayout, id: WidgetId, patch: Partial<WidgetFrame>, definition?: WidgetDefinition): WidgetLayout =>
  ({ ...layout, frame: { ...layout.frame, [id]: { ...frameOf(layout, id, definition), ...patch } } });

export { setFrame };
