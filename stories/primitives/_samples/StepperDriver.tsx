/* @layer stories @kind story */
import { useState } from 'react';
import { Box, Button, ButtonRow, Icon, Stepper } from '../../../src/primitives';
import { STEPPER_STEPS, stepIdAt, stepperSteps } from './stepper-data';
import type { StepperDriverProps } from './StepperDriver.type';

const StepperDriver = (props: StepperDriverProps) => {
  const { orientation } = props;
  const [at, setAt] = useState(0);
  const last = STEPPER_STEPS.length - 1;
  const canSelect = (id: string) => STEPPER_STEPS.findIndex((step) => step.id === id) < at;
  const select = (id: string) => setAt(STEPPER_STEPS.findIndex((step) => step.id === id));
  const common = { currentId: stepIdAt(at), canSelect, onSelect: select, activeSubStepId: 'dungeon', orientation };
  const vertical = orientation === 'vertical';
  const plain = <Stepper steps={stepperSteps({ summaries: vertical, subSteps: true, long: vertical }, at)} {...common} />;
  const toned = <Stepper steps={stepperSteps({ summaries: vertical, subSteps: false, long: vertical, tones: true, icons: true }, at)} {...common} />;
  return (
    <Box className="stepper-story__driver">
      {vertical ? (
        <Box className="stepper-story__rails">
          <Box className="stepper-story__rail">{plain}</Box>
          <Box className="stepper-story__rail">{toned}</Box>
        </Box>
      ) : (
        <>
          <Box className="stepper-story__strip">{plain}</Box>
          <Box className="stepper-story__strip">{toned}</Box>
        </>
      )}
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
