/* @layer renderer-components @kind types */
import type { ToolbarEndHandlers } from '../behavior/toolbar-resize-hook.type';
import type { ToolbarEnd, ToolbarMetrics } from '../behavior/toolbar-resize.type';
import type { ToolbarLayout, ToolbarSide } from '../ToolbarDock.type';

interface ToolbarDockEndProps {
  id: string;
  label: string;
  end: ToolbarEnd;
  side: ToolbarSide;
  layout: ToolbarLayout;
  metrics: ToolbarMetrics | null;
  handlers: ToolbarEndHandlers;
}

export type { ToolbarDockEndProps };
