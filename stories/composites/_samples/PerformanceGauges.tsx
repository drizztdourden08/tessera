/* @layer stories @kind component */
import { memo } from 'react';
import { Flex, Gauge } from '../../../src/primitives';
import { HEAT_THRESHOLDS } from './performance-panel.constants';

const PerformanceGaugesView = (props: { cpu: number; gpu: number; heat: number }) => {
  const { cpu, gpu, heat } = props;
  return (
    <Flex justify="around" align="start">
      <Gauge value={cpu} unit="%" label="CPU" zones />
      <Gauge value={gpu} unit="%" label="GPU" zones />
      <Gauge value={heat} unit="°C" label="GPU heat" thresholds={HEAT_THRESHOLDS} zones />
    </Flex>
  );
};

const PerformanceGauges = memo(PerformanceGaugesView);

export { PerformanceGauges };
