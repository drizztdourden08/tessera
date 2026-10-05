/* @layer renderer-components @kind logic */
import { SUGGEST_KEYS } from '../CommandInput.constants';
import type { CommandKeyEvent, SuggestKeyAction } from '../CommandInput.type';
import { heldKey } from './held-key';

const suggestKey = (event: CommandKeyEvent, caretAtEnd: boolean, picked: boolean): SuggestKeyAction => {
  if (heldKey(event)) return null;
  if (event.key === 'ArrowRight') return caretAtEnd ? 'complete' : null;
  if (event.key === 'Enter') return picked ? 'list' : null;
  return SUGGEST_KEYS[event.key] ?? null;
};

export { suggestKey };
