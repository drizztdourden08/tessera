/* @layer renderer-components @kind logic */
import { MAIN_NODE, removeWidget } from '../../DockLayout';
import type { WidgetId } from '../../DockLayout';
import type { WidgetLayout } from '../Widget.type';

const removeEverywhere = (layout: WidgetLayout, id: WidgetId): WidgetLayout => {
  const popped = layout.popped.find((p) => p.id === id);
  const poppedMemory = popped ? { ...layout.poppedMemory, [id]: { ...popped, link: null } } : layout.poppedMemory;
  return {
    ...layout,
    dock: removeWidget(layout.dock, id) ?? MAIN_NODE,
    floating: layout.floating.filter((f) => f.id !== id),
    popped: layout.popped.filter((p) => p.id !== id),
    ...(poppedMemory ? { poppedMemory } : {}),
  };
};

export { removeEverywhere };
