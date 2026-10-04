/* @layer stories @kind data */
import type { SparklineBand, SparklineTone } from '../../../src/primitives';
import { CPU_SERIES, FPS_SERIES } from '../../composites/_samples/chart-samples.constants';

const SPARKLINE_TONES: readonly SparklineTone[] = ['primary', 'success', 'warning', 'danger', 'info', 'neutral', 'violet', 'teal'];

const WARNING_ABOVE_80: SparklineBand = { from: 80, tone: 'warning' };

const DANGER_BELOW_60: SparklineBand = { from: 0, to: 60, tone: 'danger' };

const SAFE_RANGE: SparklineBand = { from: 40, to: 70, tone: 'success' };

const BAND_SAMPLES = [
  { key: 'above', label: 'Warning above 80', values: CPU_SERIES, band: WARNING_ABOVE_80, max: 100, tone: 'primary' },
  { key: 'below', label: 'Danger under 60 fps', values: FPS_SERIES, band: DANGER_BELOW_60, max: 165, tone: 'success' },
  { key: 'between', label: 'A safe range', values: CPU_SERIES, band: SAFE_RANGE, max: 100, tone: 'info' },
] as const;

export { BAND_SAMPLES, SPARKLINE_TONES };
