/* @layer renderer-components @kind logic */
import type { RefObject } from 'react';
import { tabbablesIn } from '../../../primitives/dom/tabbables-in';
import type { DialogInitialFocus } from '../DialogShell.type';
import { HEADER_SELECTOR } from '../DialogShell.constants';

const initialFocusOf = (dialog: HTMLElement, ref: RefObject<HTMLElement | null> | undefined, mode: DialogInitialFocus): HTMLElement => {
  const chosen = ref?.current;
  if (chosen && tabbablesIn(dialog).includes(chosen)) return chosen;
  if (mode === 'dialog') return dialog;
  return tabbablesIn(dialog).find((el) => el.closest(HEADER_SELECTOR) === null) ?? dialog;
};

export { initialFocusOf };
