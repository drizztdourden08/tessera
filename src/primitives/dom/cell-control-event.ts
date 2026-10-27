/* @layer renderer-components @kind logic */
import { CELL_CONTROL_SELECTOR } from './cell-control-event.constants';
import type { CellControlEvent } from './cell-control-event.type';

const cellControlEvent = (event: CellControlEvent): boolean => {
  const target = event.target as Partial<Element> | null;
  const row = event.currentTarget as Element | null;
  if (!target?.closest || !row) return false;
  if (!row.contains(target as Element)) return true;
  const control = target.closest(CELL_CONTROL_SELECTOR);
  return control !== null && control !== row && row.contains(control);
};

export { cellControlEvent };
