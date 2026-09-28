/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { WizardDialogShell } from '../../src/composites';
import { Badge, Box, Button, Field, NumberInput, Select, TermList, Text, TextInput } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { WIZARD_STEPS } from './_samples/dialogs';

type WizardArgs = {
  title: string;
  initialStep: number;
  withHeaderExtra: boolean;
};

const PRESET_OPTIONS = [
  { value: 'casual', label: 'Casual', description: 'Hints on, short goal' },
  { value: 'short', label: 'Short', description: 'About an hour per game' },
  { value: 'tournament', label: 'Tournament', description: 'No hints, spoiler log sealed' },
];

const SERVER_OPTIONS = [
  { value: 'eu-west-2', label: 'eu-west-2' },
  { value: 'us-east-1', label: 'us-east-1' },
  { value: 'local', label: 'This computer' },
];

const REVIEW = [
  { term: 'Preset', detail: 'Casual' },
  { term: 'Players', detail: '8 slots' },
  { term: 'Server', detail: 'eu-west-2' },
];

const StepBody = ({ step }: { step: number }) => {
  const [preset, setPreset] = useState('casual');
  const [server, setServer] = useState('eu-west-2');
  const [slots, setSlots] = useState(8);
  const [room, setRoom] = useState('Friday async');
  if (step === 0) {
    return <Field label="Game preset"><Select value={preset} onChange={setPreset} options={PRESET_OPTIONS} /></Field>;
  }
  if (step === 1) {
    return <Field label="Player slots" hint="Up to 32."><NumberInput value={slots} min={1} max={32} onChange={setSlots} /></Field>;
  }
  if (step === 2) {
    return (
      <Box className="story-column">
        <Field label="Server"><Select value={server} onChange={setServer} options={SERVER_OPTIONS} /></Field>
        <Field label="Room name"><TextInput value={room} onChange={(e) => setRoom(e.target.value)} /></Field>
      </Box>
    );
  }
  return (
    <Box className="story-column">
      <Text>Check the details, then create the room.</Text>
      <TermList items={REVIEW} />
    </Box>
  );
};

const WizardDemo = (props: WizardArgs) => {
  const { title, initialStep, withHeaderExtra } = props;
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(initialStep);
  const last = WIZARD_STEPS.length - 1;
  const close = () => setOpen(false);
  const start = () => { setStep(Math.min(Math.max(initialStep, 0), last)); setOpen(true); };
  const actions = (
    <>
      <Button variant="tertiary" onClick={close}>Cancel</Button>
      <Button variant="secondary" disabled={step === 0} onClick={() => setStep(step - 1)}>Back</Button>
      {step < last
        ? <Button onClick={() => setStep(step + 1)}>Next</Button>
        : <Button onClick={close}>Create session</Button>}
    </>
  );
  return (
    <Box className="story-row">
      <Button variant="secondary" onClick={start}>New session</Button>
      <WizardDialogShell
        open={open}
        onClose={close}
        title={title}
        headerExtra={withHeaderExtra ? <Badge variant="neutral">Draft</Badge> : undefined}
        steps={WIZARD_STEPS}
        activeStep={step}
        onStepChange={setStep}
        actions={actions}
      >
        <StepBody step={step} />
      </WizardDialogShell>
    </Box>
  );
};

const ARGS: Partial<WizardArgs> = { title: 'New session', initialStep: 0, withHeaderExtra: false };

const ARG_TYPES: StoryLiteArgTypes<WizardArgs> = {
    title: { control: 'text' },
    initialStep: { control: 'number' },
    withHeaderExtra: { control: 'boolean' },
  };

const meta = {
  title: 'Composites · Dialogs/WizardDialogShell',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<WizardArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <WizardDemo {...args} />,
} satisfies StoryLiteStoryDefinition<WizardArgs>;

const ReviewStep = {
  name: 'Opens on review',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <WizardDemo {...args} initialStep={3} withHeaderExtra />,
} satisfies StoryLiteStoryDefinition<WizardArgs>;

const CODE = `import { useState } from 'react';
import { Button, WizardDialogShell } from '@drizztdourden08/tessera';

const STEPS = [{ label: 'Game preset' }, { label: 'Players' }, { label: 'Server' }, { label: 'Review' }];

const NewSessionWizard = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [step, setStep] = useState(0);
  const last = step === STEPS.length - 1;
  return (
    <WizardDialogShell
      open={open}
      onClose={onClose}
      title="New session"
      steps={STEPS}
      activeStep={step}
      onStepChange={setStep}
      actions={<Button onClick={last ? onClose : () => setStep(step + 1)}>{last ? 'Create session' : 'Next'}</Button>}
    >
      <SessionStep step={step} />
    </WizardDialogShell>
  );
};`;

const Overview = overviewStory({
  component: 'WizardDialogShell',
  description: 'A modal for a task done in steps, such as setting up a session. It builds on DialogShell, so it brings the backdrop, Escape to close and a footer for the actions, and adds a row of numbered step tabs under the header. The body of the active step comes in as children, and clicking a tab calls onStepChange with its index.',
  playground: Playground,
  variants: [ReviewStep],
  code: CODE,
});

export default meta;
export { Overview, Playground, ReviewStep };
