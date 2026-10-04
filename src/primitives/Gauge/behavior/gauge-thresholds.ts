/* @layer renderer-components @kind logic */
import { DEFAULT_SHARES } from '../Gauge.constants';
import type { GaugeThresholds } from '../Gauge.type';

const gaugeThresholds = (min: number, max: number, thresholds?: GaugeThresholds): GaugeThresholds =>
  thresholds ?? {
    warning: min + (max - min) * DEFAULT_SHARES.warning,
    danger: min + (max - min) * DEFAULT_SHARES.danger,
  };

export { gaugeThresholds };
