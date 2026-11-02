/* @layer renderer-components @kind logic */
import type { HeaderCase } from '../DataTable.type';

const classesOf = (selectable: boolean, reorderable: boolean, headerCase: HeaderCase = 'normal', headerRules = true): string =>
  [
    'data-table', selectable && 'data-table--selectable', reorderable && 'data-table--reorderable',
    headerCase === 'upper' && 'data-table--upper-headers', !headerRules && 'data-table--plain-headers',
  ].filter(Boolean).join(' ');

export { classesOf };
