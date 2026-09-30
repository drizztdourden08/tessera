/* @layer renderer-components @kind util */
import { readField } from './read-field';
import type { ItemAccessor } from './listbox.type';

const readAccessor = <T, R>(item: T, accessor: ItemAccessor<T, R>): unknown =>
  typeof accessor === 'function' ? accessor(item) : readField(item, accessor);

export { readAccessor };
