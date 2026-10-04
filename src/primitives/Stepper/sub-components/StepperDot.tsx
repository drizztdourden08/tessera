/* @layer renderer-components @kind component */
import { Svg } from '../../Svg';
import { Span } from '../../text-elements';
import { DOT_VIEW_BOX } from './StepperDot.constants';
import { StepperDotFace } from './StepperDotFace';
import { StepperDotFill } from './StepperDotFill';
import { StepperDotRing } from './StepperDotRing';
import type { StepperDotProps } from './StepperDot.type';
import './StepperDot.css';

const StepperDot = (props: StepperDotProps) => {
  const { number, icon } = props;
  return (
    <Span className="stepper-dot" aria-hidden>
      <Svg className="stepper-dot__art" viewBox={DOT_VIEW_BOX} focusable="false">
        <StepperDotFill />
        <StepperDotRing />
      </Svg>
      <StepperDotFace number={number} icon={icon} />
    </Span>
  );
};

export { StepperDot };
