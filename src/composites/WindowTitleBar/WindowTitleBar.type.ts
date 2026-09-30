/* @layer renderer-components @kind types */
import type { ReactNode, RefObject } from 'react';

interface WindowTitleBarInstance {
  name: string;
  logo?: string;
  pulse?: boolean;
}

interface WindowControlsState {
  maximized?: boolean;
  fullscreen?: boolean;
  onFullscreenToggle?: () => void;
  onMinimize?: () => void;
  onMaximizeToggle?: () => void;
  onClose?: () => void;
}

interface WindowTitleBarProps extends WindowControlsState {
  title: ReactNode;
  logo?: string;
  instance?: WindowTitleBarInstance | null;
  menu?: ReactNode;
  menuOpen?: boolean;
  menuAnchorRef?: RefObject<HTMLElement | null>;
  pinned?: boolean;
  onPinToggle?: () => void;
  left?: ReactNode;
  concealed?: boolean;
  peek?: boolean;
  className?: string;
}

export type { WindowControlsState, WindowTitleBarInstance, WindowTitleBarProps };
