/* @layer renderer-components @kind logic */
const guideOffset = (level: number): string =>
  `calc(var(--tree-pad) + var(--border-width-thin) + ${level} * var(--tree-indent) + var(--tree-twisty) / 2)`;

export { guideOffset };
