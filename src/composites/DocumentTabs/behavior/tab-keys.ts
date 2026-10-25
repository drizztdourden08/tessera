/* @layer renderer-components @kind util */
import type { KeyboardEvent, RefObject } from 'react';
import { isHTMLElement } from '../../../primitives/dom/is-html-element';
import { itemOfKey } from '../../reorder/item-of-key';
import { ITEM_SELECTOR } from '../../reorder/reorder-item.constants';
import { reorderStep } from '../../reorder/reorder-step';
import { TAB_ITEM } from '../DocumentTabs.constants';
import type { TabKeysInput } from '../DocumentTabs.type';
import { closeChord } from './close-chord';
import { focusStep } from './focus-step';
import { keyOf } from './key-of';

const tabOf = (list: HTMLElement | null, target: EventTarget): HTMLElement | null => {
  if (!isHTMLElement(target)) return null;
  const key = keyOf(target);
  return target.closest<HTMLElement>(TAB_ITEM) ?? (key === null ? null : (itemOfKey(list, key) ?? null));
};

const tabKeys = (listRef: RefObject<HTMLElement | null>, { total, move, close }: TabKeysInput) =>
  (event: KeyboardEvent<HTMLElement>): void => {
    const tab = tabOf(listRef.current, event.target);
    if (!tab) return;
    const index = Number(tab.dataset.reorderIndex);
    const to = reorderStep(event, { axis: 'horizontal', chord: 'alt', index, total });
    if (to !== undefined) {
      event.preventDefault();
      move(index, to);
      return;
    }
    if (event.target !== tab) return;
    if (closeChord(event)) {
      event.preventDefault();
      close(tab.dataset.reorderKey ?? '');
      return;
    }
    const next = focusStep(event, index, total);
    if (next === undefined) return;
    event.preventDefault();
    listRef.current?.querySelectorAll<HTMLElement>(ITEM_SELECTOR)[next]?.focus();
  };

export { tabKeys };
