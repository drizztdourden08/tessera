/* @layer renderer-components @kind logic */
import type { CommandSpec, CommandValues } from '../CommandInput.type';

const specStart = (spec: CommandSpec): CommandValues => {
  if (spec.pattern !== undefined) return {};
  return Object.fromEntries(spec.params.filter((param) => param.kind === 'boolean').map((param) => [param.name, false]));
};

export { specStart };
