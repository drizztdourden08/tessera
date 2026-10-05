/* @layer renderer-components @kind hook */
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { RowShared } from '../RowGrid.type';

const useRowActions = <Row>(shared: RowShared<Row>, row: Row, index: number) => {
  const { total, rowKey, rowLabel, onRemove, onMove, rowMenu, focus } = shared;
  const { rowGrid } = useTesseraStrings();
  const key = rowKey(row);
  const name = rowLabel?.(row, index) ?? rowGrid.row(index + 1);
  const step = onMove && ((to: number): void => {
    focus.expect({ kind: 'move', key });
    focus.announce(rowGrid.moved(name, to + 1, total));
    onMove(index, to);
  });
  const remove = onRemove && ((): void => {
    focus.expect({ kind: 'remove', index });
    focus.announce(rowGrid.removed(name));
    onRemove(key);
  });
  const group = rowLabel ? rowGrid.rowNamed(index + 1, name) : name;
  return { key, name, group, step, remove, menu: rowMenu?.(row, index) ?? [] };
};

export { useRowActions };
