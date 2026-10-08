/* @layer renderer-components @kind logic */
import { LAYER_STACKS, SESSION_ENDS } from './dismiss-layers.constants';
import type { DismissDocument, DismissLayer } from './dismiss-layers.type';
import { openPopupsSession } from './open-popups-session';

const endStack = (doc: DismissDocument): void => {
  SESSION_ENDS.get(doc)?.();
  SESSION_ENDS.delete(doc);
};

const enterLayer = (doc: DismissDocument, layer: DismissLayer): (() => void) => {
  const stack = LAYER_STACKS.get(doc) ?? [];
  if (stack.length === 0) {
    LAYER_STACKS.set(doc, stack);
    SESSION_ENDS.set(doc, openPopupsSession(doc, stack));
  }
  stack.push(layer);
  return () => {
    const index = stack.indexOf(layer);
    if (index !== -1) stack.splice(index, 1);
    if (stack.length === 0 && SESSION_ENDS.has(doc)) endStack(doc);
  };
};

export { enterLayer };
