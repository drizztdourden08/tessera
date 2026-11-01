/* @layer renderer-components @kind logic */
import { HEADER_FALLBACK } from '../VirtualGrid.constants';
import type { VirtualMetrics } from '../../virtual';
import type { GridHeights, GridOffsets } from './grid-layout.type';

const gridHeights = (metrics: VirtualMetrics, offsets?: GridOffsets): GridHeights => ({
  tile: metrics.rowHeight, head: metrics.head ?? HEADER_FALLBACK, offsets,
});

export { gridHeights };
