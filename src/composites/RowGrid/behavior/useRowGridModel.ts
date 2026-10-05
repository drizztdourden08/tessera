/* @layer renderer-components @kind hook */
import { useMemo, useRef } from 'react';
import { NO_CONTROL } from '../../../primitives/field-control/field-control.constants';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { CONTROL_SIZE } from '../RowGrid.constants';
import type { RowGridProps, RowShared } from '../RowGrid.type';
import { useGridLayout } from './useGridLayout';
import { useGridShape } from './useGridShape';
import { useRowDrag } from './useRowDrag';
import { useRowFocus } from './useRowFocus';

const useRowGridModel = <Row>(props: RowGridProps<Row>) => {
  const { rows, columns, numbered = false, density = 'comfortable', onAdd, onRemove, onMove, rowMenu } = props;
  const { rowGrid } = useTesseraStrings();
  const rootRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLElement>(null);
  const endButtons = (onMove === undefined && rowMenu === undefined ? 0 : 1) + (onRemove ? 1 : 0);
  const parts = { handle: onMove !== undefined, numbered, endButtons, density };
  const layout = useGridLayout(rootRef, useGridShape(columns, parts));
  const focus = useRowFocus(rootRef);
  const drag = useRowDrag(listRef, (from, to) => {
    const row = rows[from];
    if (!onMove || row === undefined) return;
    focus.announce(rowGrid.moved(props.rowLabel?.(row, from) ?? rowGrid.row(from + 1), to + 1, rows.length));
    onMove(from, to);
  });
  const control = useMemo(() => ({ ...NO_CONTROL, size: CONTROL_SIZE[density] }), [density]);
  const shared: RowShared<Row> = { ...props, numbered, layout, total: rows.length, drag, focus };
  const add = onAdd && ((): void => {
    focus.expect({ kind: 'add' });
    focus.announce(rowGrid.added(rows.length + 1));
    onAdd();
  });
  return { rootRef, listRef, parts, layout, focus, control, shared, add };
};

export { useRowGridModel };
