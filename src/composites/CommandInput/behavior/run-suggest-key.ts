/* @layer renderer-components @kind logic */
import type { KeyboardEvent } from 'react';
import type { CommandEntry, CommandSuggest } from '../CommandInput.type';
import { suggestKey } from './suggest-key';

const runSuggestKey = (event: KeyboardEvent<HTMLInputElement>, suggest: CommandSuggest, complete: (entry: CommandEntry) => void): boolean => {
  if (!suggest.open) return false;
  const { key, altKey, ctrlKey, metaKey, shiftKey, currentTarget: input } = event;
  const end = input.value.length;
  const caretAtEnd = input.selectionStart === end && input.selectionEnd === end;
  const action = suggestKey({ key, altKey, ctrlKey, metaKey, shiftKey, isComposing: event.nativeEvent.isComposing }, caretAtEnd, suggest.active >= 0);
  if (action === null) return false;
  event.preventDefault();
  if (action === 'next' || action === 'previous') suggest.move(action === 'next' ? 1 : -1);
  else if (action === 'close') {
    event.stopPropagation();
    suggest.dismiss();
  } else {
    const entry = suggest.hits[Math.max(suggest.active, 0)];
    if (entry) complete(entry);
  }
  return true;
};

export { runSuggestKey };
