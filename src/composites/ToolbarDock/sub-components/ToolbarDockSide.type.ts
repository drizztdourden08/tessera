/* @layer renderer-components @kind types */
import type { ToolbarDefinition, ToolbarDockProps, ToolbarSide } from '../ToolbarDock.type';

interface ToolbarDockSideProps {
  side: ToolbarSide;
  ids: readonly string[];
  definitions: readonly ToolbarDefinition[];
  renderToolbar: ToolbarDockProps['renderToolbar'];
  dragId: string | null;
}

export type { ToolbarDockSideProps };
