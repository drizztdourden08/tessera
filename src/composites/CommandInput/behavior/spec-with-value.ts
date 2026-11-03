/* @layer renderer-components @kind logic */
import type { CommandSpec, CommandSpecState, CommandValue } from '../CommandInput.type';
import { specDependents } from './spec-dependents';

const specWithValue = (state: CommandSpecState, spec: CommandSpec | null, name: string, value: CommandValue | undefined): CommandSpecState => {
  const dropped = !Object.is(state.values[name], value) && spec !== null && spec.pattern === undefined ? specDependents(spec, name) : [];
  const kept = Object.entries(state.values).filter(([key]) => key !== name && !dropped.includes(key));
  const entries: [string, CommandValue][] = value === undefined ? kept : [...kept, [name, value]];
  return { ...state, values: Object.fromEntries(entries) };
};

export { specWithValue };
