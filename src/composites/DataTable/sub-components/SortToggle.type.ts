/* @layer renderer-components @kind types */
import type { SortEntry } from '../../../data/table/types';

interface SortToggleProps {
  label: string;
  sortDir?: SortEntry['dir'];
  onToggle: () => void;
}

export type { SortToggleProps };
