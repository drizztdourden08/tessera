/* @layer renderer-components @kind logic */
import type { VirtualAxis, VirtualMetrics } from '../../virtual';
import type { ItemLayout } from './item-layout.type';

const variableMetrics = (layout: ItemLayout, axis: VirtualAxis) => (root: HTMLElement, body: HTMLElement, before: VirtualMetrics): VirtualMetrics => {
  const across = axis === 'horizontal';
  const rootBox = root.getBoundingClientRect();
  const bodyBox = body.getBoundingClientRect();
  const passed = Math.max(0, across ? rootBox.left - bodyBox.left : rootBox.top - bodyBox.top);
  const average = layout.count > 0 && layout.total > 0 ? Math.max(1, Math.round(layout.total / layout.count)) : before.rowHeight;
  return { top: layout.startOf(layout.indexAt(passed)), viewport: across ? root.clientWidth : root.clientHeight, rowHeight: average };
};

export { variableMetrics };
