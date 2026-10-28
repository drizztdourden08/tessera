/* @layer renderer-components @kind logic */
import type { ChoiceGroup } from './choice-layout.type';
import type { ChoiceSpot } from './choice-spot.type';
import { stepChoiceSpot } from './step-choice-spot';

const locate = (groups: readonly ChoiceGroup[], current: number): ChoiceSpot | null => {
  const group = groups.findIndex((candidate) => candidate.entries.some((entry) => entry.index === current));
  const position = groups[group]?.entries.findIndex((entry) => entry.index === current);
  return group < 0 || position === undefined ? null : { group, position };
};

const verticalChoiceIndex = (groups: readonly ChoiceGroup[], current: number, direction: 1 | -1, columns: number): number | null => {
  const filled = groups.filter((group) => group.entries.length > 0);
  const sizes = filled.map((group) => group.entries.length);
  let spot = locate(filled, current);
  for (let hop = 0; spot !== null && hop < sizes.reduce((sum, size) => sum + size, 0); hop += 1) {
    spot = stepChoiceSpot(sizes, spot, direction, columns);
    const entry = filled[spot.group]?.entries[spot.position];
    if (entry && entry.cell.disabled !== true) return entry.index;
  }
  return null;
};

export { verticalChoiceIndex };
