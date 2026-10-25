/* @layer renderer-components @kind logic */
import type { ToolbarSpot } from '../ToolbarDock.type';
import { isRecord } from './is-record';
import { isToolbarSide } from './is-toolbar-side';

const isNumber = (raw: unknown): raw is number => typeof raw === 'number' && Number.isFinite(raw);

const isIndex = (raw: unknown): raw is number => typeof raw === 'number' && Number.isInteger(raw) && raw >= 0;

const readSpot = (spot: Record<string, unknown>): ToolbarSpot | null => {
  const { side, start, size } = spot;
  if (!isToolbarSide(side)) return null;
  if (!('lane' in spot)) return isIndex(spot.index) ? { side, lane: spot.index, start: 0, size: 1 } : null;
  if (!isIndex(spot.lane) || !isNumber(start) || !isNumber(size) || size <= 0) return null;
  const fitted = Math.min(size, 1);
  return { side, lane: spot.lane, start: Math.min(Math.max(start, 0), 1 - fitted), size: fitted };
};

const cleanToolbarLast = (raw: unknown, known: ReadonlySet<string>): Record<string, ToolbarSpot> => {
  const last: Record<string, ToolbarSpot> = {};
  if (!isRecord(raw)) return last;
  for (const [id, spot] of Object.entries(raw)) {
    const read = known.has(id) && isRecord(spot) ? readSpot(spot) : null;
    if (read) last[id] = read;
  }
  return last;
};

export { cleanToolbarLast };
