/* @layer renderer-components @kind logic */
import { rowFits } from './row-fits';
import type { RowSpace } from './row-fits.type';
import type { HeaderStack } from './stack-of.type';

const stackOf = (space: RowSpace): HeaderStack => {
  if (rowFits(space, true)) return 'row';
  return rowFits(space, false) ? 'strip' : 'all';
};

export { stackOf };
