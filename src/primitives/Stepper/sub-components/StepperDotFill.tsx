/* @layer renderer-components @kind component */
import { useId } from 'react';
import { SvgCircle, SvgClipPath, SvgGroup, SvgRect } from '../../Svg';
import { DOT_BOX, DOT_CENTER } from './StepperDot.constants';
import './StepperDotFill.css';

const StepperDotFill = () => {
  const clipId = `stepper-dot-${useId().replace(/:/g, '')}`;
  return (
    <>
      <SvgClipPath id={clipId}>
        <SvgCircle cx={DOT_CENTER} cy={DOT_CENTER} r={DOT_CENTER} />
      </SvgClipPath>
      <SvgGroup clipPath={`url(#${clipId})`}>
        <SvgRect className="stepper-dot__fill" x={0} y={0} width={DOT_BOX} height={DOT_BOX} />
      </SvgGroup>
    </>
  );
};

export { StepperDotFill };
