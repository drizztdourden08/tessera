/* @layer stories @kind hook */
import { useMemo } from 'react';
import type { ColumnSize, GridParts, GridShape } from '../RowGrid.type';
import { gridShape } from './grid-shape';

interface ShapeKey {
  columns: readonly ColumnSize[];
  parts: GridParts;
}

const useGridShape = (columns: readonly ColumnSize[], parts: GridParts): GridShape => {
  const key = JSON.stringify({ columns: columns.map(({ min, max, fold }) => ({ min, max, fold })), parts });
  return useMemo(() => {
    const parsed = JSON.parse(key) as ShapeKey;
    return gridShape(parsed.columns, parsed.parts);
  }, [key]);
};

export { useGridShape };
