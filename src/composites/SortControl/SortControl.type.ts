/* @layer renderer-components @kind types */
import type { ViewOption } from '../GroupControl/GroupControl.type';

type SortDirection = 'asc' | 'desc';

interface SortState {
  key: string | null;
  direction: SortDirection;
}

interface SortControlProps {
  options: readonly ViewOption[];
  value: SortState;
  onChange: (next: SortState) => void;
  label?: string;
  className?: string;
}

export type { SortControlProps, SortDirection, SortState };
