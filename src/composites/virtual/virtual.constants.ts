/* @layer renderer-components @kind constants */
import type { VirtualMetrics } from './virtual.type';

const OVERSCAN = 10;

const INITIAL_METRICS: VirtualMetrics = { top: 0, viewport: 800, rowHeight: 40 };

export { INITIAL_METRICS, OVERSCAN };
