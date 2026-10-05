/* @layer stories @kind component */
import type { CSSProperties, ReactNode } from 'react';
import { getPath } from '../../../src/data';
import type { DataTableState, GroupedRow } from '../../../src/data';
import { Badge, Box, Icon, Pressable, Span } from '../../../src/primitives';
import type { LocationRow } from './data-locations';
import type { EngineColumn } from './engine-grid.type';

type EngineGridProps = {
  table: DataTableState<LocationRow>;
  columns: readonly EngineColumn[];
};

const indent = (depth: number): CSSProperties => ({ paddingInlineStart: `calc(var(--engine-pad) + ${depth} * var(--engine-indent))` });

const cellText = (row: LocationRow, column: EngineColumn): ReactNode =>
  column.render ? column.render(row) : String(getPath(row, column.path) ?? '');

const renderNodes = (nodes: readonly GroupedRow<LocationRow>[], columns: readonly EngineColumn[], depth: number): ReactNode[] =>
  nodes.map((node) => {
    if (node.kind === 'row') {
      return (
        <Box key={node.row.id} className="engine-grid__row" role="row">
          {columns.map((column, index) => (
            <Span key={column.path} role="cell" className={`engine-grid__cell engine-grid__cell--${column.align ?? 'start'}`} style={index === 0 ? indent(depth) : undefined}>
              {cellText(node.row, column)}
            </Span>
          ))}
        </Box>
      );
    }
    return (
      <Box key={`${node.path}:${node.key}:${node.level}`} role="rowgroup" className="engine-grid__group-block">
        <Box className="engine-grid__group" role="row" style={indent(depth)}>
          <Span tone="muted" className="engine-grid__group-field">{node.path}</Span>
          <Span className="engine-grid__group-key">{node.key}</Span>
          <Badge variant="inline" color="tame" value={node.count} />
        </Box>
        {renderNodes(node.children, columns, depth + 1)}
      </Box>
    );
  });

const sortGlyph = (table: EngineGridProps['table'], path: string): ReactNode => {
  const dir = table.sort.find((entry) => entry.path === path)?.dir;
  if (dir === undefined) return null;
  return <Icon name={dir === 'asc' ? 'arrow-up' : 'arrow-down'} size={10} />;
};

const EngineGrid = ({ table, columns }: EngineGridProps) => (
  <Box className="engine-grid" role="table" style={{ gridTemplateColumns: columns.map((column) => column.track ?? 'auto').join(' ') }}>
    <Box className="engine-grid__row engine-grid__row--head" role="row">
      {columns.map((column, index) => (
        <Pressable
          key={column.path}
          role="columnheader"
          className={`engine-grid__head engine-grid__cell--${column.align ?? 'start'}`}
          style={index === 0 ? indent(0) : undefined}
          onClick={() => table.setSingleSort(column.path)}
        >
          {column.label} {sortGlyph(table, column.path)}
        </Pressable>
      ))}
    </Box>
    {renderNodes(table.groupedRows, columns, 0)}
  </Box>
);

export { EngineGrid };
