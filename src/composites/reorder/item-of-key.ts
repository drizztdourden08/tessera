/* @layer renderer-components @kind util */
import { ITEM_SELECTOR } from './reorder-item.constants';

const itemOfKey = (list: HTMLElement | null, key: string): HTMLElement | undefined =>
  [...(list?.querySelectorAll<HTMLElement>(ITEM_SELECTOR) ?? [])].find((item) => item.dataset.reorderKey === key);

export { itemOfKey };
