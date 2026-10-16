/* @layer renderer-components @kind logic */
import type { KeyDocument } from '../dom/key-stack.type';
import { pushUndo } from './push-undo';
import { runUndo } from './run-undo';
import { undoKeys } from './undo-keys';
import type { UndoStack } from './undo-stack.type';

const stay = (): void => undefined;

const undoStackOf = (doc: KeyDocument | undefined, own: Set<() => void>): UndoStack => ({
  push: (step) => {
    if (doc === undefined) return stay;
    const drop = pushUndo(doc, step, () => own.delete(drop));
    own.add(drop);
    return drop;
  },
  undo: () => runUndo(undoKeys.entries(doc)),
  latest: () => undoKeys.entries(doc).at(-1)?.step.label ?? null,
});

export { undoStackOf };
