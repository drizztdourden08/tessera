/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { DockEdge, DockTree, WidgetId } from '../DockLayout';

type SnapSide = DockEdge;

type WidgetVisibility = 'always' | 'context-only';

type WidgetPlacement = 'docked' | 'floating' | 'popped';

type PinMode = 'off' | 'top';

interface WindowBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface SnapLink {
  to: WidgetId;
  edge: DockEdge;
}

interface PoppedWidget {
  id: WidgetId;
  bounds?: WindowBounds;
  pin?: PinMode;
  snap?: boolean;
  link?: SnapLink | null;
}

interface WidgetWindowOptions {
  sync?: boolean;
}

interface WidgetFrame {
  opacity: number;
  show: WidgetVisibility;
}

interface WidgetLayout extends DockTree {
  v: 2;
  popped: PoppedWidget[];
  frame: Partial<Record<WidgetId, WidgetFrame>>;
  poppedMemory?: Partial<Record<WidgetId, PoppedWidget>>;
}

interface WidgetDefinition {
  id: string;
  label: string;
  defaultVisibility: WidgetVisibility;
  defaultSide: SnapSide;
  defaultDockedSize: number;
  defaultFloatingSize: { width: number; height: number };
  devOnly?: boolean;
  popOut?: boolean;
}

interface WidgetDisabledState {
  message: string;
  settingId: string;
}

interface WidgetTab {
  id: WidgetId;
  label: string;
}

interface WidgetProps {
  id: WidgetId;
  tabs: WidgetTab[];
  activeId: WidgetId;
  paneKey: string | null;
  opacity: number;
  onActivateTab: (id: WidgetId) => void;
  onOpenOptions: (anchor: HTMLElement) => void;
  onClose: () => void;
  children: ReactNode;
  peek?: boolean;
  optionsOpen?: boolean;
  onPopOut?: () => void;
  canPopOut?: boolean;
  mode?: 'in' | 'out';
  pin?: PinMode;
  onPinChange?: (mode: PinMode) => void;
  titleBarActions?: ReactNode;
  square?: boolean;
}

export type {
  PinMode, PoppedWidget, SnapLink, SnapSide, WidgetDefinition, WidgetDisabledState, WidgetFrame, WidgetLayout,
  WidgetPlacement, WidgetProps, WidgetTab, WidgetVisibility, WidgetWindowOptions, WindowBounds,
};
