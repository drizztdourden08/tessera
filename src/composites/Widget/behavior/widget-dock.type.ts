/* @layer renderer-components @kind types */
import type { ReactNode, RefObject } from 'react';
import type { LayoutEdit, Rect, ScreenPoint, WidgetId } from '../../DockLayout';
import type { WidgetDefinition, WidgetDisabledState, WidgetLayout } from '../Widget.type';
import type { WidgetManagerProps } from '../sub-components/WidgetManager.type';
import type { LayoutUpdater } from './useWidgetLayout.type';

interface WidgetDockApi {
  layout: WidgetLayout;
  peek: boolean;
  definitionOf: (id: WidgetId) => WidgetDefinition | undefined;
  labelOf: (id: WidgetId) => string;
  contentOf: (id: WidgetId) => ReactNode;
  actionsOf: (id: WidgetId) => ReactNode;
  disabledOf: (id: WidgetId) => WidgetDisabledState | null;
  canPopOut: (id: WidgetId) => boolean;
  change: (fn: LayoutUpdater) => void;
  apply: (edit: LayoutEdit) => void;
  close: (id: WidgetId) => void;
  popOut: (id: WidgetId, point?: ScreenPoint) => void;
  onOpenSettings?: (settingId: string) => void;
}

interface DockApiParams<D extends WidgetDefinition> {
  props: WidgetManagerProps<D>;
  peek: boolean;
  mainRef: RefObject<Rect | null>;
}

export type { DockApiParams, WidgetDockApi };
