/* @layer renderer-components @kind logic */
import type { KeyDocument } from '../dom/key-stack.type';
import { undoKeys } from './undo-keys';
import type { UndoStep } from './undo-stack.type';

const pushUndo = (doc: KeyDocument, step: UndoStep, onGone?: () => void): (() => void) => {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let gone = false;
  let leave = (): void => undefined;
  const drop = () => {
    if (gone) return;
    gone = true;
    clearTimeout(timer);
    leave();
    onGone?.();
  };
  leave = undoKeys.push(doc, { step, drop });
  if (step.expires !== undefined && step.expires > 0) timer = setTimeout(drop, step.expires);
  return drop;
};

export { pushUndo };
