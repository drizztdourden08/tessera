/* @layer renderer-components @kind logic */
import type { WidgetId } from '../../DockLayout';
import { DEFAULT_OPACITY, DEFAULT_VISIBILITY } from '../Widget.constants';
import type { WidgetDefinition, WidgetFrame, WidgetLayout } from '../Widget.type';

const frameOf = (layout: WidgetLayout, id: WidgetId, definition?: WidgetDefinition): WidgetFrame => ({
  opacity: DEFAULT_OPACITY,
  show: definition?.defaultVisibility ?? DEFAULT_VISIBILITY,
  ...layout.frame[id],
});

export { frameOf };
