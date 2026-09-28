/* @layer stories @kind component */
import { Fragment } from 'react';
import type { ReactNode } from 'react';
import { buildSchema, getPath, useDataTable } from '../../../src/data';
import type { GroupedRow, TableColumn } from '../../../src/data';
import { CodeBlock } from '../../../src/composites';
import { Box, Button, Pressable, Text } from '../../../src/primitives';
import { LOCATIONS, LOCATION_CONFIG } from './data-locations';
import type { LocationRow } from './data-locations';

const SCHEMA = buildSchema(LOCATIONS, LOCATION_CONFIG);
const COLUMNS: readonly TableColumn[] = [
  { path: 'name' }, { path: 'game' }, { path: 'item' }, { path: 'checkedBy' }, { path: 'sphere' },
];
const GROUPABLE = ['game', 'progression', 'sphere'];

const renderNodes = (nodes: readonly GroupedRow<LocationRow>[]): ReactNode[] =>
  nodes.map((node) => (node.kind === 'row' ? (
    <Fragment key={node.row.id}>
      {COLUMNS.map((column) => <Text key={column.path}>{String(getPath(node.row, column.path) ?? '')}</Text>)}
    </Fragment>
  ) : (
    <Fragment key={`${node.path}:${node.key}:${node.level}`}>
      <Text className="engine-grid__group" style={{ paddingLeft: `calc(${node.level} * var(--space-lg))` }}>
        {`${node.path}: ${node.key} (${node.count})`}
      </Text>
      {renderNodes(node.children)}
    </Fragment>
  )));

const arrow = (dir: 'asc' | 'desc' | undefined): string => {
  if (dir === 'asc') return ' ↑';
  if (dir === 'desc') return ' ↓';
  return '';
};

const TableDemo = () => {
  const table = useDataTable({ rows: LOCATIONS, schema: SCHEMA, initial: COLUMNS });
  const state = { columns: table.columns.map((c) => c.path), sort: table.sort, groupBy: table.groupBy };
  return (
    <Box className="story-column">
      <Box className="story-row">
        <Text className="story-label">Group by</Text>
        {GROUPABLE.map((path) => (
          <Button key={path} size="sm" variant="tertiary" active={table.groupBy.includes(path)} onClick={() => table.addGroupBy(path)}>
            {path}
          </Button>
        ))}
        <Button size="sm" variant="ghost" onClick={table.clearGroupBy}>Clear grouping</Button>
        <Button size="sm" variant="ghost" onClick={table.clearSort}>Clear sort</Button>
      </Box>
      <Box className="engine-grid engine-grid--rows">
        {COLUMNS.map((column) => (
          <Pressable key={column.path} className="engine-grid__head" onClick={() => table.setSingleSort(column.path)}>
            {`${column.path}${arrow(table.sort.find((s) => s.path === column.path)?.dir)}`}
          </Pressable>
        ))}
        {renderNodes(table.groupedRows)}
      </Box>
      <Text className="story-label">Table state, plain data</Text>
      <CodeBlock language="json" code={JSON.stringify(state, null, 2)} />
    </Box>
  );
};

export { TableDemo };
