/* @layer renderer-components @kind logic */
import { NO_OPTIONS } from '../CommandInput.constants';
import type { CommandParam, CommandValues } from '../CommandInput.type';

const paramOptions = (param: CommandParam, values: CommandValues): readonly string[] => {
  const { options } = param;
  if (options === undefined) return NO_OPTIONS;
  return typeof options === 'function' ? options(values) : options;
};

export { paramOptions };
