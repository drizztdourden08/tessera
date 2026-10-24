/* @layer renderer-components @kind logic */
import type { ToolbarSpot } from '../ToolbarDock.type';
import { isRecord } from './is-record';
import { isToolbarSide } from './is-toolbar-side';

const cleanToolbarLast = (raw: unknown, known: ReadonlySet<string>): Record<string, ToolbarSpot> => {
  const last: Record<string, ToolbarSpot> = {};
  if (!isRecord(raw)) return last;
  for (const [id, spot] of Object.entries(raw)) {
    if (!known.has(id) || !isRecord(spot) || !isToolbarSide(spot.side)) continue;
    if (typeof spot.index !== 'number' || !Number.isInteger(spot.index) || spot.index < 0) continue;
    last[id] = { side: spot.side, index: spot.index };
  }
  return last;
};

export { cleanToolbarLast };
