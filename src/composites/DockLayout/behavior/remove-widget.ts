/* @layer renderer-components @kind logic */
import type { LayoutNode, WidgetId } from '../DockLayout.type';
import { rebuildSplit } from './rebuild-split';

const removeWidget = (node: LayoutNode, id: WidgetId): LayoutNode | null => {
  if (node.kind === 'main') return node;
  if (node.kind === 'pane') {
    if (!node.widgets.includes(id)) return node;
    const widgets = node.widgets.filter((w) => w !== id);
    if (widgets.length === 0) return null;
    return { ...node, widgets, active: widgets.includes(node.active) ? node.active : widgets[0] ?? node.active };
  }
  return rebuildSplit(node, node.children.map((child) => removeWidget(child, id)));
};

export { removeWidget };
