/* @layer renderer-components @kind logic */
import type { ToolbarLayout, ToolbarSide } from '../ToolbarDock.type';
import { toolbarLaneSlots } from './toolbar-lane-slots';
import { toolbarLanesWithout } from './toolbar-lanes-without';
import { toolbarPlaceOf } from './toolbar-place-of';

const toolbarPickSlots = (layout: ToolbarLayout, id: string, side: ToolbarSide, lane: number | 'new'): number[] => {
  if (lane === 'new') return [0];
  const places = toolbarLanesWithout(layout, side, id)[lane] ?? [];
  const found = toolbarPlaceOf(layout, id);
  const stays = found !== null && found.side === side && found.lane === lane ? found.place.start : undefined;
  return toolbarLaneSlots(places, stays);
};

export { toolbarPickSlots };
