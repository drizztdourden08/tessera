/* @layer renderer-components @kind logic */
import type { ToolbarCornerClaim } from '../ToolbarDock.type';

const toolbarCornerWith = (claims: readonly ToolbarCornerClaim[], axis: ToolbarCornerClaim, lane: number): ToolbarCornerClaim[] => {
  let count = 0;
  for (const [index, claim] of claims.entries()) {
    if (claim !== axis) continue;
    if (count === lane) return [...claims.slice(0, index), axis, ...claims.slice(index)];
    count += 1;
  }
  return [...claims, axis];
};

export { toolbarCornerWith };
