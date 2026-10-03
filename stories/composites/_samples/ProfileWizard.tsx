/* @layer stories @kind story */
import { useCallback, useMemo, useRef, useState } from 'react';
import { useWizard, WizardFrame } from '../../../src/composites';
import type { CreateOutcome, WizardApi } from '../../../src/composites';
import { Button, Icon } from '../../../src/primitives';
import { IDLE_CONNECTION, probeConnection } from './connection-test';
import type { ConnectionState } from './connection-test';
import { INITIAL_PROFILE } from './profile-wizard-data';
import type { ProfileDraft } from './profile-wizard-data';
import { profileSteps } from './profile-wizard-steps';
import { ProfileOptionsBody } from './ProfileOptionsBody';
import { ProfileSeedBody } from './ProfileSeedBody';
import { BasicsBody, ModeBody, ReviewBody, SettingsBody } from './ProfileWizardBodies';

type ProfileWizardProps = {
  failNext: boolean;
  onFailUsed: () => void;
  onCreated: (name: string) => void;
  onLeft: () => void;
};

type StepBodyProps = { wizard: WizardApi<ProfileDraft>; tab: string; onTab: (tab: string) => void; connection: ConnectionState };

const GENERATE_MS = 1600;

const SEED_FAILURE = 'Seed generation failed: the generator could not place every item with these options. Nothing was saved and your choices are kept, so try again or change an option.';

const wait = (ms: number) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

const StepBody = ({ wizard, tab, onTab, connection }: StepBodyProps) => {
  switch (wizard.current.id) {
    case 'basics': return <BasicsBody wizard={wizard} />;
    case 'mode': return <ModeBody wizard={wizard} />;
    case 'seed': return <ProfileSeedBody wizard={wizard} connection={connection} />;
    case 'options': return <ProfileOptionsBody wizard={wizard} tab={tab} onTab={onTab} />;
    case 'settings': return <SettingsBody wizard={wizard} />;
    default: return <ReviewBody wizard={wizard} />;
  }
};

const targetOf = (draft: ProfileDraft) => `${draft.server}|${draft.slot}`;

const useConnectionSteps = () => {
  const [connection, setConnection] = useState<ConnectionState>(IDLE_CONNECTION);
  const steps = useMemo(() => profileSteps((wizard) => {
    if (wizard.values.mode !== 'online') return null;
    const test = () => {
      setConnection({ status: 'testing', message: '' });
      void probeConnection(wizard.values.server, wizard.values.slot).then(setConnection);
    };
    return (
      <Button variant="ghost" icon={<Icon name="plug-zap" />} loading={connection.status === 'testing'} disabled={wizard.values.server.trim() === ''} onClick={test}>
        Test connection
      </Button>
    );
  }), [connection.status]);
  return { connection, steps };
};

const ProfileWizard = ({ failNext, onFailUsed, onCreated, onLeft }: ProfileWizardProps) => {
  const [tab, setTab] = useState('world');
  const fail = useRef({ failNext, onFailUsed });
  fail.current = { failNext, onFailUsed };
  const onFinish = useCallback(async (draft: ProfileDraft): Promise<CreateOutcome> => {
    await wait(draft.mode === 'standard' ? GENERATE_MS / 3 : GENERATE_MS);
    if (!fail.current.failNext) return { success: true, id: draft.name.trim() };
    fail.current.onFailUsed();
    return { success: false, error: SEED_FAILURE };
  }, []);
  const { connection, steps } = useConnectionSteps();
  const wizard = useWizard({ steps, initialValues: INITIAL_PROFILE, onFinish, onFinished: onCreated });
  const current = connection.target === undefined || connection.target === targetOf(wizard.values);
  const pickTab = (stepId: string, tabId: string) => {
    setTab(tabId);
    if (wizard.current.id !== stepId) wizard.goTo(stepId);
  };
  return (
    <WizardFrame wizard={wizard} title="New profile" orientation="vertical" onExit={onLeft} activeSubStepId={tab} onSubStepSelect={pickTab}>
      <StepBody wizard={wizard} tab={tab} onTab={setTab} connection={current ? connection : IDLE_CONNECTION} />
    </WizardFrame>
  );
};

export { ProfileWizard };
