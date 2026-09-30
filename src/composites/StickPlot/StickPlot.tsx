/* @layer renderer-components @kind component */
import { Stack } from '../../primitives/Stack';
import { Svg, SvgCircle, SvgLine } from '../../primitives/Svg';
import { Span } from '../../primitives/text-elements';
import { insideDeadzone } from './behavior/inside-deadzone';
import { stickReadout } from './behavior/stick-readout';
import { StickPlotCalibration } from './sub-components/StickPlotCalibration';
import { StickPlotZones } from './sub-components/StickPlotZones';
import { DEFAULT_LABEL, DOT_RADIUS, VIEW_BOX } from './StickPlot.constants';
import type { StickPlotProps } from './StickPlot.type';
import './StickPlot.css';

const StickPlot = (props: StickPlotProps) => {
  const {
    x, y, label, calibrated = false, showValue = true, innerDeadzone, outerDeadzone, range, center, size = 'md', className = '',
  } = props;
  const resting = insideDeadzone(x, y, innerDeadzone);

  return (
    <Stack gap="xs" align="center" className={`stick-plot${className ? ` ${className}` : ''}`} data-size={size}>
      <Svg className="stick-plot__plot" viewBox={VIEW_BOX} role="img" aria-label={label ?? DEFAULT_LABEL}>
        <SvgCircle className="stick-plot__ring" cx={0} cy={0} r={1} vectorEffect="non-scaling-stroke" />
        <StickPlotZones innerDeadzone={innerDeadzone} outerDeadzone={outerDeadzone} />
        <SvgLine className="stick-plot__axis" x1={-1} y1={0} x2={1} y2={0} vectorEffect="non-scaling-stroke" />
        <SvgLine className="stick-plot__axis" x1={0} y1={-1} x2={0} y2={1} vectorEffect="non-scaling-stroke" />
        <StickPlotCalibration range={range} center={center} />
        <SvgCircle className="stick-plot__dot" cx={x} cy={y} r={DOT_RADIUS} data-resting={resting ? '' : undefined} />
      </Svg>
      {label !== undefined && <Span tone="muted" className="stick-plot__label">{label}</Span>}
      {showValue && <Span tone="dim" className="stick-plot__value">{stickReadout(x, y, calibrated)}</Span>}
    </Stack>
  );
};

export { StickPlot };
