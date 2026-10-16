/* @layer renderer-components @kind logic */
import type { KeyDocument, KeyStack, KeyStackHandler } from './key-stack.type';

const keyStack = <E>(onKey: KeyStackHandler<E>): KeyStack<E> => {
  const stacks = new WeakMap<KeyDocument, E[]>();
  const listeners = new WeakMap<KeyDocument, (event: KeyboardEvent) => void>();

  const stackOf = (doc: KeyDocument): E[] => {
    const known = stacks.get(doc);
    if (known) return known;
    const entries: E[] = [];
    stacks.set(doc, entries);
    return entries;
  };

  const listen = (doc: KeyDocument, entries: readonly E[]): void => {
    const listener = (event: KeyboardEvent) => onKey(entries, event);
    listeners.set(doc, listener);
    doc.addEventListener('keydown', listener);
  };

  const stopListening = (doc: KeyDocument): void => {
    const listener = listeners.get(doc);
    if (listener) doc.removeEventListener('keydown', listener);
    listeners.delete(doc);
  };

  return {
    entries: (doc) => (doc === undefined ? undefined : stacks.get(doc)) ?? [],
    push: (doc, entry) => {
      const entries = stackOf(doc);
      if (entries.length === 0) listen(doc, entries);
      entries.push(entry);
      return () => {
        const at = entries.indexOf(entry);
        if (at === -1) return;
        entries.splice(at, 1);
        if (entries.length === 0) stopListening(doc);
      };
    },
  };
};

export { keyStack };
