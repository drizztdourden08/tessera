/* @layer stories @kind component */
import { Box, Card, SectionHeader, Status } from '../../../src/primitives';
import { PerformanceGauges } from './PerformanceGauges';
import { PerformanceMemory } from './PerformanceMemory';
import { PerformanceTiles } from './PerformanceTiles';
import { usePerformanceFeed } from './use-performance-feed';
import './PerformancePanel.css';

const PerformancePanel = () => {
  const frame = usePerformanceFeed();
  return (
    <Card className="performance-panel" data-performance-panel="">
      <SectionHeader title="Performance" action={<Status variant="pill" tone="success" dot>Live</Status>} />
      <PerformanceGauges cpu={frame.cpu} gpu={frame.gpu} heat={frame.heat} />
      <PerformanceMemory processes={frame.processes} />
      <Box className="performance-panel__tiles">
        <PerformanceTiles frame={frame} />
      </Box>
    </Card>
  );
};

export { PerformancePanel };
