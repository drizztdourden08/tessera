/* @layer renderer-components @kind types */
import type { WidgetId } from '../../DockLayout';
import type { MenuGroup } from '../../DropdownMenu';
import type { WidgetDockApi } from '../behavior/widget-dock.type';

interface WidgetPaneProps {
  api: WidgetDockApi;
  widgets: WidgetId[];
  activeId: WidgetId;
  paneKey: string | null;
  options: readonly MenuGroup[];
}

export type { WidgetPaneProps };
