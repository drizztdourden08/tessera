/* @layer renderer-components @kind logic */
import type { ToolbarLayout, ToolbarPlace, ToolbarSide } from '../ToolbarDock.type';

const toolbarLanesWithout = (layout: ToolbarLayout, side: ToolbarSide, id: string): ToolbarPlace[][] =>
  layout.sides[side].map((lane) => lane.filter((place) => place.id !== id)).filter((lane) => lane.length > 0);

export { toolbarLanesWithout };
