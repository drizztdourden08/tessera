/* @layer renderer-components @kind util */
import { columnCell } from './column-cell';
import { neutralContext } from './neutral-context';
import type { ValueFormats } from './format-value.type';
import type { ListboxSetup } from './listbox-model.type';

const searchText = <T, V>(item: T, setup: ListboxSetup<T, V>, formats: ValueFormats): string => {
  const context = neutralContext(item, setup.categoryOf(item), 'list');
  const cells = setup.columns
    .filter((column) => column.searchable !== false)
    .map((column) => columnCell(column, context, formats).text);
  return [setup.labelOf(item), ...cells].join(' ');
};

export { searchText };
