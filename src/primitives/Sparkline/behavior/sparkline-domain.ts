/* @layer renderer-components @kind logic */
import type { SparklineDomain } from '../Sparkline.type';

const sparklineDomain = (values: readonly number[], min?: number, max?: number): SparklineDomain => {
  const finite = values.filter(Number.isFinite);
  const low = min ?? (finite.length ? Math.min(...finite) : 0);
  const high = max ?? (finite.length ? Math.max(...finite) : 1);
  if (high > low) return { low, high };
  if (max === undefined) return { low, high: low + 1 };
  return { low: high - 1, high };
};

export { sparklineDomain };
