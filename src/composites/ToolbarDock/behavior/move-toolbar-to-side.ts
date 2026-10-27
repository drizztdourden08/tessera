/* @layer renderer-components @kind logic */
import type { ToolbarLayout, ToolbarSide } from '../ToolbarDock.type';
import { placeToolbar } from './place-toolbar';
import { toolbarPlaceOf } from './toolbar-place-of';
import { toolbarWithout } from './toolbar-without';

const moveToolbarToSide = (layout: ToolbarLayout, id: string, side: ToolbarSide): ToolbarLayout => {
  const found = toolbarPlaceOf(layout, id);
  if (!found || found.side === side) return layout;
  const { [id]: spot, ...others } = layout.last;
  const kept = spot?.side === side ? { ...others, [id]: spot } : others;
  const placed = placeToolbar({ ...toolbarWithout(layout, id), last: kept }, id, { id, label: id, defaultSide: side });
  return placed && toolbarPlaceOf(placed, id)?.side === side ? { ...placed, last: layout.last } : layout;
};

export { moveToolbarToSide };
