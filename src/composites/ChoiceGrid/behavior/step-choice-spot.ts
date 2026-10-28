/* @layer renderer-components @kind logic */
import type { ChoiceSpot } from './choice-spot.type';
import { lastRowPosition } from './last-row-position';

const wrap = (index: number, count: number): number => ((index % count) + count) % count;

const stepChoiceSpot = (sizes: readonly number[], spot: ChoiceSpot, direction: 1 | -1, columns: number): ChoiceSpot => {
  const next = spot.position + direction * columns;
  if (next >= 0 && next < (sizes[spot.group] ?? 0)) return { group: spot.group, position: next };
  const group = wrap(spot.group + direction, sizes.length);
  const size = sizes[group] ?? 0;
  const column = spot.position % columns;
  return { group, position: direction > 0 ? Math.min(column, size - 1) : lastRowPosition(size, columns, column) };
};

export { stepChoiceSpot };
