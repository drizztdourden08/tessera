/* @layer renderer-components @kind logic */
import type { TreeRow } from '../GroupTree.type';

const selectionKey = <T,>(row: TreeRow<T>): string => (row.kind === 'item' ? row.itemKey : row.key);

export { selectionKey };
