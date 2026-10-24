/* @layer renderer-components @kind logic */
import { isHTMLElement } from '../../primitives/dom/is-html-element';
import type { VirtualMetrics } from './virtual.type';

const readVirtualMetrics = (root: HTMLElement, body: HTMLElement, before: VirtualMetrics): VirtualMetrics => {
  const measured = body.firstElementChild;
  const rowHeight = isHTMLElement(measured) && measured.offsetHeight > 0 ? measured.offsetHeight : before.rowHeight;
  const passed = Math.max(0, root.getBoundingClientRect().top - body.getBoundingClientRect().top);
  return { top: Math.floor(passed / rowHeight) * rowHeight, viewport: root.clientHeight, rowHeight };
};

export { readVirtualMetrics };
