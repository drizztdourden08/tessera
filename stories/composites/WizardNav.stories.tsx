/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { WizardNav } from '../../src/composites';
import type { WizardStepButtons } from '../../src/composites';
import { Button, Icon } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';

type NavArgs = {
  isFirst: boolean;
  isLast: boolean;
  canGoNext: boolean;
  busy: boolean;
  hint: string;
  nextLabel: string;
  nextIcon: 'default' | 'none' | 'plus';
  withCancel: boolean;
  withExtra: boolean;
};

const ARGS: Partial<NavArgs> = {
  isFirst: false,
  isLast: false,
  canGoNext: true,
  busy: false,
  hint: 'Pick a room and enter your slot name.',
  nextLabel: '',
  nextIcon: 'default',
  withCancel: true,
  withExtra: false,
};

const ARG_TYPES: PlaygroundArgTypes<NavArgs> = {
  hint: { group: 'Content', control: 'text', description: 'What the step says in the bar.' },
  nextLabel: { group: 'Content', control: 'text', description: 'The step overrides the label of Next. Empty keeps Next or Finish.' },
  nextIcon: { group: 'Content', control: 'select', options: ['default', 'none', 'plus'], description: 'The step overrides the icon of Next, apart from its label.' },
  withCancel: { group: 'Content', control: 'boolean' },
  withExtra: { group: 'Content', control: 'boolean', description: 'Something of the step\'s own in the bar.' },
  isFirst: { group: 'State', control: 'boolean', description: 'Back is off on the first step.' },
  isLast: { group: 'State', control: 'boolean', description: 'Next becomes the finish button.' },
  canGoNext: { group: 'State', control: 'boolean', description: 'The step is valid.' },
  busy: { group: 'State', control: 'boolean', description: 'The finish runs.' },
};

const meta = {
  title: 'Composites · Wizard/WizardNav',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<NavArgs>;

const noop = () => undefined;

const ICONS = { default: undefined, none: null, plus: 'plus' } as const;

const buttonsOf = (args: NavArgs): WizardStepButtons => ({ next: { label: args.nextLabel || undefined, icon: ICONS[args.nextIcon] } });

const draw = (args: NavArgs, buttons: WizardStepButtons = buttonsOf(args)) => (
  <WizardNav
    isFirst={args.isFirst}
    isLast={args.isLast}
    canGoNext={args.canGoNext}
    busy={args.busy}
    hint={args.hint || undefined}
    busyHint="Generating seed..."
    buttons={buttons}
    extra={args.withExtra ? <Button variant="ghost" icon={<Icon name="plug-zap" />}>Test connection</Button> : undefined}
    onCancel={args.withCancel ? noop : undefined}
    onBack={noop}
    onNext={noop}
    onFinish={noop}
  />
);

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => draw(args),
} satisfies PlaygroundStory<NavArgs>;

const MOMENTS = ['First step', 'Middle step', 'Step not ready', 'With an extra', 'Last step', 'Finishing'] as const;

const at = (moment: (typeof MOMENTS)[number]): NavArgs => ({
  ...(ARGS as NavArgs),
  isFirst: moment === 'First step',
  isLast: moment === 'Last step' || moment === 'Finishing',
  canGoNext: moment !== 'Step not ready',
  busy: moment === 'Finishing',
  hint: moment === 'Step not ready' ? 'Enter the server URL and your slot name to continue.' : '',
  withExtra: moment === 'With an extra',
});

const Moments = {
  name: 'Through a wizard',
  render: () => <Demonstrator rows={axis(MOMENTS)} align="stretch" cell={(moment) => draw(at(moment))} />,
} satisfies StoryLiteStoryDefinition<NavArgs>;

const OVERRIDES: Readonly<Record<string, WizardStepButtons>> = {
  'Generated': {},
  'Next label only': { next: { label: 'Continue' } },
  'Next icon only': { next: { icon: 'chevron-right' } },
  'Label and icon': { next: { label: 'Create profile', icon: 'plus' } },
  'Back renamed, no Cancel': { back: { label: 'Change something' }, cancel: false },
  'No Back': { back: false },
};

const Overrides = {
  name: 'What a step can change',
  render: () => (
    <Demonstrator
      rows={axis(Object.keys(OVERRIDES))}
      align="stretch"
      cell={(row) => draw({ ...(ARGS as NavArgs), hint: '' }, OVERRIDES[row])}
    />
  ),
} satisfies StoryLiteStoryDefinition<NavArgs>;

const renderState = (props: StateProps) => draw({ ...(ARGS as NavArgs), isLast: true, busy: props.loading === true });

const Overview = overviewStory({
  component: 'WizardNav',
  description: 'The action bar under a wizard step, with Cancel, Back and Next, or the finish button on the last step.',
  points: [
    '`canGoNext` turns Next on, and `hint` at the start of the bar says why it is off.',
    '`buttons` changes the label or the icon of each button, or drops Back or Cancel.',
    'While `busy`, the finish button spins, `busyHint` takes the place of the hint, and the others wait.',
    '`extra` holds something of the step\'s own, such as a Test connection button.',
    '[Wizard] draws one from the current step.',
  ],
  playground: Playground,
  variants: [Moments, Overrides],
  states: {
    render: renderState,
    list: [STATE.idle, STATE.loading],
  },
});

export default meta;
export { Moments, Overrides, Overview, Playground };
