/* @layer renderer-components @kind hook */
import { useMemo } from 'react';
import { trackList } from '../DataTable.constants';
import { TRACKS_PROPERTY } from './useColumnSizing.constants';
import type { CSSProperties } from 'react';
import type { TableColumn } from '../../../data/table/types';
import type { ColumnSizing } from './useColumnSizing.type';

const useGridStyle = (columns: readonly TableColumn[], sizing: ColumnSizing): CSSProperties => {
  const { growFallback, fitFallback } = sizing;
  return useMemo(
    () => ({
      [TRACKS_PROPERTY]: trackList(columns, growFallback, fitFallback),
    } as CSSProperties),
    [columns, growFallback, fitFallback],
  );
};

export { useGridStyle };
