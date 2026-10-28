/* @layer renderer-components @kind logic */
import { rovingIndex } from '../../../primitives/field-control/roving-index';
import { HORIZONTAL_STEPS } from '../ChoiceGrid.constants';
import type { ChoiceGroup } from './choice-layout.type';
import { verticalChoiceIndex } from './vertical-choice-index';

const nextChoiceIndex = (key: string, current: number, groups: readonly ChoiceGroup[], columns: number | undefined): number | null => {
  const entries = groups.flatMap((group) => group.entries);
  const enabled = entries.map((entry) => entry.cell.disabled !== true);
  if (key === 'ArrowDown' || key === 'ArrowUp') {
    const direction = key === 'ArrowDown' ? 1 : -1;
    if (columns === undefined) return rovingIndex(key, current, enabled, { ArrowDown: 1, ArrowUp: -1 });
    return verticalChoiceIndex(groups, current, direction, columns);
  }
  return rovingIndex(key, current, enabled, HORIZONTAL_STEPS);
};

export { nextChoiceIndex };
