/* @layer stories @kind story */
import { useState } from 'react';
import { Box, Button, ButtonRow, Icon, Stepper } from '../../../src/primitives';
import { STEPPER_STEPS, stepIdAt, stepperSteps } from './stepper-data';

const StepperDriver = () => {
  const [at, setAt] = useState(0);
  const last = STEPPER_STEPS.length - 1;
  const canSelect = (id: string) => STEPPER_STEPS.findIndex((step) => step.id === id) < at;
  const select = (id: string) => setAt(STEPPER_STEPS.findIndex((step) => step.id === id));
  const common = { currentId: stepIdAt(at), canSelect, onSelect: select, activeSubStepId: 'dungeon' };
  return (
    <Box className="stepper-story__driver">
      <Box className="stepper-story__pair">
        <Stepper steps={stepperSteps({ summaries: false, subSteps: true, long: false }, at)} {...common} />
        <Box className="stepper-story__rail">
          <Stepper steps={stepperSteps({ summaries: true, subSteps: true, long: true }, at)} orientation="vertical" {...common} />
        </Box>
      </Box>
      <ButtonRow align="start">
        <Button variant="secondary" disabled={at === 0} onClick={() => setAt(at - 1)}><Icon name="arrow-left" />Back</Button>
        <Button variant="primary" disabled={at >= last} onClick={() => setAt(at + 1)}>Next<Icon name="arrow-right" /></Button>
        <Button variant="tertiary" disabled={at >= last} onClick={() => setAt(last)}>Skip to Review</Button>
        <Button variant="ghost" icon={<Icon name="rotate-ccw" />} onClick={() => setAt(0)}>Start over</Button>
      </ButtonRow>
    </Box>
  );
};

export { StepperDriver };
