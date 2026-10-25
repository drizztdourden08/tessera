/* @layer renderer-components @kind types */
import type { ToolbarLaneGrid } from '../behavior/toolbar-grid.type';
import type { ToolbarDefinition, ToolbarDockProps, ToolbarSide } from '../ToolbarDock.type';

interface ToolbarDockSideProps {
  side: ToolbarSide;
  lanes: readonly ToolbarLaneGrid[];
  definitions: readonly ToolbarDefinition[];
  renderToolbar: ToolbarDockProps['renderToolbar'];
  dragId: string | null;
}

export type { ToolbarDockSideProps };
