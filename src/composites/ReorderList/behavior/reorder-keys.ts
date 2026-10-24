/* @layer renderer-components @kind util */
import type { KeyboardEvent, RefObject } from 'react';
import { isHTMLElement } from '../../../primitives/dom/is-html-element';
import { mainOf } from '../../reorder/main-of';
import { ITEM_SELECTOR } from '../../reorder/reorder-item.constants';
import { reorderStep } from '../../reorder/reorder-step';
import type { ReorderKeysInput } from '../ReorderList.type';
import { focusTarget } from './focus-target';
import { rowAction } from './row-action';

const isField = (target: EventTarget): boolean => isHTMLElement(target) && target.tagName === 'INPUT';

const rowOf = (target: EventTarget): HTMLElement | null =>
  isHTMLElement(target) ? target.closest<HTMLElement>('[data-reorder-index]') : null;

const reorderKeys = (listRef: RefObject<HTMLElement | null>, { items, move, rename, activate }: ReorderKeysInput) =>
  (event: KeyboardEvent<HTMLElement>): void => {
    const row = isField(event.target) ? null : rowOf(event.target);
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
    if (rowAction(event, row.dataset.reorderKey ?? '', { rename, activate })) return;
    const next = focusTarget(event, index, total);
    if (next === undefined) return;
    event.preventDefault();
    mainOf(listRef.current?.querySelectorAll<HTMLElement>(ITEM_SELECTOR)[next])?.focus();
  };

export { reorderKeys };
