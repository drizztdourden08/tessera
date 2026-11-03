/* @layer renderer-components @kind logic */
import type { CommandSpec, CommandValues } from '../CommandInput.type';
import { specFilled } from './spec-filled';

const specReady = (spec: CommandSpec, values: CommandValues): boolean =>
  spec.params.every((param) => param.optional === true || param.kind === 'boolean' || specFilled(values[param.name]));

export { specReady };
