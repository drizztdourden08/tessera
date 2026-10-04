/* @layer stories @kind component */
import { Box, StackedBar } from '../../../src/primitives';
import { formatGigabytes } from '../../composites/_samples/format-gigabytes';
import { MEMORY_TOTAL } from '../../composites/_samples/performance-feed.constants';
import { usePerformanceFeed } from '../../composites/_samples/use-performance-feed';

const LiveMemoryBar = () => {
  const { processes } = usePerformanceFeed();
  return (
    <Box className="stacked-bar-story">
      <StackedBar segments={processes} total={MEMORY_TOTAL} limit={6} legend label="Memory" format={formatGigabytes} />
    </Box>
  );
};

export { LiveMemoryBar };
