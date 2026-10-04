/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { Rect } from '../../DockLayout';
import type { WidgetDockApi, WidgetOptionsTarget } from '../behavior/widget-dock.type';
import type { WindowRowsProps } from './WidgetOptions/WidgetOptions.type';

interface WidgetOptionsHostProps {
  api: WidgetDockApi;
  target: WidgetOptionsTarget;
  paneRect: Rect | null;
  mainRect: Rect | null;
  onClose: () => void;
  settings?: ReactNode;
  makeRoomHint?: string;
  contextLabel?: string;
  windowRows?: WindowRowsProps;
}

export type { WidgetOptionsHostProps };
