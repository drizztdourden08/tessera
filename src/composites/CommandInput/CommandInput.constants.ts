/* @layer renderer-components @kind constants */
import type { InputAdornment } from '../../primitives/field-control/input-adornment.type';
import type { CommandKeyAction, HistoryWalk, SuggestKeyAction } from './CommandInput.type';

const HISTORY_LIMIT = 50;

const IDLE_WALK: HistoryWalk = Object.freeze({ index: null, draft: '' });

const COMMAND_ARROWS: Readonly<Partial<Record<string, CommandKeyAction>>> = { ArrowUp: 'older', ArrowDown: 'newer' };

const SUGGEST_KEYS: Readonly<Partial<Record<string, SuggestKeyAction>>> = {
  Tab: 'complete', ArrowDown: 'list', ArrowUp: 'list', PageDown: 'list', PageUp: 'list',
};

const SUGGESTION_LIMIT = 6;

const NO_COMMANDS: readonly [] = [];

const COMMAND_PROMPT: InputAdornment = { icon: 'chevron-right' };

export { COMMAND_ARROWS, COMMAND_PROMPT, HISTORY_LIMIT, IDLE_WALK, NO_COMMANDS, SUGGEST_KEYS, SUGGESTION_LIMIT };
