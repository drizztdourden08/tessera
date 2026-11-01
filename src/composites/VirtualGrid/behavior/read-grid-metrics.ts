/* @layer renderer-components @kind logic */
import { TILE_SELECTOR } from '../VirtualGrid.constants';
import { gridMetricsAt } from './grid-metrics-at';
import { heightOf } from './height-of';
import type { VirtualMetrics } from '../../virtual';

const readGridMetrics = (root: HTMLElement, body: HTMLElement, before: VirtualMetrics): VirtualMetrics =>
  gridMetricsAt(root, body, before, heightOf(body.querySelector(TILE_SELECTOR), before.rowHeight));

export { readGridMetrics };
