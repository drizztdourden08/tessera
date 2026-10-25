/* @layer renderer-components @kind logic */
import type { ToolbarCornerClaim } from '../ToolbarDock.type';

const toolbarCornerBefore = (claims: readonly ToolbarCornerClaim[], axis: ToolbarCornerClaim, nth: number, thickness: readonly number[]): number => {
  let seen = 0;
  let other = 0;
  let sum = 0;
  for (const claim of claims) {
    if (claim === axis) {
      if (seen === nth) return sum;
      seen += 1;
    } else {
      sum += thickness[other] ?? 0;
      other += 1;
    }
  }
  return sum;
};

export { toolbarCornerBefore };
