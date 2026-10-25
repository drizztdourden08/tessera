/* @layer renderer-components @kind logic */
import type { ToolbarLayout } from '../ToolbarDock.type';
import type { ToolbarDropSpot } from './toolbar-drop.type';
import { toolbarLanesWithout } from './toolbar-lanes-without';
import { toolbarPlaceOf } from './toolbar-place-of';

const toolbarDropLaneValue = (layout: ToolbarLayout, id: string, spot: ToolbarDropSpot, raw: readonly number[]): number | undefined => {
  const { side, lane, index } = spot;
  const found = toolbarPlaceOf(layout, id);
  const own = found !== null && found.side === side ? found.lane : null;
  const alone = own !== null && layout.sides[side][own]?.length === 1;
  const values = alone ? raw.filter((_, at) => at !== own) : [...raw];
  if (typeof lane === 'number') return values[lane];
  if (own !== null && raw[own] !== undefined) return raw[own];
  const count = toolbarLanesWithout(layout, side, id).length;
  return values[count > 0 ? Math.min(index, count - 1) : 0];
};

export { toolbarDropLaneValue };
