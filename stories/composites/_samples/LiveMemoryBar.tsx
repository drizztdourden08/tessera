/* @layer stories @kind component */
import { StackedBar } from '../../../src/composites';
import { Box } from '../../../src/primitives';
import { formatGigabytes } from './format-gigabytes';
import { MEMORY_TOTAL } from './performance-feed.constants';
import { usePerformanceFeed } from './use-performance-feed';

const LiveMemoryBar = () => {
  const { processes } = usePerformanceFeed();
  return (
    <Box className="stacked-bar-story">
      <StackedBar segments={processes} total={MEMORY_TOTAL} limit={6} legend label="Memory" format={formatGigabytes} />
    </Box>
  );
};

export { LiveMemoryBar };
