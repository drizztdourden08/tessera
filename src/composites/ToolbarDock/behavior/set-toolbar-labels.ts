/* @layer renderer-components @kind logic */
import type { ToolbarLayout } from '../ToolbarDock.type';

const setToolbarLabels = (layout: ToolbarLayout, id: string, on: boolean): ToolbarLayout =>
  layout.labels?.[id] === on ? layout : { ...layout, labels: { ...layout.labels, [id]: on } };

export { setToolbarLabels };
