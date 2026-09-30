/* @layer renderer-components @kind util */
import type { ListboxCategories } from '../../listbox/listbox.type';
import type { SelectGroup } from '../Select.type';

const groupCategories = (groups: readonly SelectGroup[]): ListboxCategories =>
  Object.fromEntries(groups.map((group) => [group.label, { label: group.label, icon: group.icon }]));

export { groupCategories };
