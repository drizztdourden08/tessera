/* @layer renderer-components @kind component */
import { Status } from '../../../primitives/Status';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { BooleanCellProps } from './BooleanCell.type';

const BooleanCell = ({ on }: BooleanCellProps) => {
  const { common } = useTesseraStrings();
  return <Status tone={on ? 'success' : 'neutral'}>{on ? common.yes : common.no}</Status>;
};

export { BooleanCell };
