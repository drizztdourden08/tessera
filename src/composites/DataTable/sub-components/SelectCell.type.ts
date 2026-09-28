/* @layer renderer-components @kind types */
interface SelectCellProps {
  role: 'gridcell' | 'columnheader';
  checked: boolean;
  indeterminate?: boolean;
  ariaLabel: string;
  onToggle: (range: boolean) => void;
}

export type { SelectCellProps };
