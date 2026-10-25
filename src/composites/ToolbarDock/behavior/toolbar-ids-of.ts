/* @layer renderer-components @kind logic */
import type { ToolbarLayout, ToolbarSide } from '../ToolbarDock.type';

const toolbarIdsOf = (layout: ToolbarLayout, side: ToolbarSide): string[] =>
  layout.sides[side].flatMap((lane) => lane.map((place) => place.id));

export { toolbarIdsOf };
