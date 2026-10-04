/* @layer renderer-components @kind logic */
import { ARC_LENGTH } from '../Gauge.constants';
import type { GaugeLevel, GaugeThresholds, GaugeZone } from '../Gauge.type';
import { gaugeFraction } from './gauge-fraction';

const gaugeZones = (min: number, max: number, thresholds: GaugeThresholds): GaugeZone[] => {
  const rising = thresholds.danger >= thresholds.warning;
  const at = (value: number) => gaugeFraction(value, min, max) * ARC_LENGTH;
  const low = at(Math.min(thresholds.warning, thresholds.danger));
  const high = at(Math.max(thresholds.warning, thresholds.danger));
  const order: GaugeLevel[] = rising ? ['success', 'warning', 'danger'] : ['danger', 'warning', 'success'];
  const edges: readonly [number, number, number, number] = [0, low, high, ARC_LENGTH];
  return order
    .map((tone, index) => ({ tone, start: edges[index] ?? 0, length: (edges[index + 1] ?? ARC_LENGTH) - (edges[index] ?? 0) }))
    .filter((zone) => zone.length > 0);
};

export { gaugeZones };
