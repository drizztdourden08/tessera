/* @layer stories @kind story */
import type { StoryLiteArgTypes, StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { WizardFrame } from '../../src/composites';
import type { WizardOrientation, WizardPresentation } from '../../src/composites';
import { Box } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { frozenWizard } from './_samples/frozen-wizard';
import { ProfileWizardDemo } from './_samples/ProfileWizardDemo';
import { INITIAL_SESSION_DRAFT, SESSION_STEPS } from './_samples/session-wizard-data';
import { SessionBody } from './_samples/SessionWizard';
import { SessionWizardPanel } from './_samples/SessionWizardPanel';
import './Wizard.stories.css';

type WizardArgs = {
  title: string;
  orientation: WizardOrientation;
  presentation: WizardPresentation;
  compactProgress: boolean;
};

const ARGS: Partial<WizardArgs> = { title: 'New session', orientation: 'horizontal', presentation: 'inline', compactProgress: false };

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
    <SessionWizardPanel title={args.title} orientation={args.orientation} presentation={args.presentation} compact={args.compactProgress} />
  ),
} satisfies StoryLiteStoryDefinition<WizardArgs>;

const ProfileInScreen = {
  name: 'New profile, steps on the left of the screen',
  render: () => <ProfileWizardDemo />,
} satisfies StoryLiteStoryDefinition<WizardArgs>;

const StepsOnTop = {
  name: 'Steps on top',
  render: () => <SessionWizardPanel title="New session" orientation="horizontal" presentation="inline" compact={false} />,
} satisfies StoryLiteStoryDefinition<WizardArgs>;

const InDialog = {
  name: 'In a dialog',
  render: () => <SessionWizardPanel title="New session" orientation="horizontal" presentation="dialog" compact={false} />,
} satisfies StoryLiteStoryDefinition<WizardArgs>;

const Compact = {
  name: 'Compact progress',
  render: () => <SessionWizardPanel title="New session" orientation="horizontal" presentation="inline" compact short />,
} satisfies StoryLiteStoryDefinition<WizardArgs>;

const FAILED = 'The server refused the room: eu-west-2 is full. Pick another server and try again.';

const STATE_AT: Readonly<Record<string, string>> = { idle: 'preset', invalid: 'server', busy: 'review', failed: 'review' };

const renderState = (props: StateProps) => {
  const look = typeof props.look === 'string' ? props.look : 'idle';
  const values = look === 'invalid' ? INITIAL_SESSION_DRAFT : { ...INITIAL_SESSION_DRAFT, name: 'Friday async' };
  const wizard = frozenWizard(SESSION_STEPS, values, STATE_AT[look] ?? 'preset', {
    busy: look === 'busy',
    errors: look === 'failed' ? { review: FAILED } : {},
  });
  return (
    <Box className="session-wizard-story session-wizard-story--short">
      <WizardFrame wizard={wizard} title="New session" onExit={() => undefined} finishLabel="Open room" busyLabel="Opening room...">
        <SessionBody wizard={wizard} />
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
