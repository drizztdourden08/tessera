/* @layer renderer-components @kind logic */
import { isHTMLElement } from '../../../primitives/dom/is-html-element';
import { TILE_SELECTOR } from '../VirtualGrid.constants';
import { gridMetricsAt } from './grid-metrics-at';
import type { VirtualMetrics } from '../../virtual';

const leastHeightOf = (node: Element | null, before: number): number => {
  if (!isHTMLElement(node)) return before;
  const least = Number.parseFloat(node.ownerDocument.defaultView?.getComputedStyle(node).minHeight ?? '');
  return least > 0 ? least : before;
};

const readMeasuredMetrics = (root: HTMLElement, body: HTMLElement, before: VirtualMetrics): VirtualMetrics =>
  gridMetricsAt(root, body, before, leastHeightOf(body.querySelector(TILE_SELECTOR), before.rowHeight));

export { readMeasuredMetrics };
