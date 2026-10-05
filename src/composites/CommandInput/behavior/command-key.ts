/* @layer renderer-components @kind logic */
import { COMMAND_ARROWS } from '../CommandInput.constants';
import type { CommandKeyAction, CommandKeyEvent } from '../CommandInput.type';
import { heldKey } from './held-key';

const commandKey = (event: CommandKeyEvent, value: string, walking: boolean): CommandKeyAction => {
  if (heldKey(event)) return null;
  if (event.key === 'Escape') return value !== '' || walking ? 'clear' : null;
  if (event.key === 'Enter') return 'send';
  return COMMAND_ARROWS[event.key] ?? null;
};

export { commandKey };
