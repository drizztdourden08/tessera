/* @layer renderer-components @kind types */
import type { FocusEventHandler, MouseEventHandler } from 'react';

interface TooltipOpen {
  open: boolean;
  handlers: {
    onMouseEnter: MouseEventHandler<HTMLElement>;
    onMouseLeave: MouseEventHandler<HTMLElement>;
    onFocus: FocusEventHandler<HTMLElement>;
    onBlur: FocusEventHandler<HTMLElement>;
  };
}

export type { TooltipOpen };
