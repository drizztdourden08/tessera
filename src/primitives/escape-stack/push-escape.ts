/* @layer renderer-components @kind logic */
import { ESCAPE_KEY_LISTENERS, ESCAPE_STACKS } from './escape-stack.constants';
import { topEscape } from './top-escape';
import type { EscapeDocument, EscapeEntry, EscapeHolds, EscapeLevel } from './escape-stack.type';

const onEscapeKey = (entries: readonly EscapeEntry[]) => (event: KeyboardEvent): void => {
  if (event.key !== 'Escape' || event.defaultPrevented || event.isComposing) return;
  const top = topEscape(entries, event.target);
  if (!top) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  top.onEscape();
};

const stackOf = (doc: EscapeDocument): EscapeEntry[] => {
  const known = ESCAPE_STACKS.get(doc);
  if (known) return known;
  const entries: EscapeEntry[] = [];
  ESCAPE_STACKS.set(doc, entries);
  return entries;
};

const listen = (doc: EscapeDocument, entries: readonly EscapeEntry[]): void => {
  const listener = onEscapeKey(entries);
  ESCAPE_KEY_LISTENERS.set(doc, listener);
  doc.addEventListener('keydown', listener);
};

const stopListening = (doc: EscapeDocument): void => {
  const listener = ESCAPE_KEY_LISTENERS.get(doc);
  if (listener) doc.removeEventListener('keydown', listener);
  ESCAPE_KEY_LISTENERS.delete(doc);
};

const pushEscape = (doc: EscapeDocument, level: EscapeLevel, onEscape: () => void, holds?: EscapeHolds): (() => void) => {
  const entries = stackOf(doc);
  if (entries.length === 0) listen(doc, entries);
  const entry: EscapeEntry = { level, onEscape, holds };
  entries.push(entry);
  return () => {
    const at = entries.indexOf(entry);
    if (at === -1) return;
    entries.splice(at, 1);
    if (entries.length === 0) stopListening(doc);
  };
};

export { pushEscape };
