/* @layer renderer-components @kind component */
import { VIEW_SIZE } from '../Sparkline.constants';
import type { SparklineBandViewProps } from './SparklineBandView.type';

const SparklineBandView = (props: SparklineBandViewProps) => {
  const { box, tone } = props;
  const edges = box.edges.map((y) => `M0 ${y}H${VIEW_SIZE}`).join(' ');
  return (
    <g className="sparkline__band" data-tone={tone}>
      <rect className="sparkline__zone" x={0} y={box.top} width={VIEW_SIZE} height={box.bottom - box.top} />
      {edges && <path className="sparkline__edge" d={edges} vectorEffect="non-scaling-stroke" />}
    </g>
  );
};

export { SparklineBandView };
