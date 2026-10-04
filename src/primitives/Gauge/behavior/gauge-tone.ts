/* @layer renderer-components @kind logic */
import type { GaugeLevel, GaugeThresholds } from '../Gauge.type';

const gaugeTone = (value: number, thresholds: GaugeThresholds): GaugeLevel => {
  const rising = thresholds.danger >= thresholds.warning;
  const reached = (edge: number) => (rising ? value >= edge : value <= edge);
  if (reached(thresholds.danger)) return 'danger';
  if (reached(thresholds.warning)) return 'warning';
  return 'success';
};

export { gaugeTone };
