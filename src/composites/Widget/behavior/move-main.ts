/* @layer renderer-components @kind logic */
import { MAIN_NODE, findLeaf, insertAt, removeLeaf } from '../../DockLayout';
import type { MainTarget } from '../../DockLayout';
import type { WidgetLayout } from '../Widget.type';

const moveMain = (layout: WidgetLayout, target: MainTarget): WidgetLayout => {
  const rest = removeLeaf(layout.dock, MAIN_NODE.key);
  if (!rest) return layout;
  if (target.at === 'leaf' && findLeaf(rest, target.key) === null) return layout;
  return { ...layout, dock: insertAt(rest, MAIN_NODE, target) };
};

export { moveMain };
