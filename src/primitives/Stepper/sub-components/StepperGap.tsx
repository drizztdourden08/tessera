/* @layer renderer-components @kind component */
import { Box } from '../../Box';
import { Span } from '../../text-elements';
import { StepperSubSteps } from './StepperSubSteps';
import type { StepperGapProps } from './StepperGap.type';
import './StepperGap.css';

const StepperGap = (props: StepperGapProps) => {
  const { step, current, last, selectable, activeSubStepId, onSubStepSelect } = props;
  const subSteps = step.subSteps ?? [];
  if (last && subSteps.length === 0) return null;
  return (
    <Box className="stepper__gap">
      {!last && <Span className="stepper__line" aria-hidden />}
      {subSteps.length > 0 && (
        <StepperSubSteps step={step} enabled={current || selectable} activeId={current ? activeSubStepId : undefined} onSelect={onSubStepSelect} />
      )}
    </Box>
  );
};

export { StepperGap };
