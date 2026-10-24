/* @layer renderer-components @kind logic */
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import { pushEscape } from '../../../primitives/escape-stack/push-escape';
import type { ToolbarKeyWiring } from './toolbar-key.type';

const listenToolbarKeys = (wiring: ToolbarKeyWiring): (() => void) => {
  const { root, press, cancel } = wiring;
  const view = ownerWindowOf(root);
  const onKeyDown = (e: KeyboardEvent): void => {
    if (e.ctrlKey || e.metaKey || e.altKey || e.isComposing || e.key === 'Escape') return;
    if (e.key === 'Tab' || press(e.key)) {
      e.preventDefault();
      e.stopPropagation();
    }
  };
  view.addEventListener('keydown', onKeyDown, true);
  const leaveEscape = pushEscape(view.document, 'drag', cancel);
  return () => {
    view.removeEventListener('keydown', onKeyDown, true);
    leaveEscape();
  };
};

export { listenToolbarKeys };
