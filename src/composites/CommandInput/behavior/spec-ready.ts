/* @layer renderer-components @kind logic */
import type { CommandSpec, CommandValues } from '../CommandInput.type';
import { specFilled } from './spec-filled';
import { specNames } from './spec-names';

const specReady = (spec: CommandSpec, values: CommandValues): boolean => {
  if (spec.pattern !== undefined) return specNames(spec.pattern).every((name) => specFilled(values[name]));
  return spec.params.every((param) => param.optional === true || param.kind === 'boolean' || specFilled(values[param.name]));
};

export { specReady };
