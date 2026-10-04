/* @layer renderer-components @kind logic */
import { DIALOG_STACKS } from './dialog-stack.constants';

const isTopDialog = (doc: Document, dialog: HTMLElement | null): boolean =>
  dialog !== null && DIALOG_STACKS.get(doc)?.at(-1) === dialog;

export { isTopDialog };
