/* @layer renderer-components @kind hook */
import { useEffect } from 'react';
import { CELL_ATTR, HEAD_ATTR } from './measure-column.constants';
import { renderedHeaderWidth } from './rendered-header-width';
import { ROOT_SELECTOR } from './useColumnShift.constants';
import type { UseColumnShiftInput } from './useColumnShift.type';

const columnCells = (root: ParentNode, path: string): HTMLElement[] =>
  [...root.querySelectorAll(`[${HEAD_ATTR}="${path}"], [${CELL_ATTR}="${path}"]`)]
    .filter((node): node is HTMLElement => node instanceof HTMLElement);

const holeWidth = (root: HTMLElement, carriedPath: string): number => {
  const width = renderedHeaderWidth(root, carriedPath);
  if (width === 0) return 0;
  const row = root.querySelector(`[${HEAD_ATTR}="${carriedPath}"]`)?.parentElement;
  const gap = row ? Number.parseFloat(getComputedStyle(row).columnGap) : Number.NaN;
  return width + (Number.isNaN(gap) ? 0 : gap);
};

const useColumnShift = (input: UseColumnShiftInput): void => {
  const { cellRef, path, shift, carriedPath } = input;

  useEffect(() => {
    const root = cellRef.current?.closest(ROOT_SELECTOR);
    if (!(root instanceof HTMLElement) || shift === 'none' || carriedPath === null) return undefined;
    const distance = holeWidth(root, carriedPath);
    if (distance === 0) return undefined;

    const offset = shift === 'left' ? -distance : distance;
    const cells = columnCells(root, path);
    cells.forEach((cell) => { cell.style.transform = `translateX(${offset}px)`; });
    return () => cells.forEach((cell) => { cell.style.transform = ''; });
  }, [cellRef, path, shift, carriedPath]);
};

export { useColumnShift };
