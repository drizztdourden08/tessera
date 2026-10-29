/* @layer stories @kind story */
import { useState } from 'react';
import { useWizard, Wizard } from '../../../src/composites';
import type { CreateOutcome, WizardApi, WizardStepDef } from '../../../src/composites';
import { Box, Button, Field, Icon, P, TextInput } from '../../../src/primitives';

type NameDraft = { name: string };

const STEPS: readonly WizardStepDef<NameDraft>[] = [
  {
    id: 'name',
    label: 'Name',
    description: 'The name is checked against the server before the wizard moves on.',
    busyHint: 'Checking the name...',
    validate: (d) => (d.name.trim() === '' ? 'Give the profile a name to continue.' : null),
  },
  { id: 'extras', label: 'Extras', description: 'Optional settings. You can skip them.' },
  { id: 'review', label: 'Review', description: 'The name was accepted. Create the profile.', buttons: { next: { label: 'Create profile' } } },
];

const onFinish = (draft: NameDraft): Promise<CreateOutcome> => Promise.resolve({ success: true, id: draft.name });

const wait = (ms: number) => new Promise<void>((resolve) => {
  setTimeout(resolve, ms);
});

const Body = ({ wizard, checking, check }: { wizard: WizardApi<NameDraft>; checking: boolean; check: () => void }) => {
  if (wizard.current.id !== 'name') return <P>Nothing else to set here.</P>;
  return (
    <Box className="story-column">
      <Field label="Profile name" required>
        <TextInput value={wizard.values.name} disabled={checking} onChange={(e) => wizard.setValue('name', e.target.value)} />
      </Field>
      <Button variant="secondary" icon={<Icon name="search" />} disabled={checking || wizard.invalid !== null} onClick={check}>
        Check the name and go to Review
      </Button>
    </Box>
  );
};

const AsyncStepWizard = () => {
  const [checking, setChecking] = useState(false);
  const wizard = useWizard({ steps: STEPS, initialValues: { name: 'Speedrun seed' }, onFinish });
  const check = () => {
    setChecking(true);
    void wait(1500).then(() => {
      setChecking(false);
      wizard.goTo('review', { force: true });
    });
  };
  return (
    <Box className="rom-import-story rom-import-story--short">
      <Wizard wizard={wizard} busy={checking} title="New profile" onExit={() => undefined}>
        <Body wizard={wizard} checking={checking} check={check} />
      </Wizard>
    </Box>
  );
};

export { AsyncStepWizard };
