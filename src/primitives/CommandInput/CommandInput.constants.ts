/* @layer renderer-components @kind constants */
import type { CommandKeyAction, HistoryWalk } from './CommandInput.type';

const HISTORY_LIMIT = 50;

const IDLE_WALK: HistoryWalk = Object.freeze({ index: null, draft: '' });

const COMMAND_ARROWS: Readonly<Partial<Record<string, CommandKeyAction>>> = { ArrowUp: 'older', ArrowDown: 'newer' };

export { COMMAND_ARROWS, HISTORY_LIMIT, IDLE_WALK };
