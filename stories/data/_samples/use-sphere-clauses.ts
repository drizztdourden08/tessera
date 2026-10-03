/* @layer stories @kind hook */
import { useMemo } from 'react';
import { createClause } from '../../../src/data';
import type { FilterClause } from '../../../src/data';

const useSphereClauses = (minSphere: number, progressionOnly: boolean): readonly FilterClause[] =>
  useMemo(() => [
    createClause('sphere', 'gte', minSphere),
    ...(progressionOnly ? [createClause('progression', 'isTrue')] : []),
  ], [minSphere, progressionOnly]);

export { useSphereClauses };
