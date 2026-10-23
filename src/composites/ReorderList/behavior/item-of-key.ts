/* @layer renderer-components @kind util */
import { ITEM_SELECTOR } from '../ReorderList.constants';

const itemOfKey = (list: HTMLElement | null, key: string): HTMLElement | undefined =>
  [...(list?.querySelectorAll<HTMLElement>(ITEM_SELECTOR) ?? [])].find((item) => item.dataset.reorderKey === key);

export { itemOfKey };
