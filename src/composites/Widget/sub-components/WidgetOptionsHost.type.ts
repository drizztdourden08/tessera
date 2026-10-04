/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { Rect, WidgetId } from '../../DockLayout';
import type { WidgetDockApi } from '../behavior/widget-dock.type';
import type { WindowRowsProps } from './WidgetOptions/WidgetOptions.type';

interface WidgetOptionsHostProps {
  api: WidgetDockApi;
  id: WidgetId;
  paneRect: Rect | null;
  mainRect: Rect | null;
  settings?: ReactNode;
  makeRoomHint?: string;
  contextLabel?: string;
  windowRows?: WindowRowsProps;
}

export type { WidgetOptionsHostProps };
