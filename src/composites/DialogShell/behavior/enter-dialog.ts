/* @layer renderer-components @kind logic */
import { DIALOG_STACKS } from './dialog-stack.constants';

const enterDialog = (doc: Document, dialog: HTMLElement): (() => void) => {
  const stack = DIALOG_STACKS.get(doc) ?? [];
  DIALOG_STACKS.set(doc, stack);
  stack.push(dialog);
  return () => {
    const index = stack.indexOf(dialog);
    if (index !== -1) stack.splice(index, 1);
  };
};

export { enterDialog };
