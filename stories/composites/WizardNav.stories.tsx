/* @layer stories @kind story */
import type { StoryLiteArgTypes, StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { WizardNav } from '../../src/composites';
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
  finishLabel: string;
  withCancel: boolean;
  withExtra: boolean;
};

const ARGS: Partial<NavArgs> = {
  isFirst: false,
  isLast: false,
  canGoNext: true,
  busy: false,
  hint: 'Pick a room and enter your slot name.',
  finishLabel: 'Create profile',
  withCancel: true,
  withExtra: false,
};

const ARG_TYPES: StoryLiteArgTypes<NavArgs> = {
  isFirst: { control: 'boolean', description: 'Back is off on the first step.' },
  isLast: { control: 'boolean', description: 'The finish button replaces Next.' },
  canGoNext: { control: 'boolean', description: 'The step is valid.' },
  busy: { control: 'boolean', description: 'The finish runs.' },
  hint: { control: 'text', description: 'Why Next is off, shown while it is.' },
  finishLabel: { control: 'text' },
  withCancel: { control: 'boolean' },
  withExtra: { control: 'boolean', description: 'Something of the step\'s own beside the buttons.' },
};

const meta = {
  title: 'Composites · Wizard/WizardNav',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<NavArgs>;

const noop = () => undefined;

const draw = (args: NavArgs) => (
  <WizardNav
    isFirst={args.isFirst}
    isLast={args.isLast}
    canGoNext={args.canGoNext}
    busy={args.busy}
    hint={args.hint || undefined}
    finishLabel={args.finishLabel}
    busyLabel="Generating seed..."
    extra={args.withExtra ? <Button variant="ghost" size="sm" icon={<Icon name="plug-zap" />}>Test connection</Button> : undefined}
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
  withExtra: moment === 'With an extra',
});

const Moments = {
  name: 'Through a wizard',
  render: () => <Demonstrator rows={axis(MOMENTS)} align="stretch" cell={(moment) => draw(at(moment))} />,
} satisfies StoryLiteStoryDefinition<NavArgs>;

const renderState = (props: StateProps) => draw({ ...(ARGS as NavArgs), isLast: true, busy: props.loading === true });

const Overview = overviewStory({
  component: 'WizardNav',
  description: 'The buttons under a wizard step: Cancel, Back, then Next, or the finish button on the last step. Next stays off while the step is not valid, and the hint beside it says why. While the finish runs, the finish button shows its spinner, the busy text such as Generating seed... shows beside it, and the others wait. The extra slot holds something of the step\'s own, such as Test connection. WizardFrame draws one in its footer.',
  playground: Playground,
  variants: [Moments],
  states: {
    render: renderState,
    list: [STATE.idle, STATE.loading],
  },
});

export default meta;
export { Moments, Overview, Playground };
