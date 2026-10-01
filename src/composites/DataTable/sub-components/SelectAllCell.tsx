/* @layer renderer-components @kind component */
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { SelectCell } from './SelectCell';
import type { SelectAllCellProps } from './SelectAllCell.type';

const SelectAllCell = ({ selection }: SelectAllCellProps) => {
  const { table } = useTesseraStrings();

  return (
    <SelectCell
      role="columnheader"
      checked={selection.allState === 'all'}
      indeterminate={selection.allState === 'some'}
      ariaLabel={table.selectAllShown}
      onToggle={selection.onCheckAll}
    />
  );
};

export { SelectAllCell };
