/* @layer renderer-components @kind logic */
const rowIndent = (depth: number): string =>
  `calc(var(--group-tree-pad) + var(--border-width-thin) + ${depth - 1} * var(--group-tree-indent))`;

export { rowIndent };
