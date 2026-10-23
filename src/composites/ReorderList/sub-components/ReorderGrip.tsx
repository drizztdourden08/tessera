/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import type { ReorderGripProps } from '../ReorderList.type';
import './ReorderGrip.css';

const ReorderGrip = ({ index, drag }: ReorderGripProps) => (
  <Box className="reorder-list__grip" aria-hidden {...drag.handlers(index)}>
    <Icon name="grip-vertical" size={14} />
  </Box>
);

export { ReorderGrip };
