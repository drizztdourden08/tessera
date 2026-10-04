/* @layer renderer-components @kind logic */
import { tabbablesIn } from '../../../primitives/dom/tabbables-in';

const focusRowControl = (box: HTMLElement | null, controlId: string): void => {
  const target = box?.ownerDocument.getElementById(controlId);
  if (!box || (target && 'labels' in target)) return;
  tabbablesIn(box)[0]?.focus();
};

export { focusRowControl };
