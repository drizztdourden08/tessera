/* @layer renderer-components @kind types */
import type { CSSProperties, ReactNode } from 'react';

type SnapSide = 'left' | 'right' | 'top' | 'bottom';
type WidgetMode = 'docked' | 'floating';
type WidgetBounds = 'viewport' | 'container';

type WidgetVisibility = 'always' | 'context-only';

interface WidgetState {
  id: string;
  mode: WidgetMode;
  side: SnapSide;
  order: number;
  opacity: number;
  visibility: WidgetVisibility;
  visible: boolean;

  x: number;
  y: number;
  width: number;
  height: number;

  dockedSize: number;

  exclusive: boolean;
}

interface WidgetLayout {
  widgets: WidgetState[];
}

interface WidgetDefinition {
  id: string;
  label: string;
  defaultVisibility: WidgetVisibility;
  defaultSide: SnapSide;
  defaultDockedSize: number;
  defaultFloatingSize: { width: number; height: number };
  devOnly?: boolean;
}

interface WidgetDisabledState {
  message: string;
  settingId: string;
}

interface WidgetProps {
  state: WidgetState;
  label?: string;
  onChange: (patch: Partial<WidgetState>) => void;
  onClose: () => void;
  children: ReactNode;
  settingsContent?: ReactNode;
  dockedStyle?: CSSProperties;
  exclusiveLabel?: string;
}

export type {
  SnapSide,
  WidgetBounds,
  WidgetDefinition,
  WidgetDisabledState,
  WidgetLayout,
  WidgetMode,
  WidgetProps,
  WidgetState,
  WidgetVisibility
};
