/* @layer renderer-components @kind hook */
import { useMemo, useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { ComboboxKeyState } from '../../../primitives/Combobox/Combobox.type';
import { writeStored } from '../../../primitives/dom/write-stored';
import { HISTORY_LIMIT, IDLE_WALK, NO_COMMANDS, SUGGESTION_LIMIT } from '../CommandInput.constants';
import type { CommandControl, CommandEntry, CommandState, HistoryWalk } from '../CommandInput.type';
import { addToHistory } from './add-to-history';
import { commandEntries } from './command-entries';
import { commandKey } from './command-key';
import { keyPress } from './key-press';
import { listKey } from './list-key';
import { readStoredHistory } from './stored-history';
import { suggestCommands } from './suggest-commands';
import { walkHistory } from './walk-history';

const useCommandInput = (props: CommandState): CommandControl => {
  const { onSubmit, history: given, commands = NO_COMMANDS, maxSuggestions = SUGGESTION_LIMIT, storageKey, historyLimit = HISTORY_LIMIT } = props;
  const { value: controlled, defaultValue = '', onValueChange } = props;
  const [own, setOwn] = useState(() => readStoredHistory(storageKey));
  const [draft, setDraft] = useState(defaultValue);
  const [walk, setWalk] = useState<HistoryWalk>(IDLE_WALK);
  const value = controlled ?? draft;
  const history = given ?? own;
  const entries = useMemo(() => commandEntries(commands), [commands]);
  const hits = useMemo(() => (walk.index === null ? suggestCommands(entries, value, maxSuggestions) : []), [entries, value, maxSuggestions, walk.index]);
  const setValue = (next: string, nextWalk: HistoryWalk = IDLE_WALK) => {
    setWalk(nextWalk);
    if (controlled === undefined) setDraft(next);
    onValueChange?.(next);
  };
  const complete = (command: string | null) => {
    if (command !== null) setValue(`${command} `);
  };
  const send = () => {
    const command = value.trim();
    if (command === '' || onSubmit(command) === false) return;
    if (given === undefined) {
      const next = addToHistory(own, command, historyLimit);
      setOwn(next);
      writeStored(storageKey, next);
    }
    setValue('');
  };
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>, list: ComboboxKeyState<CommandEntry>) => {
    if (listKey(event, list, hits[0], complete)) return;
    const action = commandKey(keyPress(event), value, walk.index !== null);
    if (action === null) return;
    if (action === 'older' || action === 'newer') {
      const step = walkHistory(action, history, walk, value);
      if (step === null) return;
      event.preventDefault();
      setValue(step.value, step.walk);
      return;
    }
    event.preventDefault();
    if (action === 'clear') event.stopPropagation();
    if (action === 'send') send();
    else setValue('');
  };
  return { value, known: entries.length > 0, hits, change: (next: string) => setValue(next), complete, send, onKeyDown, ready: value.trim() !== '' };
};

export { useCommandInput };
