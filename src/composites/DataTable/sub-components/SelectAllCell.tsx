/* @layer renderer-components @kind component */
import { SelectCell } from './SelectCell';
import type { SelectAllCellProps } from './SelectAllCell.type';

const SelectAllCell = ({ selection }: SelectAllCellProps) => (
  <SelectCell
    role="columnheader"
    checked={selection.allState === 'all'}
    indeterminate={selection.allState === 'some'}
    ariaLabel="Select all shown rows"
    onToggle={selection.onCheckAll}
  />
);

export { SelectAllCell };
