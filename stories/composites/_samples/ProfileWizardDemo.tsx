/* @layer stories @kind story */
import { useState } from 'react';
import type { ReactNode } from 'react';
import { Box, Button, Callout, Checkbox, Icon, Span, Strong } from '../../../src/primitives';
import { ProfileWizard } from './ProfileWizard';

type Outcome = { kind: 'created'; name: string } | { kind: 'left' } | null;

const MockScreen = ({ crumb, children }: { crumb: string; children: ReactNode }) => (
  <Box className="profile-wizard-story__screen">
    <Box className="profile-wizard-story__bar">
      <Icon name="menu" />
      <Strong>Relic of the Past</Strong>
      <Span tone="muted" className="profile-wizard-story__crumb">{crumb}</Span>
    </Box>
    <Box className="profile-wizard-story__body">{children}</Box>
  </Box>
);

const OutcomePanel = ({ outcome, onAgain }: { outcome: NonNullable<Outcome>; onAgain: () => void }) => (
  <Box className="profile-wizard-story__outcome">
    {outcome.kind === 'created'
      ? <Callout tone="success" icon={<Icon name="circle-check" />}>{`${outcome.name} is ready. Its seed is generated and the ROM is patched.`}</Callout>
      : <Callout tone="info" icon={<Icon name="info" />}>You left the wizard. Nothing was saved.</Callout>}
    <Button variant="primary" icon={<Icon name="plus" />} onClick={onAgain}>New profile</Button>
  </Box>
);

const ProfileWizardDemo = () => {
  const [run, setRun] = useState(0);
  const [outcome, setOutcome] = useState<Outcome>(null);
  const [failNext, setFailNext] = useState(true);
  const again = () => {
    setOutcome(null);
    setRun(run + 1);
  };
  return (
    <Box className="profile-wizard-story">
      <Checkbox checked={failNext} onChange={setFailNext} label="Make the next Create profile fail, to see the error" />
      <MockScreen crumb={outcome ? 'Profiles' : 'Profiles / New profile'}>
        {outcome ? <OutcomePanel outcome={outcome} onAgain={again} /> : (
          <ProfileWizard
            key={run}
            failNext={failNext}
            onFailUsed={() => setFailNext(false)}
            onCreated={(name) => setOutcome({ kind: 'created', name })}
            onLeft={() => setOutcome({ kind: 'left' })}
          />
        )}
      </MockScreen>
    </Box>
  );
};

export { ProfileWizardDemo };
