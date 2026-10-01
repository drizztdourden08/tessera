/* @layer stories @kind story */
import { useCallback, useRef, useState } from 'react';
import { useWizard, WizardFrame } from '../../../src/composites';
import type { CreateOutcome, WizardApi } from '../../../src/composites';
import { INITIAL_PROFILE } from './profile-wizard-data';
import type { ProfileDraft } from './profile-wizard-data';
import { PROFILE_STEPS, profileStepInfo } from './profile-wizard-steps';
import { ProfileOptionsBody } from './ProfileOptionsBody';
import { ProfileSeedBody } from './ProfileSeedBody';
import { BasicsBody, ModeBody, ReviewBody, SettingsBody } from './ProfileWizardBodies';

type ProfileWizardProps = {
  failNext: boolean;
  onFailUsed: () => void;
  onCreated: (name: string) => void;
  onLeft: () => void;
};

const GENERATE_MS = 1600;

const SEED_FAILURE = 'Seed generation failed: the generator stopped after 30 seconds. Nothing was saved and your choices are kept, so you can try again.';

const wait = (ms: number) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

const StepBody = ({ wizard, tab, onTab }: { wizard: WizardApi<ProfileDraft>; tab: string; onTab: (tab: string) => void }) => {
  switch (wizard.current.id) {
    case 'basics': return <BasicsBody wizard={wizard} />;
    case 'mode': return <ModeBody wizard={wizard} />;
    case 'seed': return <ProfileSeedBody wizard={wizard} />;
    case 'options': return <ProfileOptionsBody wizard={wizard} tab={tab} onTab={onTab} />;
    case 'settings': return <SettingsBody wizard={wizard} />;
    default: return <ReviewBody wizard={wizard} />;
  }
};

const ProfileWizard = ({ failNext, onFailUsed, onCreated, onLeft }: ProfileWizardProps) => {
  const [tab, setTab] = useState('items');
  const fail = useRef({ failNext, onFailUsed });
  fail.current = { failNext, onFailUsed };
  const onFinish = useCallback(async (draft: ProfileDraft): Promise<CreateOutcome> => {
    await wait(GENERATE_MS);
    if (!fail.current.failNext) return { success: true, id: draft.name.trim() };
    fail.current.onFailUsed();
    return { success: false, error: SEED_FAILURE };
  }, []);
  const wizard = useWizard({ steps: PROFILE_STEPS, initialValues: INITIAL_PROFILE, onFinish, onFinished: onCreated });
  const pickTab = (stepId: string, tabId: string) => {
    setTab(tabId);
    if (wizard.current.id !== stepId) wizard.goTo(stepId);
  };
  return (
    <WizardFrame
      wizard={wizard}
      title="New profile"
      orientation="vertical"
      onExit={onLeft}
      stepInfo={profileStepInfo(wizard.values, wizard.visited, wizard.current.id)}
      activeSubStepId={tab}
      onSubStepSelect={pickTab}
      finishLabel="Create profile"
      busyLabel="Generating seed..."
    >
      <StepBody wizard={wizard} tab={tab} onTab={setTab} />
    </WizardFrame>
  );
};

export { ProfileWizard };
