/* @layer stories @kind hook */
import { ROW_GRID_STRINGS } from '../row-grid-strings.constants';
import type { RowShared } from '../RowGrid.type';

const useRowActions = <Row>(shared: RowShared<Row>, row: Row, index: number) => {
  const { total, rowKey, rowLabel, onRemove, onMove, rowMenu, focus } = shared;
  const key = rowKey(row);
  const name = rowLabel?.(row, index) ?? ROW_GRID_STRINGS.row(index + 1);
  const step = onMove && ((to: number): void => {
    focus.expect({ kind: 'move', key });
    focus.announce(ROW_GRID_STRINGS.moved(name, to + 1, total));
    onMove(index, to);
  });
  const remove = onRemove && ((): void => {
    focus.expect({ kind: 'remove', index });
    focus.announce(ROW_GRID_STRINGS.removed(name));
    onRemove(key);
  });
  const group = rowLabel ? ROW_GRID_STRINGS.rowNamed(index + 1, name) : name;
  return { key, name, group, step, remove, menu: rowMenu?.(row, index) ?? [] };
};

export { useRowActions };
