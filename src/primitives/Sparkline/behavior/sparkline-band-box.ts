/* @layer renderer-components @kind logic */
import type { SparklineBand, SparklineBandBox, SparklineDomain } from '../Sparkline.type';
import { valueToY } from './value-to-y';

const sparklineBandBox = (band: SparklineBand | undefined, domain: SparklineDomain): SparklineBandBox | null => {
  if (!band) return null;
  const from = Math.max(band.from, domain.low);
  const to = Math.min(band.to ?? domain.high, domain.high);
  if (to <= from) return null;
  const top = valueToY(to, domain);
  const bottom = valueToY(from, domain);
  const edges = [band.from > domain.low ? bottom : null, band.to !== undefined && band.to < domain.high ? top : null];
  return { top, bottom, edges: edges.filter((edge) => edge !== null) };
};

export { sparklineBandBox };
