/* @layer renderer-components @kind logic */
import type { CommandSpecState, CommandValue } from '../CommandInput.type';

const specWithValue = (state: CommandSpecState, name: string, value: CommandValue | undefined): CommandSpecState => {
  const kept = Object.entries(state.values).filter(([key]) => key !== name);
  const entries: [string, CommandValue][] = value === undefined ? kept : [...kept, [name, value]];
  return { ...state, values: Object.fromEntries(entries) };
};

export { specWithValue };
