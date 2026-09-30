/* @layer renderer-components @kind logic */
import type { WidgetId } from '../../DockLayout';
import type { WidgetLayout } from '../Widget.type';
import { placementOf } from './placement-of';

const isWidgetOpen = (layout: WidgetLayout, id: WidgetId): boolean => placementOf(layout, id) !== null;

export { isWidgetOpen };
