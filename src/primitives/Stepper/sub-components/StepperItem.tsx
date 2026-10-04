/* @layer renderer-components @kind component */
import { Box } from '../../Box';
import { Pressable } from '../../Pressable';
import { Span } from '../../text-elements';
import { useTesseraStrings } from '../../TesseraProvider/behavior/useTesseraStrings';
import { itemStyle } from '../behavior/item-style';
import { stepName } from '../behavior/step-name';
import { StepperDot } from './StepperDot';
import { StepperGap } from './StepperGap';
import type { StepperItemProps } from './StepperItem.type';
import './StepperItem.css';

const StepperItem = (props: StepperItemProps) => {
  const { step, number, status, current, last, wave, lineTone, doneIcon, reserveSummary, selectable, onSelect, activeSubStepId, onSubStepSelect } = props;
  const { stepper } = useTesseraStrings();
  return (
    <Box
      as="li"
      className="stepper__item"
      data-status={status}
      data-wave={wave}
      data-current={current || undefined}
      data-tone={step.tone}
      style={itemStyle(wave, step.tone, lineTone)}
    >
      <Pressable
        className="stepper__step"
        aria-label={stepName(stepper, number, step.label, status)}
        aria-current={current ? 'step' : undefined}
        disabled={!selectable || onSelect === undefined}
        onClick={() => onSelect?.(step.id)}
      >
        <StepperDot number={number} icon={doneIcon} />
        <Span className="stepper__text">
          <Span className="stepper__label" data-label={step.label}>
            <Span className="stepper__label-text">{step.label}</Span>
          </Span>
          {step.summary ? <Span className="stepper__summary" title={step.summary}>{step.summary}</Span> : reserveSummary && <Span className="stepper__summary" aria-hidden />}
        </Span>
      </Pressable>
      <StepperGap step={step} current={current} last={last} selectable={selectable} activeSubStepId={activeSubStepId} onSubStepSelect={onSubStepSelect} />
    </Box>
  );
};

export { StepperItem };
