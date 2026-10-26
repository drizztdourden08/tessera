/* @layer renderer-components @kind util */
import { isHTMLElement } from '../../../primitives/dom/is-html-element';
import { itemOfKey } from '../../reorder/item-of-key';
import { TAB_ITEM } from '../DocumentTabs.constants';
import { keyOf } from './key-of';

const tabOf = (list: HTMLElement | null, target: EventTarget): HTMLElement | null => {
  if (!isHTMLElement(target)) return null;
  const key = keyOf(target);
  return target.closest<HTMLElement>(TAB_ITEM) ?? (key === null ? null : (itemOfKey(list, key) ?? null));
};

export { tabOf };
