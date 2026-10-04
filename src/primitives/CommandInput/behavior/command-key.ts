/* @layer renderer-components @kind logic */
import { COMMAND_ARROWS } from '../CommandInput.constants';
import type { CommandKeyAction, CommandKeyEvent } from '../CommandInput.type';

const held = (event: CommandKeyEvent): boolean => event.isComposing || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;

const commandKey = (event: CommandKeyEvent, value: string, walking: boolean): CommandKeyAction => {
  if (held(event)) return null;
  if (event.key === 'Escape') return value !== '' || walking ? 'clear' : null;
  if (event.key === 'Enter') return 'send';
  return COMMAND_ARROWS[event.key] ?? null;
};

export { commandKey };
