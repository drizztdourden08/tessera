/* @layer renderer-components @kind util */
import type { KeyboardEvent, RefObject } from 'react';
import { isHTMLElement } from '../../../primitives/dom/is-html-element';
import { reorderStep } from '../../reorder/reorder-step';
import { ITEM_SELECTOR } from '../ReorderList.constants';
import type { ReorderKeysInput } from '../ReorderList.type';
import { focusTarget } from './focus-target';
import { mainOf } from './main-of';

const rowOf = (target: EventTarget): HTMLElement | null =>
  isHTMLElement(target) ? target.closest<HTMLElement>('[data-reorder-index]') : null;

const reorderKeys = (listRef: RefObject<HTMLElement | null>, { items, move }: ReorderKeysInput) =>
  (event: KeyboardEvent<HTMLElement>): void => {
    const row = rowOf(event.target);
    if (!row) return;
    const index = Number(row.dataset.reorderIndex);
    const total = items.length;
    const to = reorderStep(event, { axis: 'vertical', chord: 'alt', index, total });
    if (to !== undefined) {
      event.preventDefault();
      move(index, to);
      return;
    }
    if (event.target !== mainOf(row)) return;
    const next = focusTarget(event, index, total);
    if (next === undefined) return;
    event.preventDefault();
    mainOf(listRef.current?.querySelectorAll<HTMLElement>(ITEM_SELECTOR)[next])?.focus();
  };

export { reorderKeys };
