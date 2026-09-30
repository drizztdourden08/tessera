/* @layer renderer-components @kind util */
import type { ListboxColumn } from './listbox.type';

const columnId = <T>(column: ListboxColumn<T>, index: number): string =>
  column.id ?? (typeof column.field === 'string' ? column.field : `column-${index}`);

export { columnId };
