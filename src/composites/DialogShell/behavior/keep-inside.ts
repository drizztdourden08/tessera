/* @layer renderer-components @kind logic */
import { tabbablesIn } from '../../../primitives/dom/tabbables-in';
import { isNode } from '../../../primitives/Portal/behavior/is-node';
import { PORTAL_ROOT_SELECTOR } from '../DialogShell.constants';
import { isTopDialog } from './is-top-dialog';

const keepInside = (dialog: HTMLElement, scope: Element) => (event: FocusEvent): void => {
  const { target } = event;
  const doc = dialog.ownerDocument;
  if (!target || !isNode(target) || !isTopDialog(doc, dialog) || dialog.contains(target) || !scope.contains(target)) return;
  if (doc.querySelector(PORTAL_ROOT_SELECTOR)?.contains(target)) return;
  (tabbablesIn(dialog)[0] ?? dialog).focus();
};

export { keepInside };
