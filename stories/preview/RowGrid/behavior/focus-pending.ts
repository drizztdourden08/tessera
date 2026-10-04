/* @layer stories @kind util */
import { TABBABLE } from '../../../../src/primitives/dom/tabbable.constants';
import type { PendingFocus } from '../RowGrid.type';

const rowsOf = (root: HTMLElement): HTMLElement[] => [...root.querySelectorAll<HTMLElement>('[data-row-index]')];

const target = (root: HTMLElement, pending: PendingFocus): HTMLElement | null => {
  const rows = rowsOf(root);
  if (pending.kind === 'add') return rows.at(-1)?.querySelector('.row-grid__cell')?.querySelector<HTMLElement>(TABBABLE) ?? null;
  if (pending.kind === 'move') return rows.find((row) => row.dataset.rowKey === pending.key)?.querySelector<HTMLElement>('.row-grid__handle') ?? null;
  const next = rows[Math.min(pending.index, rows.length - 1)];
  return next?.querySelector<HTMLElement>('.row-grid__remove') ?? root.querySelector<HTMLElement>('.row-grid__add');
};

const focusPending = (root: HTMLElement, pending: PendingFocus): void => {
  target(root, pending)?.focus();
};

export { focusPending };
