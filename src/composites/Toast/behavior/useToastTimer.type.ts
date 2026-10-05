/* @layer renderer-components @kind types */
import type { FocusEventHandler, MouseEventHandler } from 'react';

interface ToastTimer {
  handlers: {
    onMouseEnter: MouseEventHandler<HTMLElement>;
    onMouseLeave: MouseEventHandler<HTMLElement>;
    onFocus: FocusEventHandler<HTMLElement>;
    onBlur: FocusEventHandler<HTMLElement>;
  };
  returnFocus: (toast: HTMLElement | null) => void;
}

export type { ToastTimer };
