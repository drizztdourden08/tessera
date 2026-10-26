/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';

const GripHeaderCell = () => {
  const { table } = useTesseraStrings();
  return <Box role="columnheader" className="data-table__grip" aria-label={table.moveRow} />;
};

export { GripHeaderCell };
