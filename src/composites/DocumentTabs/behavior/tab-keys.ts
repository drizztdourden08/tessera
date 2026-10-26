/* @layer renderer-components @kind util */
import type { KeyboardEvent, RefObject } from 'react';
import { ITEM_SELECTOR } from '../../reorder/reorder-item.constants';
import { reorderStep } from '../../reorder/reorder-step';
import type { TabKeysInput } from '../DocumentTabs.type';
import { focusStep } from './focus-step';
import { tabCommand } from './tab-command';
import { tabOf } from './tab-of';

const tabKeys = (listRef: RefObject<HTMLElement | null>, { total, move, close, menu }: TabKeysInput) =>
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
    if (event.target !== tab || tabCommand(event, tab.dataset.reorderKey ?? '', { close, menu })) return;
    const next = focusStep(event, index, total);
    if (next === undefined) return;
    event.preventDefault();
    listRef.current?.querySelectorAll<HTMLElement>(ITEM_SELECTOR)[next]?.focus();
  };

export { tabKeys };
