/* @layer renderer-components @kind logic */
import { isNode } from '../Portal/behavior/is-node';
import type { UndoEntry } from './undo-stack.type';

const takes = (entry: UndoEntry, target: EventTarget | null | undefined): boolean => {
  const { within } = entry.step;
  if (target === undefined || within === undefined) return true;
  return target !== null && isNode(target) && within.current?.contains(target) === true;
};

const runUndo = (entries: readonly UndoEntry[], target?: EventTarget | null): boolean => {
  const top = [...entries].reverse().find((entry) => takes(entry, target));
  if (!top) return false;
  top.drop();
  top.step.undo();
  return true;
};

export { runUndo };
