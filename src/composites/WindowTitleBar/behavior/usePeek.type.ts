/* @layer renderer-components @kind types */
import type { FocusEventHandler, KeyboardEventHandler, MouseEventHandler } from 'react';

interface Peek {
  peeking: boolean;
  focused: boolean;
  handlers: {
    onMouseLeave: MouseEventHandler<HTMLElement>;
    onFocus: FocusEventHandler<HTMLElement>;
    onBlur: FocusEventHandler<HTMLElement>;
    onKeyDown: KeyboardEventHandler<HTMLElement>;
  };
}

export type { Peek };
