/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Text } from '../../primitives/Text';
import { useColumnActions } from './behavior/useColumnActions';
import { useGridStyle } from './behavior/useGridStyle';
import { useTableActions } from './behavior/useTableActions';
import { useTableModel } from './behavior/useTableModel';
import { ColumnDropTrash } from './sub-components/ColumnDropTrash';
import { HeaderRow } from './sub-components/HeaderRow';
import { RowTree } from './sub-components/RowTree';
import { SelectAllCell } from './sub-components/SelectAllCell';
import { TableFooter } from './sub-components/TableFooter';
import type { DataTableProps } from './DataTable.type';
import './DataTable.css';

const DataTable = <T,>(props: DataTableProps<T>) => {
  const { rows, countLabel, emptyMessage = 'Nothing to show.', resolveTargetFields } = props;

  const {
    table, index, selection, drag, sizing, fieldNodes, ghostRows, labels, context, checkboxes,
  } = useTableModel(props);
  const actions = useColumnActions(table, sizing.previewWidth);
  const tableActions = useTableActions(table);
  const gridStyle = useGridStyle(table.columns, sizing);

  return (
    <Box className={checkboxes ? 'data-table data-table--selectable' : 'data-table'}>
      <Box
        ref={sizing.rootRef}
        className="data-table__scroll"
        role="grid"
        aria-multiselectable={selection ? true : undefined}
        tabIndex={selection ? -1 : undefined}
        style={gridStyle}
        onKeyDown={selection?.onKeyDown}
        onDragEnter={drag.onSurfaceHover}
        onDragOver={drag.onSurfaceHover}
        onDrop={drag.onSurfaceDrop}
      >
        <HeaderRow
          columns={table.columns}
          schema={index}
          fieldNodes={fieldNodes}
          sort={table.sort}
          groupBy={table.groupBy}
          resolveTargetFields={resolveTargetFields}
          actions={actions}
          drag={drag}
          ghostRows={ghostRows}
          rowTotal={table.sortedRows.length}
          lead={selection && checkboxes ? <SelectAllCell selection={selection} /> : undefined}
        />
        <RowTree nodes={table.groupedRows} parentUid="" context={context} />
        {rows.length === 0 && <Text className="data-table__empty">{emptyMessage}</Text>}
      </Box>
      <ColumnDropTrash
        draggingPath={drag.draggingPath}
        label={labels.carriedLabel}
        onRemove={actions.onRemove}
        onDragEnd={drag.onDragEnd}
      />
      <TableFooter
        count={rows.length}
        countLabel={countLabel}
        sortActive={table.sort.length > 0}
        groupActive={table.groupBy.length > 0}
        fieldNodes={fieldNodes}
        actions={tableActions}
        summary={labels.summary}
      />
    </Box>
  );
};

export { DataTable };
