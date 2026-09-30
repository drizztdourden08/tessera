/* @layer renderer-components @kind logic */
import type { WidgetId } from '../../DockLayout';
import type { WidgetLayout } from '../Widget.type';
import { removeEverywhere } from './remove-everywhere';

const popOutWidget = (layout: WidgetLayout, id: WidgetId): WidgetLayout => {
  const kept = layout.popped.find((p) => p.id === id) ?? layout.poppedMemory?.[id];
  const cleared = removeEverywhere(layout, id);
  return { ...cleared, popped: [...cleared.popped, { ...kept, id, link: null }] };
};

export { popOutWidget };
