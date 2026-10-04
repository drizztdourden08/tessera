/* @layer stories @kind story */
import type { StoryLiteArgTypes, StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
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

const ARG_TYPES: StoryLiteArgTypes<NavArgs> = {
  isFirst: { control: 'boolean', description: 'Back is off on the first step.' },
  isLast: { control: 'boolean', description: 'Next becomes the finish button.' },
  canGoNext: { control: 'boolean', description: 'The step is valid.' },
  busy: { control: 'boolean', description: 'The finish runs.' },
  hint: { control: 'text', description: 'What the step says in the bar.' },
  nextLabel: { control: 'text', description: 'The step overrides the label of Next. Empty keeps Next or Finish.' },
  nextIcon: { control: 'select', options: ['default', 'none', 'plus'], description: 'The step overrides the icon of Next, apart from its label.' },
  withCancel: { control: 'boolean' },
  withExtra: { control: 'boolean', description: 'Something of the step\'s own in the bar.' },
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
} satisfies StoryLiteStoryDefinition<NavArgs>;

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
  description: 'The action bar under a wizard step, a ButtonRow in its dark bar look. It generates its buttons: Cancel, Back with an arrow on its left, then Next with an arrow on its right, or the finish button with a check on the last step. Back and Next are always the same width and every button in the bar is the same height. The step definition can change the label and the icon of each button on its own, or drop Back or Cancel. The hint at the start of the bar says why Next is off, or whatever the step has to say. While the finish runs, the finish button shows its spinner, the busy text such as Generating seed... shows in place of the hint, and the others wait. The extra slot holds something of the step\'s own, such as Test connection. Wizard draws one from the current step.',
  playground: Playground,
  variants: [Moments, Overrides],
  states: {
    render: renderState,
    list: [STATE.idle, STATE.loading],
  },
});

export default meta;
export { Moments, Overrides, Overview, Playground };
