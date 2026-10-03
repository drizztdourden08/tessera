/* @layer renderer-components @kind barrel */
export { DockLayout } from './DockLayout';
export { EDGES, GAP, MAIN_NODE, STRIP } from './DockLayout.constants';
export type {
  DockEdge, DockLayoutProps, DockMainGrip, DockTarget, DockTree, DragModifiers, DropTarget, ExternalDrag, FloatingWidget, LayoutEdit,
  LayoutNode, LeafNode, MainNode, MainTarget, PaneNode, Rect, ScreenPoint, Size, SplitAxis, SplitNode, WidgetId,
} from './DockLayout.type';
export type { DividerRect, LaidOut, LeafRect } from './behavior/layout-tree.type';
export { layoutTree } from './behavior/layout-tree';
export { mainRectOf } from './behavior/main-rect-of';
export { holdsMain } from './behavior/holds-main';
export { createPane } from './behavior/create-pane';
export { evenSplit } from './behavior/even-split';
export { findLeaf } from './behavior/find-leaf';
export { insertAt } from './behavior/insert-at';
export { paneOf } from './behavior/pane-of';
export { patchPane } from './behavior/patch-pane';
export { removeLeaf } from './behavior/remove-leaf';
export { removeWidget } from './behavior/remove-widget';
export { resizeSplit } from './behavior/resize-split';
export { swapPanes } from './behavior/swap-panes';
export { widgetsIn } from './behavior/widgets-in';
export { wrapBeside } from './behavior/wrap-beside';
export { floatingRect } from './behavior/floating-rect';
export { placeFloating } from './behavior/place-floating';
export { toFloating } from './behavior/to-floating';
export { useDockKeys } from './behavior/useDockKeys';
export type { DockKeys } from './behavior/dock-hooks.type';
