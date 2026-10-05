/* @layer renderer-components @kind hook */
import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { writeStored } from '../../../primitives/dom/write-stored';
import { HISTORY_LIMIT, IDLE_WALK, SUGGESTION_LIMIT } from '../CommandInput.constants';
import type { CommandControl, CommandEntry, CommandState, HistoryWalk } from '../CommandInput.type';
import { addToHistory } from './add-to-history';
import { commandKey } from './command-key';
import { runSuggestKey } from './run-suggest-key';
import { readStoredHistory } from './stored-history';
import { useCommandSuggest } from './useCommandSuggest';
import { walkHistory } from './walk-history';

const useCommandInput = (props: CommandState): CommandControl => {
  const { onSubmit, history: given, commands, maxSuggestions = SUGGESTION_LIMIT, storageKey, historyLimit = HISTORY_LIMIT } = props;
  const { value: controlled, defaultValue = '', onValueChange } = props;
  const [own, setOwn] = useState(() => readStoredHistory(storageKey));
  const [draft, setDraft] = useState(defaultValue);
  const [walk, setWalk] = useState<HistoryWalk>(IDLE_WALK);
  const value = controlled ?? draft;
  const history = given ?? own;
  const suggest = useCommandSuggest({ commands, limit: maxSuggestions, value, walking: walk.index !== null });
  const setValue = (next: string, nextWalk: HistoryWalk = IDLE_WALK) => {
    setWalk(nextWalk);
    suggest.reset();
    if (controlled === undefined) setDraft(next);
    onValueChange?.(next);
  };
  const complete = (entry: CommandEntry) => setValue(`${entry.command} `);
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
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (runSuggestKey(event, suggest, complete)) return;
    const { key, altKey, ctrlKey, metaKey, shiftKey } = event;
    const action = commandKey({ key, altKey, ctrlKey, metaKey, shiftKey, isComposing: event.nativeEvent.isComposing }, value, walk.index !== null);
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
  return { value, suggest, change: (next: string) => setValue(next), complete, send, onKeyDown, ready: value.trim() !== '' };
};

export { useCommandInput };
