/* @layer renderer-components @kind logic */
import type { SparklineBand } from '../Sparkline.type';

const inBand = (value: number | undefined, band: SparklineBand | undefined): boolean =>
  value !== undefined && band !== undefined && value >= band.from && (band.to === undefined || value <= band.to);

export { inBand };
