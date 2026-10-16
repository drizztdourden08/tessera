/* @layer renderer-components @kind types */
import type { WidgetId } from '../../DockLayout';

interface WidgetGripProps {
  id: WidgetId;
  name: string;
  dragRegion: boolean;
}

export type { WidgetGripProps };
