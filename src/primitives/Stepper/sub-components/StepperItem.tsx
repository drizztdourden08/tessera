/* @layer renderer-components @kind component */
import type { CSSProperties } from 'react';
import { Box } from '../../Box';
import { Pressable } from '../../Pressable';
import { Span } from '../../text-elements';
import { useTesseraStrings } from '../../TesseraProvider/behavior/useTesseraStrings';
import { stepName } from '../behavior/step-name';
import { StepperDot } from './StepperDot';
import { StepperGap } from './StepperGap';
import type { StepperItemProps } from './StepperItem.type';
import './StepperItem.css';

const StepperItem = (props: StepperItemProps) => {
  const { step, number, status, current, last, wave, selectable, onSelect, activeSubStepId, onSubStepSelect } = props;
  const { stepper } = useTesseraStrings();
  const waveStyle = wave === undefined ? undefined : ({ '--stepper-wave': wave } as CSSProperties);
  return (
    <Box as="li" className="stepper__item" data-status={status} data-wave={wave} style={waveStyle}>
      <Pressable
        className="stepper__step"
        aria-label={stepName(stepper, number, step.label, status)}
        aria-current={current ? 'step' : undefined}
        disabled={!selectable || onSelect === undefined}
        onClick={() => onSelect?.(step.id)}
      >
        <StepperDot number={number} />
        <Span className="stepper__text">
          <Span className="stepper__label">{step.label}</Span>
          {step.summary && <Span className="stepper__summary" title={step.summary}>{step.summary}</Span>}
        </Span>
      </Pressable>
      <StepperGap step={step} current={current} last={last} selectable={selectable} activeSubStepId={activeSubStepId} onSubStepSelect={onSubStepSelect} />
    </Box>
  );
};

export { StepperItem };
