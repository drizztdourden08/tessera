/* @layer renderer-components @kind util */
import type { SelectOption } from '../Select.type';

const filterOptions = (allOptions: SelectOption[], search: string): SelectOption[] => {
  if (!search) return allOptions;
  const needle = search.toLowerCase();
  return allOptions.filter(
    (o) =>
      o.label.toLowerCase().includes(needle) ||
      (o.description ?? '').toLowerCase().includes(needle),
  );
};

export { filterOptions };
