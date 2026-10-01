/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Svg, SvgCircle, SvgClipPath, SvgRect } from '../../../../primitives/Svg';
import { Span } from '../../../../primitives/text-elements';
import { DOT_BOX, DOT_CENTER, DOT_RADIUS, DOT_VIEW_BOX } from './WizardStepDot.constants';
import type { WizardStepDotProps } from './WizardStepDot.type';
import './WizardStepDot.css';

const WizardStepDot = (props: WizardStepDotProps) => {
  const { number } = props;
  const clipId = `wizard-dot-${useId().replace(/:/g, '')}`;
  return (
    <Span className="wizard-dot" aria-hidden>
      <Svg className="wizard-dot__art" viewBox={DOT_VIEW_BOX} focusable="false">
        <SvgClipPath id={clipId}>
          <SvgCircle cx={DOT_CENTER} cy={DOT_CENTER} r={DOT_RADIUS} />
        </SvgClipPath>
        <SvgRect className="wizard-dot__fill" x={0} y={0} width={DOT_BOX} height={DOT_BOX} clipPath={`url(#${clipId})`} />
        <SvgCircle className="wizard-dot__ring" cx={DOT_CENTER} cy={DOT_CENTER} r={DOT_RADIUS} />
        <SvgCircle className="wizard-dot__draw" cx={DOT_CENTER} cy={DOT_CENTER} r={DOT_RADIUS} pathLength={100} />
      </Svg>
      <Span className="wizard-dot__number">{number}</Span>
    </Span>
  );
};

export { WizardStepDot };
