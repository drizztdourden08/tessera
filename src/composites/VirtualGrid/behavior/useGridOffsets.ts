/* @layer renderer-components @kind hook */
import { useMemo } from 'react';
import { gridOffsets } from './grid-offsets';
import { useGridRowHeights } from './useGridRowHeights';
import type { GridOffsetsModel, UseGridOffsetsInput } from './useGridOffsets.type';

const useGridOffsets = (input: UseGridOffsetsInput): GridOffsetsModel => {
  const { enabled, layout, keyAt } = input;
  const { known, record } = useGridRowHeights({ enabled, rows: layout.rows, keyAt });
  const offsets = useMemo(() => {
    if (!enabled) return undefined;
    return gridOffsets(layout, (row) => {
      const key = keyAt(row);
      return key === undefined ? undefined : known.get(key);
    });
  }, [enabled, layout, keyAt, known]);
  return { offsets, record };
};

export { useGridOffsets };
