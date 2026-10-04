/* @layer stories @kind logic */
import type { StatTrend } from '../../../src/composites';

const seriesChange = (series: readonly number[], still: number, digits: number): { trend: StatTrend; text: string } => {
  const last = series.at(-1) ?? 0;
  const change = last - (series.at(-2) ?? last);
  if (Math.abs(change) < still) return { trend: 'flat', text: (0).toFixed(digits) };
  return { trend: change > 0 ? 'up' : 'down', text: `${change > 0 ? '+' : ''}${change.toFixed(digits)}` };
};

export { seriesChange };
