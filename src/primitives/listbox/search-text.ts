/* @layer renderer-components @kind util */
import { columnCell } from './column-cell';
import { neutralContext } from './neutral-context';
import type { ListboxSetup } from './listbox-model.type';

const searchText = <T, V>(item: T, setup: ListboxSetup<T, V>): string => {
  const context = neutralContext(item, setup.categoryOf(item), 'list');
  const cells = setup.columns
    .filter((column) => column.searchable !== false)
    .map((column) => columnCell(column, context).text);
  return [setup.labelOf(item), ...cells].join(' ');
};

export { searchText };
