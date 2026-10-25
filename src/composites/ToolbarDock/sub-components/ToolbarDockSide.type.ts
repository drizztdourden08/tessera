/* @layer renderer-components @kind types */
import type { ToolbarLaneGrid } from '../behavior/toolbar-grid.type';
import type { ToolbarEndHandlersFor } from '../behavior/toolbar-resize-hook.type';
import type { ToolbarMetrics } from '../behavior/toolbar-resize.type';
import type { ToolbarDefinition, ToolbarDockProps, ToolbarLayout, ToolbarSide } from '../ToolbarDock.type';

interface ToolbarDockResize {
  layout: ToolbarLayout;
  metrics: ToolbarMetrics | null;
  handlersFor: ToolbarEndHandlersFor;
}

interface ToolbarDockSideProps {
  side: ToolbarSide;
  lanes: readonly ToolbarLaneGrid[];
  definitions: readonly ToolbarDefinition[];
  renderToolbar: ToolbarDockProps['renderToolbar'];
  dragId: string | null;
  resize: ToolbarDockResize;
}

export type { ToolbarDockSideProps };
