/* @layer renderer-components @kind logic */
import { ESCAPE_LISTENERS, LAYER_STACKS, SESSION_ENDS } from './dismiss-layers.constants';
import type { DismissDocument, DismissLayer } from './dismiss-layers.type';
import { openPopupsSession } from './open-popups-session';

const onEscape = (stack: DismissLayer[]) => (event: KeyboardEvent): void => {
  const top = stack.at(-1);
  if (event.key !== 'Escape' || !top?.escape()) return;
  event.stopImmediatePropagation();
  top.close();
};

const startStack = (doc: DismissDocument, stack: DismissLayer[]): void => {
  const listener = onEscape(stack);
  ESCAPE_LISTENERS.set(doc, listener);
  LAYER_STACKS.set(doc, stack);
  doc.addEventListener('keydown', listener, true);
  SESSION_ENDS.set(doc, openPopupsSession(doc, stack));
};

const endStack = (doc: DismissDocument): void => {
  const listener = ESCAPE_LISTENERS.get(doc);
  if (listener) doc.removeEventListener('keydown', listener, true);
  ESCAPE_LISTENERS.delete(doc);
  SESSION_ENDS.get(doc)?.();
  SESSION_ENDS.delete(doc);
};

const enterLayer = (doc: DismissDocument, layer: DismissLayer): (() => void) => {
  const stack = LAYER_STACKS.get(doc) ?? [];
  if (stack.length === 0) startStack(doc, stack);
  stack.push(layer);
  return () => {
    const index = stack.indexOf(layer);
    if (index !== -1) stack.splice(index, 1);
    if (stack.length === 0 && ESCAPE_LISTENERS.has(doc)) endStack(doc);
  };
};

export { enterLayer };
