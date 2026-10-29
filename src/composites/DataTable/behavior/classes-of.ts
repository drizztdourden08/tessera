/* @layer renderer-components @kind logic */
import type { HeaderCase } from '../DataTable.type';

const classesOf = (selectable: boolean, reorderable: boolean, headerCase: HeaderCase = 'normal'): string =>
  [
    'data-table', selectable && 'data-table--selectable', reorderable && 'data-table--reorderable',
    headerCase === 'upper' && 'data-table--upper-headers',
  ].filter(Boolean).join(' ');

export { classesOf };
