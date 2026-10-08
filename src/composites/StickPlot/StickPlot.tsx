/* @layer renderer-components @kind component */
import { REVIEW_MASK } from '../../primitives/dom/review-mask.constants';
import { Stack } from '../../primitives/Stack';
import { Svg, SvgCircle, SvgLine } from '../../primitives/Svg';
import { Span } from '../../primitives/text-elements';
import { insideDeadzone } from './behavior/inside-deadzone';
import { StickPlotCalibration } from './sub-components/StickPlotCalibration';
import { StickPlotReadout } from './sub-components/StickPlotReadout';
import { StickPlotZones } from './sub-components/StickPlotZones';
import { DOT_RADIUS, VIEW_BOX } from './StickPlot.constants';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { StickPlotProps } from './StickPlot.type';
import './StickPlot.css';

const StickPlot = (props: StickPlotProps) => {
  const {
    x, y, label, calibrated = false, showValue = true, innerDeadzone, outerDeadzone, range, center, size = 'md', className = '',
  } = props;
  const rest = insideDeadzone(x, y, innerDeadzone) ? '' : undefined;
  const { panels } = useTesseraStrings();

  return (
    <Stack gap="xs" align="center" className={`stick-plot${className ? ` ${className}` : ''}`} data-size={size}>
      <Svg className="stick-plot__plot" viewBox={VIEW_BOX} role="img" aria-label={label ?? panels.stickPosition}>
        <SvgCircle className="stick-plot__ring" cx={0} cy={0} r={1} vectorEffect="non-scaling-stroke" />
        <StickPlotZones innerDeadzone={innerDeadzone} outerDeadzone={outerDeadzone} />
        <SvgLine className="stick-plot__axis" x1={-1} y1={0} x2={1} y2={0} vectorEffect="non-scaling-stroke" />
        <SvgLine className="stick-plot__axis" x1={0} y1={-1} x2={0} y2={1} vectorEffect="non-scaling-stroke" />
        <StickPlotCalibration range={range} center={center} />
        <SvgLine className="stick-plot__stem" x1={0} y1={0} x2={x} y2={y} vectorEffect="non-scaling-stroke" data-resting={rest} {...REVIEW_MASK} />
        <SvgCircle className="stick-plot__dot" cx={x} cy={y} r={DOT_RADIUS} data-resting={rest} {...REVIEW_MASK} />
      </Svg>
      {label !== undefined && <Span tone="muted" className="stick-plot__label">{label}</Span>}
      {showValue && <StickPlotReadout x={x} y={y} calibrated={calibrated} />}
    </Stack>
  );
};

export { StickPlot };
