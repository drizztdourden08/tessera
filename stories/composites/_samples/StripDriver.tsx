/* @layer stories @kind story */
import { useState } from 'react';
import { WizardProgress } from '../../../src/composites';
import { Box, Button, Icon } from '../../../src/primitives';
import { idAt, STRIP_STEPS, stripSteps } from './wizard-progress-data';

const StripDriver = () => {
  const [at, setAt] = useState(0);
  const last = STRIP_STEPS.length;
  const canSelect = (id: string) => STRIP_STEPS.findIndex((step) => step.id === id) < at;
  const select = (id: string) => setAt(STRIP_STEPS.findIndex((step) => step.id === id));
  return (
    <Box className="wizard-progress-story__driver">
      <Box className="wizard-progress-story__pair">
        <WizardProgress steps={stripSteps({ summaries: false, subSteps: false, long: false }, at)} currentId={idAt(at)} canSelect={canSelect} onSelect={select} />
        <Box className="wizard-progress-story__rail">
          <WizardProgress
            steps={stripSteps({ summaries: true, subSteps: true, long: true }, at)}
            currentId={idAt(at)}
            orientation="vertical"
            canSelect={canSelect}
            onSelect={select}
            activeSubStepId="dungeon"
          />
        </Box>
      </Box>
      <Box className="story-inline">
        <Button variant="secondary" icon={<Icon name="chevron-left" />} disabled={at === 0} onClick={() => setAt(at - 1)}>Back</Button>
        <Button variant="primary" disabled={at >= last - 1} onClick={() => setAt(at + 1)}>Next</Button>
        <Button variant="ghost" icon={<Icon name="rotate-ccw" />} onClick={() => setAt(0)}>Start over</Button>
      </Box>
    </Box>
  );
};

export { StripDriver };
