/* @layer stories @kind component */
import { LogPanel } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { LOG_KINDS, LOG_ROWS } from './data-log';

const ROWS = LOG_ROWS.slice(0, 3);

const LogNarrowDemo = () => (
  <Box className="story-column">
    <Text className="story-label">In a 185 px parent the message moves under its tag instead of shrinking.</Text>
    <Box className="log-panel-story__narrow">
      <LogPanel rows={ROWS} kinds={LOG_KINDS} height="fill" toolbar={false} className="server-log" />
    </Box>
  </Box>
);

export { LogNarrowDemo };
