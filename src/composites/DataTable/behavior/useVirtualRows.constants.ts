/* @layer renderer-components @kind constants */
import type { VirtualMetrics } from './useVirtualRows.type';

const OVERSCAN = 10;

const INITIAL_METRICS: VirtualMetrics = { top: 0, viewport: 800, rowHeight: 40 };

const INDEX_ATTRIBUTE = 'data-dt-index';

const INDEX_SELECTOR = `[${INDEX_ATTRIBUTE}]`;

const NO_ITEMS: readonly never[] = [];

export { INDEX_ATTRIBUTE, INDEX_SELECTOR, INITIAL_METRICS, NO_ITEMS, OVERSCAN };
