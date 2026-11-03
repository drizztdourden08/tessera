/* @layer renderer-components @kind constants */
import type { VirtualMetrics, VirtualSize } from './virtual.type';

const OVERSCAN = 10;

const SIZE_STEPS: readonly VirtualSize[] = [
  'size-24', 'size-28', 'size-32', 'size-40', 'size-48', 'size-56', 'size-64', 'size-80', 'size-96', 'size-128', 'size-160', 'size-192', 'size-224', 'size-256',
];

const SCROLLING_OVERFLOW: ReadonlySet<string> = new Set(['auto', 'scroll', 'overlay']);

const INITIAL_METRICS: VirtualMetrics = { top: 0, viewport: 800, rowHeight: 40 };

export { INITIAL_METRICS, OVERSCAN, SCROLLING_OVERFLOW, SIZE_STEPS };
