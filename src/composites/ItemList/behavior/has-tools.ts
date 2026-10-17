/* @layer renderer-components @kind logic */
import type { ReactNode } from 'react';
import type { ItemListProps } from '../ItemList.type';

const hasTools = <T,>(list: ItemListProps<T>, actions: ReactNode): boolean =>
  (list.onRename !== undefined && !list.renameInline) || list.onDelete !== undefined || actions != null;

export { hasTools };
