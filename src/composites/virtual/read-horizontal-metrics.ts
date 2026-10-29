/* @layer renderer-components @kind logic */
import { isHTMLElement } from '../../primitives/dom/is-html-element';
import type { VirtualMetrics } from './virtual.type';

const readHorizontalMetrics = (root: HTMLElement, body: HTMLElement, before: VirtualMetrics): VirtualMetrics => {
  const measured = body.firstElementChild;
  const size = isHTMLElement(measured) && measured.offsetWidth > 0 ? measured.offsetWidth : before.rowHeight;
  const passed = Math.max(0, root.getBoundingClientRect().left - body.getBoundingClientRect().left);
  return { top: Math.floor(passed / size) * size, viewport: root.clientWidth, rowHeight: size };
};

export { readHorizontalMetrics };
