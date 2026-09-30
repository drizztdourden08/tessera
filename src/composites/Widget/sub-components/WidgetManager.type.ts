/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { DockMainGrip, DragModifiers, ExternalDrag, LayoutEdit, Rect, WidgetId } from '../../DockLayout';
import type { WidgetDefinition, WidgetDisabledState, WidgetLayout } from '../Widget.type';

interface WidgetManagerProps<D extends WidgetDefinition = WidgetDefinition> {
  definitions: readonly D[];
  layout: WidgetLayout;
  onLayoutChange: (layout: WidgetLayout) => void;
  contextActive: boolean;
  children: Record<string, ReactNode>;
  settingsContent?: Record<string, ReactNode>;
  pageOpen?: boolean;
  developerToolsEnabled?: boolean;
  startupForcedWidgetIds?: string[];
  resolveDisabled?: (definition: D) => WidgetDisabledState | null;
  onOpenSettings?: (settingId: string) => void;
  main?: ReactNode;
  peek?: boolean;
  modifiers?: DragModifiers;
  onMainRect?: (rect: Rect | null) => void;
  onPopOut?: (id: WidgetId) => void;
  externalDrag?: ExternalDrag | null;
  onExternalDrop?: (id: WidgetId, edit: LayoutEdit | null) => void;
  mainLabel?: string;
  gripLabel?: string;
  mainGrip?: DockMainGrip;
  makeRoomHint?: string;
  contextLabel?: string;
  className?: string;
}

export type { WidgetManagerProps };
