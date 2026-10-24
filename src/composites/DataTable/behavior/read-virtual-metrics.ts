/* @layer renderer-components @kind logic */
import { isHTMLElement } from '../../../primitives/dom/is-html-element';
import type { VirtualMetrics } from './useVirtualRows.type';

const readVirtualMetrics = (root: HTMLElement, body: HTMLElement, fallbackHeight: number): VirtualMetrics => {
  const measured = body.firstElementChild;
  const rowHeight = isHTMLElement(measured) && measured.offsetHeight > 0 ? measured.offsetHeight : fallbackHeight;
  const passed = Math.max(0, root.getBoundingClientRect().top - body.getBoundingClientRect().top);
  return { top: Math.floor(passed / rowHeight) * rowHeight, viewport: root.clientHeight, rowHeight };
};

export { readVirtualMetrics };
