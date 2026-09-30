/* @layer renderer-components @kind types */
import type { ReactNode, RefObject } from 'react';
import type { LayoutEdit, Rect, WidgetId } from '../../DockLayout';
import type { WidgetDefinition, WidgetDisabledState, WidgetLayout } from '../Widget.type';
import type { WidgetManagerProps } from '../sub-components/WidgetManager.type';
import type { LayoutUpdater } from './useWidgetLayout.type';

interface WidgetOptionsTarget {
  id: WidgetId;
  anchor: HTMLElement;
}

interface WidgetDockApi {
  layout: WidgetLayout;
  peek: boolean;
  optionsId: WidgetId | null;
  definitionOf: (id: WidgetId) => WidgetDefinition | undefined;
  labelOf: (id: WidgetId) => string;
  contentOf: (id: WidgetId) => ReactNode;
  disabledOf: (id: WidgetId) => WidgetDisabledState | null;
  canPopOut: (id: WidgetId) => boolean;
  change: (fn: LayoutUpdater) => void;
  apply: (edit: LayoutEdit) => void;
  close: (id: WidgetId) => void;
  popOut: (id: WidgetId) => void;
  toggleOptions: (id: WidgetId, anchor: HTMLElement) => void;
  onOpenSettings?: (settingId: string) => void;
}

interface DockApiParams<D extends WidgetDefinition> {
  props: WidgetManagerProps<D>;
  peek: boolean;
  options: WidgetOptionsTarget | null;
  setOptions: (target: WidgetOptionsTarget | null) => void;
  mainRef: RefObject<Rect | null>;
}

export type { DockApiParams, WidgetDockApi, WidgetOptionsTarget };
