/* @layer renderer-components @kind logic */
import { summarizeSortGroup } from './sort-group-summary';
import type { ColumnLabels, ColumnLabelsInput } from './column-labels.type';

const columnLabelsOf = (input: ColumnLabelsInput): ColumnLabels => {
  const {
    columns, schema, sort, groupBy, draggingPath,
  } = input;

  const labelOf = (path: string): string =>
    columns.find((column) => column.path === path)?.label ?? schema.byPath(path)?.label ?? path;

  return {
    labelOf,
    summary: summarizeSortGroup({ sort, groupBy, labelOf }),
    carriedLabel: draggingPath ? labelOf(draggingPath) : '',
  };
};

export { columnLabelsOf };
