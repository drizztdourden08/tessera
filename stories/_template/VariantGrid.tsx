/* @layer stories @kind component */
import type { ReactNode } from 'react';
import { Box, Text } from '../../src/primitives';

interface GridAxis<K extends string> {
  key: K;
  label: string;
}

interface VariantGridProps<R extends string, C extends string> {
  rows: readonly GridAxis<R>[];
  columns: readonly GridAxis<C>[];
  cell: (row: R, column: C) => ReactNode;
}

const VariantGrid = <R extends string, C extends string>(props: VariantGridProps<R, C>) => {
  const { rows, columns, cell } = props;
  return (
    <Box className="variant-grid" style={{ gridTemplateColumns: `max-content repeat(${columns.length}, max-content)` }}>
      <Box />
      {columns.map((column) => <Text key={column.key} className="variant-grid__head">{column.label}</Text>)}
      {rows.map((row) => [
        <Text key={row.key} className="variant-grid__row">{row.label}</Text>,
        ...columns.map((column) => <Box key={`${row.key}-${column.key}`} className="variant-grid__cell">{cell(row.key, column.key)}</Box>),
      ])}
    </Box>
  );
};

const axis = <K extends string>(keys: readonly K[]): GridAxis<K>[] => keys.map((key) => ({ key, label: key }));

export { axis, VariantGrid };
