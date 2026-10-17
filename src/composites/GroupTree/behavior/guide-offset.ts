/* @layer renderer-components @kind logic */
const guideOffset = (level: number): string =>
  `calc(var(--group-tree-pad) + var(--border-width-thin) + ${level} * var(--group-tree-indent) + var(--group-tree-twisty) / 2)`;

export { guideOffset };
