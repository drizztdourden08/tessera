/* @layer renderer-components @kind types */
import type { FocusEventHandler, MouseEventHandler } from 'react';

interface ToastTimer {
  onMouseEnter: MouseEventHandler<HTMLElement>;
  onMouseLeave: MouseEventHandler<HTMLElement>;
  onFocus: FocusEventHandler<HTMLElement>;
  onBlur: FocusEventHandler<HTMLElement>;
}

export type { ToastTimer };
