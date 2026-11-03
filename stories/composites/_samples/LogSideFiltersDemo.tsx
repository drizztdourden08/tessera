/* @layer stories @kind component */
import { LogPanel } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { LOG_KINDS, LOG_ROWS } from './data-log';

const LogSideFiltersDemo = () => (
  <Box className="story-column">
    <Text className="story-label">filterPlacement left, open, and right, folded to a slim strip with defaultFiltersCollapsed. The dashed line folds and opens it; the lines keep a gutter so the round button never covers the time.</Text>
    <Box className="story-column">
      <LogPanel rows={LOG_ROWS} kinds={LOG_KINDS} height={280} filterPlacement="left" size="sm" className="server-log" />
      <LogPanel rows={LOG_ROWS} kinds={LOG_KINDS} height={280} filterPlacement="right" defaultFiltersCollapsed size="sm" className="server-log" />
    </Box>
  </Box>
);

export { LogSideFiltersDemo };
