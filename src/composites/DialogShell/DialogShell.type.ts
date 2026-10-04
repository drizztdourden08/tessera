/* @layer renderer-components @kind types */
import type { ReactNode, RefObject } from 'react';

type DialogInitialFocus = 'first' | 'dialog';

interface DialogShellProps {
  open: boolean;
  onClose: () => void;
  dismissable?: boolean;
  title?: ReactNode;
  headerExtra?: ReactNode;
  actions?: ReactNode;
  className?: string;
  initialFocusRef?: RefObject<HTMLElement | null>;
  initialFocus?: DialogInitialFocus;
  children?: ReactNode;
}

export type { DialogInitialFocus, DialogShellProps };
