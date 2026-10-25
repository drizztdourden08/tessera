/* @layer renderer-components @kind types */
import type { ToolbarDefinition, ToolbarDockProps, ToolbarPlace, ToolbarSide } from '../ToolbarDock.type';

interface ToolbarDockSideProps {
  side: ToolbarSide;
  lanes: readonly (readonly ToolbarPlace[])[];
  definitions: readonly ToolbarDefinition[];
  renderToolbar: ToolbarDockProps['renderToolbar'];
  dragId: string | null;
}

export type { ToolbarDockSideProps };
