/* @layer renderer-components @kind util */
import type { KeyboardEvent, RefObject } from 'react';
import { isHTMLElement } from '../../../primitives/dom/is-html-element';
import { columnsOf } from '../../reorder/columns-of';
import { reorderStep } from '../../reorder/reorder-step';
import { SWATCH_SELECTOR } from '../SwatchGrid.constants';
import type { SwatchKeysInput } from '../SwatchGrid.type';
import { focusTarget } from './focus-target';
import { rangeAnchor } from './range-anchor';

const cellOf = (target: EventTarget): HTMLElement | null =>
  isHTMLElement(target) ? target.closest<HTMLElement>(SWATCH_SELECTOR) : null;

const tryMove = (event: KeyboardEvent<HTMLElement>, move: SwatchKeysInput['move'], at: { index: number; total: number; columns: number }): boolean => {
  const to = move ? reorderStep(event, { axis: 'grid', chord: 'alt', ...at }) : undefined;
  if (!move || to === undefined) return false;
  event.preventDefault();
  move(at.index, to);
  return true;
};

const swatchKeys = (listRef: RefObject<HTMLElement | null>, input: SwatchKeysInput) =>
  (event: KeyboardEvent<HTMLElement>): void => {
    const cell = cellOf(event.target);
    if (!cell) return;
    const index = Number(cell.dataset.swatchIndex);
    const columns = input.columns ?? columnsOf(listRef.current, SWATCH_SELECTOR);
    if (tryMove(event, input.move, { index, total: input.count, columns })) return;
    const next = focusTarget(event, index, input.count, columns);
    if (next === undefined) return;
    event.preventDefault();
    listRef.current?.querySelectorAll<HTMLElement>(SWATCH_SELECTOR)[next]?.focus();
    if (event.shiftKey) input.onRangeChange?.(rangeAnchor(input.selectedIndex, index), next);
  };

export { swatchKeys };
