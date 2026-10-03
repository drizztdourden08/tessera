/* @layer renderer-components @kind logic */
import type { ListItemShape } from '../ListItemRow.type';

const listItemTracks = (shape: ListItemShape): string => [
  shape.icon ? '[icon] auto' : '',
  '[main] minmax(0, 1fr)',
  ...Array.from({ length: shape.columns }, () => 'auto'),
  shape.action ? '[action] auto [end]' : '[action end]',
].filter(Boolean).join(' ');

export { listItemTracks };
