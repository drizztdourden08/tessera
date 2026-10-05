/* @layer renderer-components @kind types */
import type { FocusEvent, KeyboardEvent, MouseEvent } from 'react';

interface ConfirmItemHandlers {
  onKeyDown?: (event: KeyboardEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  onMouseLeave?: (event: MouseEvent) => void;
}

interface ConfirmItem {
  press: () => void;
  asking: boolean;
  ask?: string;
  handlers: ConfirmItemHandlers;
}

export type { ConfirmItem };
