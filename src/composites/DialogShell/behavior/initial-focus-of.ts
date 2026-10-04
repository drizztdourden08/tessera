/* @layer renderer-components @kind logic */
import { tabbablesIn } from '../../../primitives/dom/tabbables-in';
import { HEADER_SELECTOR } from '../DialogShell.constants';
import { headingIn } from './heading-in';
import type { FocusStart } from './useDialogFocus.type';

const initialFocusOf = (dialog: HTMLElement, start: FocusStart): HTMLElement => {
  const chosen = start.initialFocusRef?.current;
  if (chosen && tabbablesIn(dialog).includes(chosen)) return chosen;
  const heading = headingIn(dialog, start.headingId);
  if (heading) return heading;
  if (start.initialFocus === 'dialog') return dialog;
  return tabbablesIn(dialog).find((el) => el.closest(HEADER_SELECTOR) === null) ?? dialog;
};

export { initialFocusOf };
