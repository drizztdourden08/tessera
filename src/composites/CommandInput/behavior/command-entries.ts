/* @layer renderer-components @kind logic */
import type { CommandEntry, CommandOption } from '../CommandInput.type';

const commandEntries = (commands: readonly CommandOption[]): readonly CommandEntry[] =>
  commands.map((option) => (typeof option === 'string' ? { command: option } : option));

export { commandEntries };
