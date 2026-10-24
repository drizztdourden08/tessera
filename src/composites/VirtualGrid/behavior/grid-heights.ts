/* @layer renderer-components @kind logic */
import { HEADER_FALLBACK } from '../VirtualGrid.constants';
import type { VirtualMetrics } from '../../virtual';
import type { GridHeights } from './grid-layout.type';

const gridHeights = (metrics: VirtualMetrics): GridHeights => ({ tile: metrics.rowHeight, head: metrics.head ?? HEADER_FALLBACK });

export { gridHeights };
