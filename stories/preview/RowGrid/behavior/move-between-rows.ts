/* @layer stories @kind util */
import type { KeyboardEvent } from 'react';
import { isHTMLElement } from '../../../../src/primitives/dom/is-html-element';
import { TABBABLE } from '../../../../src/primitives/dom/tabbable.constants';

const STEPS: Readonly<Record<string, number>> = { ArrowUp: -1, ArrowDown: 1 };

const sameCellIn = (from: HTMLElement, step: number): HTMLElement | null => {
  const cell = from.closest<HTMLElement>('[data-cell]');
  const row = from.closest<HTMLElement>('[data-row-index]');
  if (!cell || !row) return null;
  const next = row.parentElement?.children.item(Number(row.dataset.rowIndex) + step);
  return next?.querySelector(`[data-cell="${cell.dataset.cell ?? ''}"]`)?.querySelector<HTMLElement>(TABBABLE) ?? null;
};

const moveBetweenRows = (event: KeyboardEvent<HTMLElement>): void => {
  const step = STEPS[event.key];
  const from = event.target;
  if (!event.ctrlKey || step === undefined || !isHTMLElement(from)) return;
  const into = sameCellIn(from, step);
  if (!into) return;
  event.preventDefault();
  into.focus();
};

export { moveBetweenRows };
