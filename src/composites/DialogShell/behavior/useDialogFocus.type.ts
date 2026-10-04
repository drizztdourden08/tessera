/* @layer renderer-components @kind types */
import type { KeyboardEvent, RefCallback, RefObject } from 'react';
import type { DialogInitialFocus } from '../DialogShell.type';

interface FocusStart {
  initialFocusRef?: RefObject<HTMLElement | null>;
  initialFocus: DialogInitialFocus;
  headingId?: string;
}

interface UseDialogFocusParams extends FocusStart {
  open: boolean;
  scopeOf?: (dialog: HTMLElement) => Element;
}

interface DialogFocus {
  node: HTMLElement | null;
  ref: RefCallback<HTMLElement>;
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
}

export type { DialogFocus, FocusStart, UseDialogFocusParams };
