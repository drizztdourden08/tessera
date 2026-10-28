/* @layer renderer-components @kind component */
import { Box } from '../../../primitives';
import type { SplitPaneSummaryProps } from './SplitPaneSummary.type';

const SplitPaneSummary = ({ summary, header }: SplitPaneSummaryProps) => (
  <Box className="split-pane__summary">
    {header}
    {summary !== undefined && <Box className="split-pane__summary-text">{summary}</Box>}
  </Box>
);

export { SplitPaneSummary };
