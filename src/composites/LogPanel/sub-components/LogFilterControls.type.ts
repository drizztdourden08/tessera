/* @layer renderer-components @kind types */
import type { FilterFacet } from '../../FilterBar';

interface LogFilterControlsProps {
  facets?: FilterFacet[];
  search?: string;
  onSearchChange?: (query: string) => void;
}

export type { LogFilterControlsProps };
