/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { DockLayoutProps, DockMainGrip, DragModifiers, ExternalDrag, LayoutEdit, Rect, Size, WidgetId } from '../DockLayout.type';
import type { DragContext, DragSource, DragView } from './drag.type';
import type { LaidOut } from './layout-tree.type';

interface Press {
  source: DragSource;
  pointerId: number;
  live: boolean;
  view: DragView | null;
}

interface DockDragLatest {
  context: DragContext;
  onEdit: (edit: LayoutEdit) => void;
  onPopOut?: (id: WidgetId) => void;
}

interface DockDragParams extends DockDragLatest {
  stageRef: RefObject<HTMLElement | null>;
}

interface PressWiring {
  stage: HTMLElement;
  press: RefObject<Press | null>;
  latest: RefObject<DockDragLatest>;
  finish: () => void;
  show: (view: DragView, id: WidgetId | null) => void;
}

interface ExternalDragParams {
  stageRef: RefObject<HTMLElement | null>;
  context: DragContext;
  externalDrag: DockLayoutProps['externalDrag'];
  onExternalDrop?: (id: WidgetId, edit: LayoutEdit | null) => void;
  sizeOf?: (id: WidgetId) => Size;
}

type DockStageParams = Pick<DockLayoutProps, 'layout' | 'labelOf' | 'canPopOut' | 'onMainRect'> & {
  peek: boolean;
  modifiers: DragModifiers;
  mainLabel: string;
};

interface DockStage {
  laid: LaidOut | null;
  mainRect: Rect | null;
  context: DragContext;
}

interface DockSettings {
  peek: boolean;
  modifiers: DragModifiers;
  externalDrag: ExternalDrag | null;
  mainLabel: string;
  gripLabel: string;
  mainGrip: DockMainGrip;
}

interface DockKeys {
  peek: boolean;
  modifiers: DragModifiers;
}

export type { DockDragLatest, DockDragParams, DockKeys, DockSettings, DockStage, DockStageParams, ExternalDragParams, Press, PressWiring };
