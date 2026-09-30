/* @layer renderer-components @kind logic */
import type { LayoutNode, WidgetId } from '../DockLayout.type';

const widgetsIn = (node: LayoutNode): WidgetId[] => {
  if (node.kind === 'pane') return node.widgets;
  if (node.kind === 'split') return node.children.flatMap(widgetsIn);
  return [];
};

export { widgetsIn };
