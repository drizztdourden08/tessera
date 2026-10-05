/* @layer renderer-components @kind hook */
import { useEffect, useId, useMemo, useState } from 'react';
import { useListboxDrop } from '../../../primitives/listbox/useListboxDrop';
import { NO_COMMANDS } from '../CommandInput.constants';
import type { CommandSuggest, CommandSuggestParams } from '../CommandInput.type';
import { commandEntries } from './command-entries';
import { stepIndex } from './step-index';
import { suggestCommands } from './suggest-commands';

const useCommandSuggest = (params: CommandSuggestParams): CommandSuggest => {
  const { commands = NO_COMMANDS, limit, value, walking } = params;
  const entries = useMemo(() => commandEntries(commands), [commands]);
  const hits = useMemo(() => suggestCommands(entries, value, limit), [entries, value, limit]);
  const [active, setActive] = useState(-1);
  const [dismissed, setDismissed] = useState(false);
  const [focused, setFocused] = useState(false);
  const listId = useId();
  const wanted = hits.length > 0 && focused && !dismissed && !walking;
  const drop = useListboxDrop<HTMLDivElement>({ disabled: false, contentKey: hits, escape: false });
  const { open, show, close } = drop;

  useEffect(() => {
    if (wanted && !open) show();
    if (!wanted && open) close();
  }, [wanted, open, show, close]);

  const move = (step: 1 | -1) => {
    if (hits.length > 0) setActive((at) => stepIndex(at, step, hits.length));
  };

  return {
    known: entries.length > 0,
    hits,
    open: wanted && open,
    active: Math.min(active, hits.length - 1),
    listId,
    optionId: (index) => `${listId}-option-${index}`,
    drop,
    move,
    point: setActive,
    dismiss: () => setDismissed(true),
    reset: () => {
      setActive(-1);
      setDismissed(false);
    },
    setFocused,
  };
};

export { useCommandSuggest };
