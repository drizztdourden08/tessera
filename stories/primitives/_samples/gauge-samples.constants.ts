/* @layer stories @kind data */
import type { GaugeThresholds } from '../../../src/primitives';

const FPS_THRESHOLDS: GaugeThresholds = { warning: 60, danger: 30 };

const GAUGE_LEVELS = [
  { key: 'low', label: 'under 60%', value: 34 },
  { key: 'mid', label: '60% to 85%', value: 72 },
  { key: 'high', label: '85% and up', value: 93 },
] as const;

export { FPS_THRESHOLDS, GAUGE_LEVELS };
