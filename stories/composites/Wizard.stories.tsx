/* @layer stories @kind story */
import type { StoryLiteArgTypes, StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Wizard } from '../../src/composites';
import { Box } from '../../src/primitives';
import type { StepperOrientation } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { frozenWizard } from './_samples/frozen-wizard';
import { ProfileWizardDemo } from './_samples/ProfileWizardDemo';
import { INITIAL_ROM_IMPORT, ROM_FILE, ROM_IMPORT_STEPS } from './_samples/rom-import-data';
import { RomImportPanel } from './_samples/RomImportPanel';
import { RomImportBody } from './_samples/RomImportWizard';
import './Wizard.stories.css';

type WizardArgs = {
  title: string;
  orientation: StepperOrientation;
  compactProgress: boolean;
};

const ARGS: Partial<WizardArgs> = { title: 'Import a ROM', orientation: 'horizontal', compactProgress: false };

const ARG_TYPES: StoryLiteArgTypes<WizardArgs> = {
  title: { control: 'text' },
  orientation: { control: 'select', options: ['horizontal', 'vertical'], description: 'Steps on top, or in a column on the left.' },
  compactProgress: { control: 'boolean', description: 'Step 2 of 4 and a bar, for tight spaces.' },
};

const meta = {
  title: 'Composites · Wizard/Wizard',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<WizardArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <RomImportPanel title={args.title} orientation={args.orientation} compact={args.compactProgress} />
  ),
} satisfies StoryLiteStoryDefinition<WizardArgs>;

const ProfileInScreen = {
  name: 'Relic of the Past: a new profile in the Profiles screen',
  render: () => <ProfileWizardDemo />,
} satisfies StoryLiteStoryDefinition<WizardArgs>;

const StepsOnTop = {
  name: 'Steps on top: importing a ROM',
  render: () => <RomImportPanel title="Import a ROM" orientation="horizontal" compact={false} />,
} satisfies StoryLiteStoryDefinition<WizardArgs>;

const Compact = {
  name: 'Compact progress, in a narrow panel',
  render: () => <RomImportPanel title="Import a ROM" orientation="horizontal" compact short />,
} satisfies StoryLiteStoryDefinition<WizardArgs>;

const FAILED = 'Extraction stopped: the data folder is full. Free some space, then import again; the ROM is untouched.';

const STATE_AT: Readonly<Record<string, string>> = { idle: 'check', invalid: 'file', busy: 'review', failed: 'review' };

const renderState = (props: StateProps) => {
  const look = typeof props.look === 'string' ? props.look : 'idle';
  const values = look === 'invalid' ? INITIAL_ROM_IMPORT : { ...INITIAL_ROM_IMPORT, file: ROM_FILE };
  const wizard = frozenWizard(ROM_IMPORT_STEPS, values, STATE_AT[look] ?? 'check', {
    busy: look === 'busy',
    errors: look === 'failed' ? { review: FAILED } : {},
  });
  return (
    <Box className="rom-import-story rom-import-story--short">
      <Wizard wizard={wizard} title="Import a ROM" onExit={() => undefined}>
        <RomImportBody wizard={wizard} />
      </Wizard>
    </Box>
  );
};

const CODE = `import { useWizard, Wizard } from '@drizztdourden08/tessera';

const STEPS = [
  {
    id: 'basics',
    label: 'Basics',
    validate: (d) => (d.name.trim() ? null : 'Give the profile a name to continue.'),
    summary: (d) => d.name,
  },
  { id: 'mode', label: 'Mode', hint: 'You can change the mode until the profile is created.' },
  { id: 'seed', label: 'Seed and connection', when: (d) => d.mode !== 'standard', extra: (wizard) => <TestConnection wizard={wizard} /> },
  {
    id: 'review',
    label: 'Review',
    busyHint: 'Generating seed...',
    buttons: { back: { label: 'Change something' }, next: { label: 'Create profile', icon: 'plus' } },
  },
];

const NewProfile = ({ onDone }: { onDone: () => void }) => {
  const wizard = useWizard({ steps: STEPS, initialValues: EMPTY_PROFILE, onFinish: createProfile, onFinished: onDone });
  return (
    <Wizard wizard={wizard} title="New profile" orientation="vertical" onExit={onDone}>
      <ProfileStep wizard={wizard} />
    </Wizard>
  );
};`;

const Overview = overviewStory({
  component: 'Wizard',
  description: 'A task done in steps, such as creating a profile. useWizard holds the steps, the input, where the user is, what they have visited, the errors and the finish. Each step definition drives the whole wizard: its label and summary and sub-steps feed the Stepper, its validate and hint feed the hint in the action bar, busyHint shows while the finish runs, extra adds something of its own to the bar, and buttons changes the label or the icon of Cancel, Back and Next on that step, each on its own; on the last step Next is the finish button. Wizard lays it out: the Stepper on top or down the left, the step filling the rest with its own scroll, and WizardNav in a dark action bar that stays put. The step fades out while its circle fills and the next one fades in while the line runs on. A step can be hidden by a condition, Next stays off until the step is valid, and a finish that fails keeps every input and shows the error on the last step. Leaving with unsaved input asks first. WizardDialog puts the same wizard in a dialog.',
  playground: Playground,
  variants: [ProfileInScreen, StepsOnTop, Compact],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      { name: 'Step not ready', props: { look: 'invalid' } },
      { name: 'Finishing', props: { look: 'busy' } },
      { name: 'Finish failed', props: { look: 'failed' } },
    ],
  },
  code: CODE,
});

export default meta;
export { Compact, Overview, Playground, ProfileInScreen, StepsOnTop };
