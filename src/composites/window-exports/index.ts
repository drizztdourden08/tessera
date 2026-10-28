/* @layer renderer-components @kind barrel */
export { WindowHeader, type WindowHeaderActionsRow, type WindowHeaderProps } from '../WindowHeader';
export { WindowTitleBar } from '../WindowTitleBar';
export type {
  WindowControl, WindowControlsConfig, WindowTitleBarAction, WindowTitleBarActionBar, WindowTitleBarCommandAction,
  WindowTitleBarDropdownAction, WindowTitleBarInstance, WindowTitleBarItemId, WindowTitleBarProps, WindowTitleBarTucked, WindowTitleBarTuckedItem, WindowTitleBarViewPlace,
  WindowTitleBarViewPosition, WindowTitleBarVolumeAction,
} from '../WindowTitleBar';
export {
  Widget, WidgetManager, WidgetOptions, useWidgetLayout, createDefaultLayout, getDevOnlyWidgetIds, getWidgetDefinition,
  migrateLayout, loadLayoutForProfile, loadLayoutLocal, saveLayoutForProfile, saveLayoutLocal, applyEdit, dockOnEdge, dockWidget,
  dropFrame, edgeOf, floatInMain, floatWidget, frameOf, isWidgetOpen, moveMain, openStartupWidgets, openWidget, placementOf,
  popOutWidget, removeEverywhere, resolveSplit, setFrame, setMakeRoom, setPopped, visibleLayoutOf, DEFAULT_LAYOUT_STORAGE_KEY,
  WIDGET_OPTIONS_ATTRIBUTE,
} from '../Widget';
export type {
  DockPlace, FlatWidgetLayout, FlatWidgetState, PinMode, PoppedWidget, ResolvedSplit, SnapLink, SnapSide, StartupOverride,
  UseWidgetLayoutParams, WidgetBodyLook, WidgetChrome, WidgetContextActive, WidgetDefinition, WidgetDisabledState, WidgetFrame, WidgetGates, WidgetLayout,
  WidgetManagerProps, WidgetOptionsProps, WidgetPadding, WidgetPersistenceIO, WidgetPlacement, WidgetProps, WidgetTab, WidgetVisibility,
  WidgetWindowOptions, WindowBounds,
} from '../Widget';
export { WindowGuideOverlay } from '../WindowGuideOverlay';
export type { WindowGuideHint, WindowGuideMode, WindowGuideOverlayProps, WindowGuidePointer } from '../WindowGuideOverlay';
export {
  DockLayout, EDGES, GAP, MAIN_NODE, STRIP, cornerEnds, createPane, evenSplit, findLeaf, floatingRect, holdsMain, insertAt, keepsGroups, layoutTree,
  mainRectOf, paneOf, patchPane, placeFloating, removeLeaf, removeWidget, resizeSplit, swapPanes, toFloating, turnCorner, useDockKeys,
  widgetsIn, wrapBeside,
} from '../DockLayout';
export type {
  CornerEnd, CornerHandle, CornerName, CornerOptions, CornerTurn, DividerRect, DockDrop, DockDropKind, DockDropSlot, DockEdge, DockKeys, DockLayoutProps, DockMainGrip, DockTarget, DockTree, DragModifiers, DropTarget, ExternalDrag, FloatingWidget,
  LaidOut, LayoutEdit, LayoutNode, LeafNode, LeafRect, MainNode, MainTarget, PaneNode, Rect, ScreenPoint, Size, SplitAxis, SplitNode, WidgetId,
} from '../DockLayout';
export {
  MAX_LANES, MAX_PER_SIDE, MIN_SHARE, TOOLBAR_LAYOUT_V, ToolbarDock, canShowToolbar, createToolbarLayout, hideToolbar, isToolbarShown, migrateToolbarLayout,
  moveToolbar, moveToolbarToSide, normalizeCorners, placeToolbar, setToolbarLabels, showToolbar, toggleToolbar, toolbarIdsOf, toolbarMenuGroups, toolbarOrientation, useToolbarLayout,
} from '../ToolbarDock';
export type {
  ToolbarCorner, ToolbarCornerClaim, ToolbarDefinition, ToolbarDockHandle, ToolbarDockProps, ToolbarLayout, ToolbarLayoutApi, ToolbarMenuWords, ToolbarPlace, ToolbarSide,
  ToolbarSlot, ToolbarSpot, UseToolbarLayoutParams,
} from '../ToolbarDock';
