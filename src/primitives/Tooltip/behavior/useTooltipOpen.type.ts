/* @layer renderer-components @kind types */
import type { FocusEventHandler, MouseEventHandler } from 'react';

type TooltipPointer = MouseEventHandler<HTMLElement>;

interface TooltipOpen {
  open: boolean;
  hover: boolean;
  handlers: {
    onMouseEnter: MouseEventHandler<HTMLElement>;
    onMouseMove: TooltipPointer | undefined;
    onMouseLeave: MouseEventHandler<HTMLElement>;
    onFocus: FocusEventHandler<HTMLElement>;
    onBlur: FocusEventHandler<HTMLElement>;
  };
}

export type { TooltipOpen, TooltipPointer };
