/* @layer renderer-components @kind types */
import type { FilterBarProps } from '../FilterBar/FilterBar.type';
import type { GroupControlProps } from '../GroupControl/GroupControl.type';
import type { SortControlProps } from '../SortControl/SortControl.type';

interface ViewControlsProps {
  filter?: FilterBarProps;
  group?: GroupControlProps;
  sort?: SortControlProps;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  label?: string;
  className?: string;
}

export type { ViewControlsProps };
