/* @layer renderer-components @kind logic */
import { ESCAPE_LISTENERS, LAYER_STACKS } from './dismiss-layers.constants';
import type { DismissDocument, DismissLayer } from './dismiss-layers.type';

const onEscape = (stack: DismissLayer[]) => (event: KeyboardEvent): void => {
  const top = stack.at(-1);
  if (event.key !== 'Escape' || !top?.escape()) return;
  event.stopImmediatePropagation();
  top.close();
};

const enterLayer = (doc: DismissDocument, layer: DismissLayer): (() => void) => {
  const stack = LAYER_STACKS.get(doc) ?? [];
  if (stack.length === 0) {
    const listener = onEscape(stack);
    ESCAPE_LISTENERS.set(doc, listener);
    LAYER_STACKS.set(doc, stack);
    doc.addEventListener('keydown', listener, true);
  }
  stack.push(layer);
  return () => {
    const index = stack.indexOf(layer);
    if (index !== -1) stack.splice(index, 1);
    const listener = ESCAPE_LISTENERS.get(doc);
    if (stack.length > 0 || !listener) return;
    doc.removeEventListener('keydown', listener, true);
    ESCAPE_LISTENERS.delete(doc);
  };
};

export { enterLayer };
