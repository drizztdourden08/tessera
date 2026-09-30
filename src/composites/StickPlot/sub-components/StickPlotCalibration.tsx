/* @layer renderer-components @kind component */
import { SvgCircle, SvgRect } from '../../../primitives/Svg';
import { CENTER_RADIUS } from '../StickPlot.constants';
import type { StickPlotCalibrationProps } from './StickPlotCalibration.type';

const StickPlotCalibration = (props: StickPlotCalibrationProps) => {
  const { range, center } = props;

  return (
    <>
      {range && (
        <SvgRect
          className="stick-plot__range"
          x={range.minX}
          y={range.minY}
          width={Math.max(0, range.maxX - range.minX)}
          height={Math.max(0, range.maxY - range.minY)}
          vectorEffect="non-scaling-stroke"
        />
      )}
      {center && <SvgCircle className="stick-plot__center" cx={center.x} cy={center.y} r={CENTER_RADIUS} />}
    </>
  );
};

export { StickPlotCalibration };
