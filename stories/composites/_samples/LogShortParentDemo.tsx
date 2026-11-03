/* @layer stories @kind component */
import { LogPanel } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { LOG_KINDS, LOG_ROWS } from './data-log';

const LogShortParentDemo = () => (
  <Box className="story-column">
    <Text className="story-label">height="fill" with minRows={'{3}'} in a parent shorter than three rows: the panel keeps its three rows.</Text>
    <Box className="log-panel-story__short">
      <LogPanel rows={LOG_ROWS} kinds={LOG_KINDS} height="fill" minRows={3} toolbar={false} className="server-log" />
    </Box>
  </Box>
);

export { LogShortParentDemo };
