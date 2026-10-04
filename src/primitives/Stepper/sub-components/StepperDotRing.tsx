/* @layer renderer-components @kind component */
import { SvgCircle, SvgGroup } from '../../Svg';
import { DOT_CENTER, RING_LENGTH, RING_RADIUS } from './StepperDot.constants';
import './StepperDotRing.css';

const StepperDotRing = () => (
  <>
    <SvgCircle className="stepper-dot__track" cx={DOT_CENTER} cy={DOT_CENTER} r={RING_RADIUS} />
    <SvgGroup className="stepper-dot__ring">
      <SvgCircle className="stepper-dot__halo" cx={DOT_CENTER} cy={DOT_CENTER} r={RING_RADIUS} pathLength={RING_LENGTH} />
      <SvgCircle className="stepper-dot__edge" cx={DOT_CENTER} cy={DOT_CENTER} r={RING_RADIUS} pathLength={RING_LENGTH} />
    </SvgGroup>
  </>
);

export { StepperDotRing };
