/* @layer renderer-components @kind logic */
import type { TesseraStrings } from '../../strings/tessera-strings.type';

const sparklineLabel = (
  label: string, values: readonly number[], format: (value: number) => string, strings: TesseraStrings['charts'],
): string => {
  const finite = values.filter(Number.isFinite);
  const latest = finite[finite.length - 1];
  if (latest === undefined) return strings.sparklineEmpty(label);
  return strings.sparklineSummary(label, format(latest), format(Math.min(...finite)), format(Math.max(...finite)));
};

export { sparklineLabel };
