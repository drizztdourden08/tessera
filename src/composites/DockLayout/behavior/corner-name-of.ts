/* @layer renderer-components @kind logic */
import type { SplitAxis } from '../DockLayout.type';
import type { CornerEnd, CornerName } from './corner.type';

const cornerNameOf = (along: SplitAxis, end: CornerEnd, first: boolean): CornerName => {
  const row = along === 'row';
  const side = (row ? end === 'start' : first) ? 'left' : 'right';
  const edge = (row ? first : end === 'start') ? 'top' : 'bottom';
  return `${edge}-${side}`;
};

export { cornerNameOf };
