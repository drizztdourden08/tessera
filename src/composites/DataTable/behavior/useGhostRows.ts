/* @layer renderer-components @kind hook */
import { useMemo } from 'react';
import { GHOST_ROW_LIMIT } from '../DataTable.constants';
import { ghostRowSample } from './ghost-row-sample';
import type { GhostRowsInput } from './useGhostRows.type';

const useGhostRows = <T>(input: GhostRowsInput<T>): readonly T[] => {
  const { nodes, isExpanded } = input;
  return useMemo(
    () => ghostRowSample({ nodes, isExpanded, limit: GHOST_ROW_LIMIT }),
    [nodes, isExpanded],
  );
};

export { useGhostRows };
