/* @layer stories @kind component */
import { LogPanel } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { LOG_KINDS, LOG_ROWS } from './data-log';

const LogHeightsDemo = () => (
  <Box className="story-row log-panel-story__heights">
    <Box className="story-column">
      <Text className="story-label">height={'{160}'}</Text>
      <LogPanel rows={LOG_ROWS} kinds={LOG_KINDS} height={160} toolbar={false} />
    </Box>
    <Box className="story-column">
      <Text className="story-label">height="fill" in a 224 px box</Text>
      <Box className="log-panel-story__box">
        <LogPanel rows={LOG_ROWS} kinds={LOG_KINDS} height="fill" toolbar={false} />
      </Box>
    </Box>
  </Box>
);

export { LogHeightsDemo };
