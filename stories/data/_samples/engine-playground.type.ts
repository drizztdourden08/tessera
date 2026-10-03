/* @layer stories @kind types */
import type { GROUPINGS } from './engine-columns.constants';

type EnginePlaygroundProps = {
  grouping: keyof typeof GROUPINGS;
  sortBy: 'none' | 'name' | 'game' | 'sphere';
  descending: boolean;
  search: string;
  minSphere: number;
  progressionOnly: boolean;
};

export type { EnginePlaygroundProps };
