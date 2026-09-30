/* @layer renderer-components @kind logic */
import type { LayoutNode, PaneNode, WidgetId } from '../DockLayout.type';

const paneOf = (node: LayoutNode, id: WidgetId): PaneNode | null => {
  if (node.kind === 'pane') return node.widgets.includes(id) ? node : null;
  if (node.kind === 'main') return null;
  for (const child of node.children) {
    const hit = paneOf(child, id);
    if (hit) return hit;
  }
  return null;
};

export { paneOf };
