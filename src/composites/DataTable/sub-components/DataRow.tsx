/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { placeProps } from '../behavior/place-props';
import { rowAttrs } from '../behavior/row-attrs';
import { rowCell } from '../behavior/row-cell';
import { DataCell } from './DataCell';
import { RowGrip } from './RowGrip';
import { SelectCell } from './SelectCell';
import type { MouseEvent } from 'react';
import type { DataRowProps } from './DataRow.type';

const DataRow = <T,>(props: DataRowProps<T>) => {
  const { row, context, index } = props;
  const {
    columns, draggingPath, getRowId, selectedId, onSelect, selection, onCellDragOver, onCellDrop, reorder,
  } = context;
  const { table } = useTesseraStrings();
  const id = getRowId(row);
  const selected = selection ? selection.isSelected(id) : selectedId === id;
  const handleClick = selection
    ? (event: MouseEvent<HTMLElement>) => selection.onRowClick(id, event)
    : onSelect && (() => onSelect(id));

  return (
    <Box
      {...placeProps(selected ? 'data-table__row data-table__row--selected' : 'data-table__row', index, true)}
      role="row"
      aria-selected={selected}
      onClick={handleClick}
      onMouseDown={selection?.onRowMouseDown}
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
