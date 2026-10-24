/* @layer renderer-components @kind logic */
import { isHTMLElement } from '../../../primitives/dom/is-html-element';
import { HEADER_FALLBACK, HEADER_SELECTOR, TILE_SELECTOR } from '../VirtualGrid.constants';
import type { VirtualMetrics } from '../../virtual';

const heightOf = (node: Element | null, before: number): number =>
  (isHTMLElement(node) && node.offsetHeight > 0 ? node.offsetHeight : before);

const readGridMetrics = (root: HTMLElement, body: HTMLElement, before: VirtualMetrics): VirtualMetrics => {
  const rowHeight = heightOf(body.querySelector(TILE_SELECTOR), before.rowHeight);
  const head = heightOf(body.querySelector(HEADER_SELECTOR), before.head ?? HEADER_FALLBACK);
  const step = Math.max(1, Math.min(rowHeight, head));
  const passed = Math.max(0, root.getBoundingClientRect().top - body.getBoundingClientRect().top);
  return { top: Math.floor(passed / step) * step, viewport: root.clientHeight, rowHeight, head };
};

export { readGridMetrics };
