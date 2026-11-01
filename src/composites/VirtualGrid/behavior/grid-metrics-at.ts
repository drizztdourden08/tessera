/* @layer renderer-components @kind logic */
import { HEADER_FALLBACK, HEADER_SELECTOR } from '../VirtualGrid.constants';
import { heightOf } from './height-of';
import type { VirtualMetrics } from '../../virtual';

const gridMetricsAt = (root: HTMLElement, body: HTMLElement, before: VirtualMetrics, rowHeight: number): VirtualMetrics => {
  const head = heightOf(body.querySelector(HEADER_SELECTOR), before.head ?? HEADER_FALLBACK);
  const step = Math.max(1, Math.min(rowHeight, head));
  const passed = Math.max(0, root.getBoundingClientRect().top - body.getBoundingClientRect().top);
  return { top: Math.floor(passed / step) * step, viewport: root.clientHeight, rowHeight, head };
};

export { gridMetricsAt };
