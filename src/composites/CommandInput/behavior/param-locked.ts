/* @layer renderer-components @kind logic */
import type { CommandParam, CommandValues } from '../CommandInput.type';
import { specFilled } from './spec-filled';

const paramLocked = (param: CommandParam, values: CommandValues): boolean =>
  param.dependsOn !== undefined && !specFilled(values[param.dependsOn]);

export { paramLocked };
