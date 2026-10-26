/* @layer renderer-components @kind logic */
const classesOf = (selectable: boolean, reorderable: boolean): string =>
  ['data-table', selectable && 'data-table--selectable', reorderable && 'data-table--reorderable'].filter(Boolean).join(' ');

export { classesOf };
