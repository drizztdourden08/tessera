/* @layer renderer-components @kind types */
import type { ReactNode, RefObject } from 'react';

interface WindowTitleBarStartProps {
  menu?: ReactNode;
  menuAnchorRef?: RefObject<HTMLElement | null>;
  pinned: boolean;
  onPinToggle?: () => void;
  left?: ReactNode;
}

export type { WindowTitleBarStartProps };
