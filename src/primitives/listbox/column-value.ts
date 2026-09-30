/* @layer renderer-components @kind util */
import { readAccessor } from './read-accessor';
import type { ListboxColumn } from './listbox.type';

const columnValue = <T>(column: ListboxColumn<T>, item: T): unknown =>
  column.field === undefined ? item : readAccessor(item, column.field);

export { columnValue };
