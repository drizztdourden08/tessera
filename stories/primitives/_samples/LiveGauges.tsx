/* @layer stories @kind component */
import { Flex, Gauge } from '../../../src/primitives';
import { usePerformanceFeed } from '../../composites/_samples/use-performance-feed';
import { HEAT_THRESHOLDS } from '../../composites/_samples/performance-panel.constants';

const LiveGauges = () => {
  const { cpu, gpu, heat } = usePerformanceFeed();
  return (
    <Flex gap="xl" align="start">
      <Gauge value={cpu} unit="%" label="CPU" size="lg" zones />
      <Gauge value={gpu} unit="%" label="GPU" size="lg" zones />
      <Gauge value={heat} unit="°C" label="GPU heat" size="lg" thresholds={HEAT_THRESHOLDS} zones />
    </Flex>
  );
};

export { LiveGauges };
