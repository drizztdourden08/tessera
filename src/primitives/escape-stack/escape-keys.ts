/* @layer renderer-components @kind logic */
import { keyStack } from '../dom/key-stack';
import { topEscape } from './top-escape';
import type { EscapeEntry } from './escape-stack.type';

const escapeKeys = keyStack<EscapeEntry>((entries, event) => {
  if (event.key !== 'Escape' || event.defaultPrevented || event.isComposing) return;
  const top = topEscape(entries, event.target);
  if (!top) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  top.onEscape();
});

export { escapeKeys };
