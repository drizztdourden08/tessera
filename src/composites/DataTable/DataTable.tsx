/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { classesOf } from './behavior/classes-of';
import { useColumnActions } from './behavior/useColumnActions';
import { useGridStyle } from './behavior/useGridStyle';
import { useTableActions } from './behavior/useTableActions';
import { useTableModel } from './behavior/useTableModel';
import { ColumnDropTrash } from './sub-components/ColumnDropTrash';
import { HeaderLead } from './sub-components/HeaderLead';
import { HeaderRow } from './sub-components/HeaderRow';
import { TableEmpty } from './sub-components/TableEmpty';
import { TableFooter } from './sub-components/TableFooter';
import { TableRows } from './sub-components/TableRows';
import type { DataTableProps } from './DataTable.type';
import '../../theme/visually-hidden.css';
import './DataTable.css';

const DataTable = <T,>(props: DataTableProps<T>) => {
  const { rows, countLabel, emptyMessage, resolveTargetFields, bind, overlay } = props;
  const {
    table, index, selection, drag, sizing, fieldNodes, ghostRows, labels, context, virtual, checkboxes, rootRef, reorder,
  } = useTableModel(props);
  const actions = useColumnActions(table, sizing.previewWidth);
  const tableActions = useTableActions(table);
  const gridStyle = useGridStyle(table.columns, sizing);

  return (
    <Box className={classesOf(checkboxes, reorder !== null)}>
      <Box
        ref={rootRef}
        className="data-table__scroll"
        role="grid"
        aria-multiselectable={selection ? true : undefined}
        tabIndex={selection ? -1 : undefined}
        style={gridStyle}
        onKeyDown={selection?.onKeyDown}
        onScroll={virtual?.onScroll}
        onDragEnter={drag.onSurfaceHover}
        onDragOver={drag.onSurfaceHover}
        onDrop={drag.onSurfaceDrop}
        {...bind}
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
          lead={<HeaderLead reorderable={reorder !== null} selection={selection} />}
        />
        <TableRows virtual={virtual} nodes={table.groupedRows} context={context} />
        <TableEmpty empty={rows.length === 0} message={emptyMessage} />
        {overlay}
      </Box>
      {reorder && <Box className="visually-hidden" aria-live="polite">{reorder.message}</Box>}
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
