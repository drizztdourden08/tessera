/* @layer renderer-components @kind types */
import type { KeyboardEvent, RefCallback, RefObject } from 'react';
import type { DialogInitialFocus } from '../DialogShell.type';

interface UseDialogFocusParams {
  open: boolean;
  initialFocusRef?: RefObject<HTMLElement | null>;
  initialFocus: DialogInitialFocus;
}

interface DialogFocus {
  node: HTMLElement | null;
  ref: RefCallback<HTMLElement>;
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
}

export type { DialogFocus, UseDialogFocusParams };
