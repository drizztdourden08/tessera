/* @layer renderer-components @kind constants */
import type { CommandKeyAction, HistoryWalk, SuggestKeyAction } from './CommandInput.type';

const HISTORY_LIMIT = 50;

const IDLE_WALK: HistoryWalk = Object.freeze({ index: null, draft: '' });

const COMMAND_ARROWS: Readonly<Partial<Record<string, CommandKeyAction>>> = { ArrowUp: 'older', ArrowDown: 'newer' };

const SUGGEST_KEYS: Readonly<Partial<Record<string, SuggestKeyAction>>> = {
  ArrowDown: 'next', ArrowUp: 'previous', Tab: 'complete', Escape: 'close',
};

const SUGGESTION_LIMIT = 6;

const NO_COMMANDS: readonly [] = [];

export { COMMAND_ARROWS, HISTORY_LIMIT, IDLE_WALK, NO_COMMANDS, SUGGEST_KEYS, SUGGESTION_LIMIT };
