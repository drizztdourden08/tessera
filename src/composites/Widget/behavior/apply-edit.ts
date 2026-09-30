/* @layer renderer-components @kind logic */
import { evenSplit, patchPane, resizeSplit, swapPanes } from '../../DockLayout';
import type { LayoutEdit, Rect } from '../../DockLayout';
import type { WidgetLayout } from '../Widget.type';
import { dockWidget } from './dock-widget';
import { floatWidget } from './float-widget';
import { moveMain } from './move-main';
import { popOutWidget } from './pop-out-widget';
import { resolveSplit } from './resolve-split';
import type { SplitEdit } from './widget-layout.type';

const applySplitEdit = (layout: WidgetLayout, edit: SplitEdit): WidgetLayout => {
  const hit = resolveSplit(layout.dock, edit.node, edit.index);
  if (!hit) return layout;
  const dock = edit.type === 'resize' ? resizeSplit(layout.dock, hit.node, hit.index, edit.delta) : evenSplit(layout.dock, hit.node, hit.index);
  return { ...layout, dock };
};

const applyEdit = (layout: WidgetLayout, edit: LayoutEdit, main: Rect): WidgetLayout => {
  switch (edit.type) {
    case 'move-widget': return dockWidget(layout, edit.id, edit.target, edit.makeRoom);
    case 'float-widget': return floatWidget(layout, edit.id, edit.rect, main);
    case 'move-main': return moveMain(layout, edit.target);
    case 'swap-panes': return { ...layout, dock: swapPanes(layout.dock, edit.keyA, edit.keyB) };
    case 'resize':
    case 'even': return applySplitEdit(layout, edit);
    case 'activate-tab': return { ...layout, dock: patchPane(layout.dock, edit.key, { active: edit.id }) };
    case 'pop-out': return popOutWidget(layout, edit.id);
  }
};

export { applyEdit };
