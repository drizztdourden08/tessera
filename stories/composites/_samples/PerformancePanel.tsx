/* @layer stories @kind component */
import { Box, Stack } from '../../../src/primitives';
import { PerformanceGauges } from './PerformanceGauges';
import { PerformanceMemory } from './PerformanceMemory';
import { PerformanceTiles } from './PerformanceTiles';
import { usePerformanceFeed } from './use-performance-feed';
import './PerformancePanel.css';

const PerformancePanel = () => {
  const frame = usePerformanceFeed();
  return (
    <Stack gap="md" className="performance-panel">
      <PerformanceGauges cpu={frame.cpu} gpu={frame.gpu} heat={frame.heat} />
      <PerformanceMemory processes={frame.processes} />
      <Box className="performance-panel__tiles">
        <PerformanceTiles frame={frame} />
      </Box>
    </Stack>
  );
};

export { PerformancePanel };
