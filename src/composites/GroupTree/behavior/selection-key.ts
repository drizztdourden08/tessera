/* @layer renderer-components @kind logic */
import type { GroupEntry } from '../GroupTree.type';

const selectionKey = <T,>(entry: GroupEntry<T>): string => (entry.kind === 'item' ? entry.itemKey : entry.key);

export { selectionKey };
