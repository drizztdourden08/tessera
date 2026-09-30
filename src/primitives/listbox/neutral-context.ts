/* @layer renderer-components @kind util */
import type { ItemContext, ItemPlace } from './listbox.type';

const neutralContext = <T>(item: T, category: string | undefined, place: ItemPlace): ItemContext<T> => ({
  item,
  index: -1,
  selected: false,
  active: false,
  disabled: false,
  category,
  query: '',
  place,
});

export { neutralContext };
