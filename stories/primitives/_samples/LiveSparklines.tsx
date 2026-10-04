/* @layer stories @kind component */
import { Box, Sparkline } from '../../../src/primitives';
import { FEED_HISTORY } from '../../composites/_samples/performance-feed.constants';
import { usePerformanceFeed } from '../../composites/_samples/use-performance-feed';
import { LOW_FPS_BAND } from '../../composites/_samples/performance-panel.constants';

const LiveSparklines = () => {
  const { fps, download } = usePerformanceFeed();
  return (
    <Box className="sparkline-story-live">
      <Sparkline values={fps} length={FEED_HISTORY} min={0} max={165} band={LOW_FPS_BAND} tone="success" dot label="Frame rate" />
      <Sparkline values={download} length={FEED_HISTORY} min={0} variant="area" tone="info" label="Download" />
    </Box>
  );
};

export { LiveSparklines };
