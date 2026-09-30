/* @layer stories @kind component */
import { StickPlot } from '../../../src/composites';
import type { StickPlotProps } from '../../../src/composites';
import { stickAt } from './controller-motion';
import { useAnimationTime } from './use-animation-time';

type LiveStickPlotProps = Omit<StickPlotProps, 'x' | 'y'>;

const LiveStickPlot = (props: LiveStickPlotProps) => {
  const { x, y } = stickAt(useAnimationTime());
  return <StickPlot x={x} y={y} {...props} />;
};

export { LiveStickPlot };
