/* @layer renderer-components @kind types */
import type { ReactNode, RefObject } from 'react';

interface DialogShellProps {
  open: boolean;
  onClose: () => void;
  dismissable?: boolean;
  title?: ReactNode;
  headerExtra?: ReactNode;
  actions?: ReactNode;
  className?: string;
  initialFocusRef?: RefObject<HTMLElement | null>;
  children?: ReactNode;
}

export type { DialogShellProps };
