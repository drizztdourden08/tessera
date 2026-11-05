/* @layer renderer-components @kind logic */
import { tabbablesIn } from '../../../primitives/dom/tabbables-in';
import { headingIn } from './heading-in';
import type { FocusStart } from './useDialogFocus.type';

const initialFocusOf = (dialog: HTMLElement, start: FocusStart): HTMLElement => {
  const chosen = start.initialFocusRef?.current;
  if (chosen && tabbablesIn(dialog).includes(chosen)) return chosen;
  const heading = headingIn(dialog, start.headingId);
  return heading ?? dialog;
};

export { initialFocusOf };
