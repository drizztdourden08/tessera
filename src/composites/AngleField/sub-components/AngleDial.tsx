/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Svg, SvgCircle, SvgLine } from '../../../primitives/Svg';
import { DIAL_BOX, DIAL_CENTER, DIAL_KNOB, DIAL_RADIUS } from '../AngleField.constants';
import type { AngleDialProps } from '../AngleField.type';
import { RADIANS } from './AngleDial.constants';

const AngleDial = ({ value, mixed, handlers }: AngleDialProps) => {
  const tipX = DIAL_CENTER + DIAL_RADIUS * Math.cos(value * RADIANS);
  const tipY = DIAL_CENTER + DIAL_RADIUS * Math.sin(value * RADIANS);
  return (
    <Box as="span" className="angle-field__dial" data-mixed={mixed ? true : undefined} aria-hidden="true" {...handlers}>
      <Svg viewBox={`0 0 ${DIAL_BOX} ${DIAL_BOX}`} className="angle-field__svg" focusable="false">
        <SvgCircle className="angle-field__ring" cx={DIAL_CENTER} cy={DIAL_CENTER} r={DIAL_RADIUS} />
        {!mixed && <SvgLine className="angle-field__needle" x1={DIAL_CENTER} y1={DIAL_CENTER} x2={tipX} y2={tipY} />}
        {!mixed && <SvgCircle className="angle-field__knob" cx={tipX} cy={tipY} r={DIAL_KNOB} />}
        <SvgCircle className="angle-field__hub" cx={DIAL_CENTER} cy={DIAL_CENTER} r={1.5} />
      </Svg>
    </Box>
  );
};

export { AngleDial };
