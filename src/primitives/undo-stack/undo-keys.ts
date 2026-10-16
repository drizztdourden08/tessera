/* @layer renderer-components @kind logic */
import { keyStack } from '../dom/key-stack';
import { isTextEntry } from './is-text-entry';
import { isUndoKey } from './is-undo-key';
import { runUndo } from './run-undo';
import type { UndoEntry } from './undo-stack.type';

const undoKeys = keyStack<UndoEntry>((entries, event) => {
  if (!isUndoKey(event) || event.defaultPrevented || event.isComposing || isTextEntry(event.target)) return;
  if (runUndo(entries, event.target)) event.preventDefault();
});

export { undoKeys };
