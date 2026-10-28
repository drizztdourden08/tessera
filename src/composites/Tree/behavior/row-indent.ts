/* @layer renderer-components @kind logic */
const rowIndent = (depth: number): string =>
  `calc(var(--tree-pad) + var(--border-width-thin) + ${depth - 1} * var(--tree-indent))`;

export { rowIndent };
