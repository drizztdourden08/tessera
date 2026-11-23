/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import type { RecordHeaderIconSwapProps } from './RecordHeaderIconSwap.type';
import { RecordHeaderChevron } from './RecordHeaderChevron';

const RecordHeaderIconSwap = ({ icon, chevron }: RecordHeaderIconSwapProps) => (
  <Box className="record-header__swap">
    <Box className="record-header__swap-icon">{icon}</Box>
    <Box className="record-header__swap-chevron"><RecordHeaderChevron {...chevron} /></Box>
  </Box>
);

export { RecordHeaderIconSwap };
