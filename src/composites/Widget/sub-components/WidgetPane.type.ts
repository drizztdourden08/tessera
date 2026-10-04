/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { WidgetId } from '../../DockLayout';
import type { WidgetDockApi } from '../behavior/widget-dock.type';

interface WidgetPaneProps {
  api: WidgetDockApi;
  widgets: WidgetId[];
  activeId: WidgetId;
  paneKey: string | null;
  options: ReactNode;
}

export type { WidgetPaneProps };
