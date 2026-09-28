/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { HeaderCell } from './HeaderCell';
import type { HeaderRowProps } from './HeaderRow.type';

const HeaderRow = (props: HeaderRowProps) => {
  const {
    columns, schema, fieldNodes, sort, groupBy, resolveTargetFields,
    actions, drag, ghostRows, rowTotal, lead,
  } = props;

  return (
    <Box className="data-table__header" role="row">
      {lead}
      {columns.map((column, index) => (
        <HeaderCell
          key={column.path}
          column={column}
          field={schema.byPath(column.path)}
          index={index}
          columnCount={columns.length}
          sortDir={sort.find((entry) => entry.path === column.path)?.dir}
          grouped={groupBy.includes(column.path)}
          fieldNodes={fieldNodes}
          resolveTargetFields={resolveTargetFields}
          actions={actions}
          drag={drag}
          ghostRows={ghostRows}
          rowTotal={rowTotal}
        />
      ))}
      <Box className="data-table__header-cell data-table__header-cell--trailing" role="columnheader" />
    </Box>
  );
};

export { HeaderRow };
