/* @layer stories @kind story */
import type { StoryLiteArgTypes, StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { WizardFrame } from '../../src/composites';
import type { WizardOrientation, WizardPresentation } from '../../src/composites';
import { Box } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { frozenWizard } from './_samples/frozen-wizard';
import { CalibrationWizard } from './_samples/CalibrationWizard';
import { ProfileWizardDemo } from './_samples/ProfileWizardDemo';
import { INITIAL_ROM_IMPORT, ROM_FILE, ROM_IMPORT_STEPS } from './_samples/rom-import-data';
import { RomImportPanel } from './_samples/RomImportPanel';
import { RomImportBody } from './_samples/RomImportWizard';
import './Wizard.stories.css';

type WizardArgs = {
  title: string;
  orientation: WizardOrientation;
  presentation: WizardPresentation;
  compactProgress: boolean;
};

const ARGS: Partial<WizardArgs> = { title: 'Import a ROM', orientation: 'horizontal', presentation: 'inline', compactProgress: false };

const ARG_TYPES: StoryLiteArgTypes<WizardArgs> = {
  title: { control: 'text' },
  orientation: { control: 'select', options: ['horizontal', 'vertical'], description: 'Steps on top, or in a column on the left.' },
  presentation: { control: 'select', options: ['inline', 'dialog'], description: 'Inside the screen, or in a dialog.' },
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
    <RomImportPanel title={args.title} orientation={args.orientation} presentation={args.presentation} compact={args.compactProgress} />
  ),
} satisfies StoryLiteStoryDefinition<WizardArgs>;

const ProfileInScreen = {
  name: 'Relic of the Past: a new profile in the Profiles screen',
  render: () => <ProfileWizardDemo />,
} satisfies StoryLiteStoryDefinition<WizardArgs>;

const StepsOnTop = {
  name: 'Steps on top: importing a ROM',
  render: () => <RomImportPanel title="Import a ROM" orientation="horizontal" presentation="inline" compact={false} />,
} satisfies StoryLiteStoryDefinition<WizardArgs>;

const InDialog = {
  name: 'In a dialog: calibrating a controller',
  render: () => <CalibrationWizard />,
} satisfies StoryLiteStoryDefinition<WizardArgs>;

const Compact = {
  name: 'Compact progress, in a narrow panel',
  render: () => <RomImportPanel title="Import a ROM" orientation="horizontal" presentation="inline" compact short />,
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
      <WizardFrame wizard={wizard} title="Import a ROM" onExit={() => undefined} finishLabel="Import ROM" busyLabel="Extracting assets...">
        <RomImportBody wizard={wizard} />
      </WizardFrame>
    </Box>
  );
};

const CODE = `import { useWizard, WizardFrame } from '@drizztdourden08/tessera';

const STEPS = [
  { id: 'basics', label: 'Basics', validate: (d) => (d.name.trim() ? null : 'Give the profile a name to continue.') },
  { id: 'mode', label: 'Mode' },
  { id: 'seed', label: 'Seed and connection', when: (d) => d.mode !== 'standard' },
  { id: 'review', label: 'Review' },
];

const NewProfile = ({ onDone }: { onDone: () => void }) => {
  const wizard = useWizard({ steps: STEPS, initialValues: EMPTY_PROFILE, onFinish: createProfile, onFinished: onDone });
  return (
    <WizardFrame wizard={wizard} title="New profile" orientation="vertical" onExit={onDone} finishLabel="Create profile">
      <ProfileStep wizard={wizard} />
    </WizardFrame>
  );
};`;

const Overview = overviewStory({
  component: 'Wizard',
  importName: 'WizardFrame',
  description: 'A task done in steps, such as creating a profile. useWizard holds the steps, the input, where the user is, what they have visited, the errors and the finish; WizardFrame lays it out with WizardProgress, WizardStep, WizardNav and WizardExitGuard. It sits inside a screen by default, with the steps on top or in a column on the left, the step filling the rest with its own scroll and the buttons in a footer that stays put; it can open in a dialog instead. A step can be hidden by a condition, Next stays off until the step is valid, and a finish that fails keeps every input and shows the error on the last step. Leaving with unsaved input asks first.',
  playground: Playground,
  variants: [ProfileInScreen, StepsOnTop, InDialog, Compact],
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
export { Compact, InDialog, Overview, Playground, ProfileInScreen, StepsOnTop };
