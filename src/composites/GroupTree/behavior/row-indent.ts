/* @layer renderer-components @kind logic */
const rowIndent = (depth: number): string =>
  `calc(var(--group-tree-pad) + ${depth - 1} * var(--group-tree-indent))`;

export { rowIndent };
