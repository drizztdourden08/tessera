/* @layer renderer-components @kind logic */
import type { ToolbarLayout } from '../ToolbarDock.type';

const toolbarLabelsOf = (layout: ToolbarLayout, id: string): { labels?: boolean } => {
  const on = layout.labels?.[id];
  return on === undefined ? {} : { labels: on };
};

export { toolbarLabelsOf };
