/* @layer renderer-components @kind types */
import type { GaugeZone } from '../Gauge.type';

interface GaugeDialProps {
  fraction: number;
  zones: readonly GaugeZone[];
}

export type { GaugeDialProps };
