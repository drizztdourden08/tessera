/* @layer stories @kind component */
import type { ReactNode } from 'react';
import { Box, Text } from '../../../src/primitives';

type RowGridColumn = { id: string; label: string; align?: 'start' | 'end' };
type RowGridProps<T> = {
  columns: readonly RowGridColumn[];
  rows: readonly T[];
  getId: (row: T) => string;
  renderCell: (row: T, columnId: string) => ReactNode;
  rowLabel: (row: T) => string;
  selectedId?: string;
};

const RowGrid = <T,>({ columns, rows, getId, renderCell, rowLabel, selectedId }: RowGridProps<T>) => (
  <Box className="spike-rowgrid">
    <Box className="spike-rowgrid__table" role="table">
      <Box className="spike-rowgrid__row spike-rowgrid__head" role="row">
        {columns.map((c) => <Text key={c.id} variant="label" role="columnheader" data-align={c.align}>{c.label}</Text>)}
      </Box>
      {rows.map((row) => (
        <Box key={getId(row)} className="spike-rowgrid__row" role="row" aria-label={rowLabel(row)} data-selected={getId(row) === selectedId ? '' : undefined}>
          {columns.map((c) => (
            <Box key={c.id} className="spike-rowgrid__cell" role="cell" data-align={c.align}>
              <Text variant="label" className="spike-rowgrid__cell-label">{c.label}</Text>
              {renderCell(row, c.id)}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  </Box>
);

export { RowGrid };
export type { RowGridColumn, RowGridProps };
