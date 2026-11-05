/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { guardCellControl } from '../../../primitives/dom/guard-cell-control';
import { placeProps } from '../behavior/place-props';
import { rowAttrs } from '../behavior/row-attrs';
import { rowCell } from '../behavior/row-cell';
import { useRowRef } from '../behavior/useRowRef';
import { DataCell } from './DataCell';
import { RowGrip } from './RowGrip';
import { SelectCell } from './SelectCell';
import type { MouseEvent } from 'react';
import './DataRow.css';
import type { DataRowProps } from './DataRow.type';

const DataRow = <T,>(props: DataRowProps<T>) => {
  const { row, context, index } = props;
  const {
    columns, draggingPath, getRowId, selectedId, onSelect, selection, onCellDragOver, onCellDrop, reorder,
    rowRef,
  } = context;
  const { table } = useTesseraStrings();
  const id = getRowId(row);
  const ref = useRowRef({ rowRef, row, id });
  const selected = selection ? selection.isSelected(id) : selectedId === id;
  const handleClick = guardCellControl(selection
    ? (event: MouseEvent<HTMLElement>) => selection.onRowClick(id, event)
    : onSelect && (() => onSelect(id)));
  const handleMouseDown = guardCellControl(selection?.onRowMouseDown);

  return (
    <Box
      {...placeProps(selected ? 'data-table__row data-table__row--selected' : 'data-table__row', index, true)}
      ref={ref}
      role="row"
      data-swap-item=""
      aria-selected={selected}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      {...rowAttrs(row, id, context)}
    >
      {reorder && <RowGrip id={id} reorder={reorder} />}
      {selection?.selectable && (
        <SelectCell
          role="gridcell"
          checked={selected}
          ariaLabel={table.selectRow}
          onToggle={(range) => selection.onCheck(id, range)}
        />
      )}
      {columns.map((column, index) => (
        <DataCell
          key={column.path}
          path={column.path}
          index={index}
          dragging={column.path === draggingPath}
          onDragOver={onCellDragOver}
          onDrop={onCellDrop}
        >
          {rowCell(row, column, context)}
        </DataCell>
      ))}
    </Box>
  );
};

export { DataRow };
