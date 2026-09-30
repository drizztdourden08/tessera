/* @layer renderer-components @kind util */
import { itemCategory } from './item-category';
import { itemDisabled } from './item-disabled';
import { itemText } from './item-text';
import { KEY_FIELDS, LABEL_FIELDS } from './listbox.constants';
import type { ItemReaders } from './item-readers.type';
import type { ListboxLook } from './listbox.type';

const itemReaders = <T>(look: ListboxLook<T>): ItemReaders => ({
  keyOf: (item) => itemText(item as T, look.getKey, KEY_FIELDS, LABEL_FIELDS),
  labelOf: (item) => itemText(item as T, look.getLabel, LABEL_FIELDS, KEY_FIELDS),
  disabledOf: (item) => itemDisabled(item as T, look.isItemDisabled),
  categoryOf: (item) => itemCategory(item as T, look.groupBy),
});

export { itemReaders };
