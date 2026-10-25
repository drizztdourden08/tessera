/* @layer renderer-components @kind logic */
import type { ToolbarCornerClaim } from '../ToolbarDock.type';

const toolbarCornerOrder = (claims: readonly ToolbarCornerClaim[], axis: ToolbarCornerClaim, nth: number, victim: number): ToolbarCornerClaim[] => {
  const moved: ToolbarCornerClaim[] = [];
  const rest: ToolbarCornerClaim[] = [];
  let own = 0;
  let across = 0;
  for (const claim of claims) {
    if (claim === axis) {
      (own <= nth && across > victim ? moved : rest).push(claim);
      own += 1;
    } else {
      rest.push(claim);
      across += 1;
    }
  }
  let seen = 0;
  const at = rest.findIndex((claim) => {
    if (claim === axis) return false;
    seen += 1;
    return seen > victim;
  });
  return [...rest.slice(0, at), ...moved, ...rest.slice(at)];
};

export { toolbarCornerOrder };
