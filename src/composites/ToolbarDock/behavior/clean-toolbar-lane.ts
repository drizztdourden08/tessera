/* @layer renderer-components @kind logic */
import type { ToolbarPlace } from '../ToolbarDock.type';
import { fitToolbarLane } from './fit-toolbar-lane';
import { isRecord } from './is-record';

const isNumber = (raw: unknown): raw is number => typeof raw === 'number' && Number.isFinite(raw);

const readPlace = (item: unknown, known: ReadonlySet<string>, skip: ReadonlySet<string>): ToolbarPlace | null => {
  if (!isRecord(item)) return null;
  const { id, start, size } = item;
  if (typeof id !== 'string' || !known.has(id) || skip.has(id)) return null;
  if (!isNumber(start) || !isNumber(size) || size <= 0) return null;
  return { id, start, size };
};

const cleanToolbarLane = (raw: unknown, known: ReadonlySet<string>, seen: ReadonlySet<string>): ToolbarPlace[] => {
  if (!Array.isArray(raw)) return [];
  const taken = new Set(seen);
  const places: ToolbarPlace[] = [];
  for (const item of raw) {
    const place = readPlace(item, known, taken);
    if (!place) continue;
    taken.add(place.id);
    places.push(place);
  }
  return fitToolbarLane(places);
};

export { cleanToolbarLane };
