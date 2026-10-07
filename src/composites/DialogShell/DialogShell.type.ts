/* @layer renderer-components @kind types */
import type { ReactNode, RefObject } from 'react';
import type { DataAttributes } from '../../primitives/dom/data-attributes.type';

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
  id?: string;
  data?: DataAttributes;
  children?: ReactNode;
}

export type { DialogInitialFocus, DialogShellProps };
