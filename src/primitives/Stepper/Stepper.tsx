/* @layer renderer-components @kind component */
import { Box } from '../Box';
import { useTesseraStrings } from '../TesseraProvider/behavior/useTesseraStrings';
import { lineTone } from './behavior/line-tone';
import { motionKind } from './behavior/motion-kind';
import { stepStatus } from './behavior/step-status';
import { toneStyle } from './behavior/tone-style';
import { useStepMotion } from './behavior/useStepMotion';
import { waveOf } from './behavior/wave-of';
import { StepperCompact } from './sub-components/StepperCompact';
import { StepperItem } from './sub-components/StepperItem';
import type { StepperProps } from './Stepper.type';
import './Stepper.css';

const Stepper = (props: StepperProps) => {
  const {
    steps, currentId, orientation = 'horizontal', compact = false, tone, doneIcon = 'check', canSelect, onSelect,
    activeSubStepId, onSubStepSelect, label, className = '',
  } = props;
  const { stepper } = useTesseraStrings();
  const current = Math.max(steps.findIndex((step) => step.id === currentId), 0);
  const motion = useStepMotion(current);
  const name = label ?? stepper.steps;
  if (compact) return <StepperCompact steps={steps} current={current} label={name} className={className} />;
  return (
    <Box
      as="nav"
      className={`stepper${className ? ` ${className}` : ''}`}
      style={toneStyle(tone, '--stepper-')}
      data-orientation={orientation}
      data-motion={motionKind(motion, current)}
      aria-label={name}
    >
      <Box as="ol" className="stepper__list">
        {steps.map((step, index) => (
          <StepperItem
            key={step.id}
            step={step}
            number={index + 1}
            status={stepStatus(step, index, current)}
            current={index === current}
            last={index === steps.length - 1}
            wave={waveOf(index, current, motion)}
            lineTone={lineTone(step, steps[index + 1], tone)}
            doneIcon={(step.doneIcon ?? doneIcon) || undefined}
            selectable={index !== current && (canSelect?.(step.id) ?? false)}
            onSelect={onSelect}
            activeSubStepId={activeSubStepId}
            onSubStepSelect={onSubStepSelect}
          />
        ))}
      </Box>
    </Box>
  );
};

export { Stepper };
