/* @layer renderer-components @kind types */
import type { ResizeChange } from '../../ResizeHandle/ResizeHandle.type';
import type { ToolbarDefinition, ToolbarLayout } from '../ToolbarDock.type';
import type { ToolbarWords } from './toolbar-key.type';
import type { ToolbarEnd, ToolbarMetrics } from './toolbar-resize.type';

interface ToolbarResizeParams {
  layout: ToolbarLayout;
  definitions: readonly ToolbarDefinition[];
  metrics: ToolbarMetrics | null;
  onLayoutChange: (layout: ToolbarLayout) => void;
  say: (message: string) => void;
}

interface ToolbarResizeLatest extends ToolbarResizeParams {
  words: ToolbarWords;
}

interface ToolbarEndHandlers {
  onResize: (px: number, change: ResizeChange) => void;
  onResizeEnd: (px: number) => void;
  onDragChange: (dragging: boolean) => void;
}

type ToolbarEndHandlersFor = (id: string, end: ToolbarEnd) => ToolbarEndHandlers;

export type { ToolbarEndHandlers, ToolbarEndHandlersFor, ToolbarResizeLatest, ToolbarResizeParams };
