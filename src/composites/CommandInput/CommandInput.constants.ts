/* @layer renderer-components @kind constants */
import type { InputAdornment } from '../../primitives/field-control/input-adornment.type';
import type { CommandKeyAction, CommandParamKind, CommandSpec, CommandSpecState, HistoryWalk, SuggestKeyAction } from './CommandInput.type';

const HISTORY_LIMIT = 50;

const IDLE_WALK: HistoryWalk = Object.freeze({ index: null, draft: '' });

const COMMAND_ARROWS: Readonly<Partial<Record<string, CommandKeyAction>>> = { ArrowUp: 'older', ArrowDown: 'newer' };

const SUGGEST_KEYS: Readonly<Partial<Record<string, SuggestKeyAction>>> = {
  Tab: 'complete', ArrowDown: 'list', ArrowUp: 'list', PageDown: 'list', PageUp: 'list',
};

const SUGGESTION_LIMIT = 6;

const NO_COMMANDS: readonly [] = [];

const NO_SPECS: readonly CommandSpec[] = Object.freeze([]);

const IDLE_SPEC: CommandSpecState = Object.freeze({ id: null, values: Object.freeze({}) });

const NO_OPTIONS: readonly string[] = Object.freeze([]);

const PARAM_WIDTH: Readonly<Record<CommandParamKind, 'sm' | 'md'>> = { text: 'md', choice: 'md', number: 'sm', boolean: 'sm' };

const COMMAND_PROMPT: InputAdornment = { icon: 'chevron-right' };

export { COMMAND_ARROWS, COMMAND_PROMPT, HISTORY_LIMIT, IDLE_SPEC, IDLE_WALK, NO_COMMANDS, NO_OPTIONS, NO_SPECS, PARAM_WIDTH, SUGGEST_KEYS, SUGGESTION_LIMIT };
