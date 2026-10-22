/* @layer stories @kind story */
import { useState } from 'react';
import { Box, Stepper } from '../../../src/primitives';
import { LADDER_IDS, ladderSteps } from './stepper-data';

const StepperLadder = () => {
  const [lit, setLit] = useState<ReadonlySet<string>>(() => new Set(LADDER_IDS));
  const toggle = (id: string) => setLit((now) => {
    const next = new Set(now);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    return next;
  });
  return (
    <Box className="stepper-story__ladder">
      <Stepper
        steps={ladderSteps(lit)}
        selectMode="toggle"
        labelPlacement="above"
        dotVariant="ring"
        tone="warning"
        reserve="none"
        stepWidth="sm"
        scroll
        onSelect={toggle}
        label="Steps to keep"
      />
    </Box>
  );
};

export { StepperLadder };
