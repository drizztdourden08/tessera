/* @layer renderer-components @kind barrel */
export { Widget } from './Widget';
export { WidgetManager } from './sub-components/WidgetManager';
export type { WidgetManagerProps } from './sub-components/WidgetManager.type';
export { WidgetSettings } from './sub-components/WidgetSettings';
export type {
  WidgetState, WidgetLayout, WidgetDefinition, WidgetDisabledState, SnapSide, WidgetMode, WidgetVisibility, WidgetBounds,
} from './Widget.type';
export { DEFAULT_LAYOUT_STORAGE_KEY, TITLEBAR_HEIGHT } from './Widget.constants';
export { createDefaultLayout } from './behavior/create-default-layout';
export { getDevOnlyWidgetIds } from './behavior/get-dev-only-widget-ids';
export { getWidgetDefinition } from './behavior/get-widget-definition';
export { createDefaultWidgetState } from './behavior/create-default-widget-state';
export { computeDockedStyles } from './behavior/compute-docked-styles';
export type { DockedLayoutResult, ExclusiveInsets } from './behavior/compute-docked-styles.type';
export { loadLayoutLocal } from './behavior/load-layout-local';
export { saveLayoutLocal } from './behavior/save-layout-local';
export { loadLayoutForProfile } from './behavior/load-layout-for-profile';
export { saveLayoutForProfile } from './behavior/save-layout-for-profile';
export { startingLayout } from './behavior/starting-layout';
export { updateWidget } from './behavior/update-widget';
export { getWidgetState } from './behavior/get-widget-state';
export type { WidgetPersistenceIO } from './behavior/widget-store.type';
export { useWidgetLayout } from './behavior/useWidgetLayout';
export type { StartupOverride, UseWidgetLayoutParams } from './behavior/useWidgetLayout.type';
export { useWidgetDrag } from './behavior/useWidgetDrag';
export { useWidgetResize } from './behavior/useWidgetResize';
export { getDockedResizeEdge } from './behavior/get-docked-resize-edge';
