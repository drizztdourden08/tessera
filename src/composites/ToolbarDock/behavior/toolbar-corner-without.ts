/* @layer renderer-components @kind logic */
import type { ToolbarCornerClaim } from '../ToolbarDock.type';

const toolbarCornerWithout = (claims: readonly ToolbarCornerClaim[], dropH: ReadonlySet<number>, dropV: ReadonlySet<number>): ToolbarCornerClaim[] => {
  let h = 0;
  let v = 0;
  return claims.filter((claim) => {
    if (claim === 'h') {
      h += 1;
      return !dropH.has(h - 1);
    }
    v += 1;
    return !dropV.has(v - 1);
  });
};

export { toolbarCornerWithout };
