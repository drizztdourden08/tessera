/* @layer renderer-components @kind logic */
import { clampAxis } from './clamp-axis';
import { SETTLED } from './draft-rules.constants';
import type { PositionAxis } from '../PositionInput.type';

const settleDraft = (draft: number | null, axis: PositionAxis = {}, last = 0): number | null => {
  if (draft === SETTLED || !Number.isFinite(draft)) return null;
  return clampAxis(draft, axis, last);
};

export { settleDraft };
