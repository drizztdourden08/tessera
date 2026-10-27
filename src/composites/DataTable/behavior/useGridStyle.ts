/* @layer renderer-components @kind hook */
import { useMemo } from 'react';
import { trackList } from '../DataTable.constants';
import { sizeVariable } from '../../virtual/size-variable';
import { TRACKS_PROPERTY } from './useColumnSizing.constants';
import { ROW_PROPERTY } from './useVirtualRows.constants';
import type { CSSProperties } from 'react';
import type { TableColumn } from '../../../data/table/types';
import type { VirtualSize } from '../../virtual';
import type { ColumnSizing } from './useColumnSizing.type';

const useGridStyle = (columns: readonly TableColumn[], sizing: ColumnSizing, rowHeight?: VirtualSize): CSSProperties => {
  const { growFallback, fitFallback } = sizing;
  return useMemo(
    () => ({
      [TRACKS_PROPERTY]: trackList(columns, growFallback, fitFallback),
      ...(rowHeight ? { [ROW_PROPERTY]: sizeVariable(rowHeight) } : undefined),
    } as CSSProperties),
    [columns, growFallback, fitFallback, rowHeight],
  );
};

export { useGridStyle };
