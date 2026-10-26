/* @layer renderer-components @kind types */
import type { ReactNode, RefObject } from 'react';
import type { DataAttributes } from '../../primitives/dom/data-attributes.type';

type DialogInitialFocus = 'first' | 'dialog';

type DialogSize = 'sm' | 'md' | 'lg';

interface DialogShellProps {
  open: boolean;
  onClose: () => void;
  dismissable?: boolean;
  title?: ReactNode;
  titleWrap?: boolean;
  headerExtra?: ReactNode;
  actions?: ReactNode;
  size?: DialogSize;
  steady?: boolean;
  className?: string;
  initialFocusRef?: RefObject<HTMLElement | null>;
  initialFocus?: DialogInitialFocus;
  id?: string;
  data?: DataAttributes;
  children?: ReactNode;
}

export type { DialogInitialFocus, DialogShellProps, DialogSize };
