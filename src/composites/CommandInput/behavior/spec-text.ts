/* @layer renderer-components @kind logic */
import { parsePattern, patternText } from '../../DynamicInput';
import type { CommandSpec, CommandValues } from '../CommandInput.type';
import { specPatternValue } from './spec-pattern-value';

const specText = (spec: CommandSpec, values: CommandValues): string => {
  if (spec.pattern === undefined) return spec.format(values);
  return spec.format?.(values) ?? patternText(parsePattern(spec.pattern), specPatternValue(spec.pattern, values));
};

export { specText };
