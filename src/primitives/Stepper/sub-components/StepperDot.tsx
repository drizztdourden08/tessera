/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Svg, SvgCircle, SvgClipPath, SvgGroup, SvgRect } from '../../Svg';
import { Span } from '../../text-elements';
import { DOT_BOX, DOT_CENTER, DOT_VIEW_BOX, RING_LENGTH, RING_RADIUS } from './StepperDot.constants';
import type { StepperDotProps } from './StepperDot.type';
import './StepperDot.css';

const StepperDot = (props: StepperDotProps) => {
  const { number } = props;
  const clipId = `stepper-dot-${useId().replace(/:/g, '')}`;
  return (
    <Span className="stepper-dot" aria-hidden>
      <Svg className="stepper-dot__art" viewBox={DOT_VIEW_BOX} focusable="false">
        <SvgClipPath id={clipId}>
          <SvgCircle cx={DOT_CENTER} cy={DOT_CENTER} r={DOT_CENTER} />
        </SvgClipPath>
        <SvgGroup clipPath={`url(#${clipId})`}>
          <SvgRect className="stepper-dot__fill" x={0} y={0} width={DOT_BOX} height={DOT_BOX} />
        </SvgGroup>
        <SvgCircle className="stepper-dot__track" cx={DOT_CENTER} cy={DOT_CENTER} r={RING_RADIUS} />
        <SvgGroup className="stepper-dot__ring">
          <SvgCircle className="stepper-dot__halo" cx={DOT_CENTER} cy={DOT_CENTER} r={RING_RADIUS} pathLength={RING_LENGTH} />
          <SvgCircle className="stepper-dot__edge" cx={DOT_CENTER} cy={DOT_CENTER} r={RING_RADIUS} pathLength={RING_LENGTH} />
        </SvgGroup>
      </Svg>
      <Span className="stepper-dot__number">{number}</Span>
    </Span>
  );
};

export { StepperDot };
