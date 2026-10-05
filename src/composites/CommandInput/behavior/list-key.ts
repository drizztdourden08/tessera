/* @layer renderer-components @kind logic */
import type { KeyboardEvent } from 'react';
import type { ComboboxKeyState } from '../../../primitives/Combobox/Combobox.type';
import type { CommandEntry } from '../CommandInput.type';
import { keyPress } from './key-press';
import { suggestKey } from './suggest-key';

const listKey = (
  event: KeyboardEvent<HTMLInputElement>,
  list: ComboboxKeyState<CommandEntry>,
  top: CommandEntry | undefined,
  complete: (command: string) => void,
): boolean => {
  if (!list.open) return false;
  const { value, selectionStart, selectionEnd } = event.currentTarget;
  const caretAtEnd = selectionStart === value.length && selectionEnd === value.length;
  const action = suggestKey(keyPress(event), caretAtEnd, list.active !== undefined);
  if (action !== 'complete') return action === 'list';
  const entry = list.active ?? top;
  if (!entry) return false;
  event.preventDefault();
  complete(entry.command);
  return true;
};

export { listKey };
