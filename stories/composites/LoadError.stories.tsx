/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { LoadError } from '../../src/composites';
import { Box } from '../../src/primitives';
import { axis } from '../_template/axis';
import type { PlaygroundStory } from '../_template/controls/playground.type';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { DevicesRow } from './_samples/DevicesRow';
import { LONG_RAW, SESSIONS } from './_samples/load-error-samples.constants';
import { LOAD_ERROR_ARG_TYPES, LOAD_ERROR_ARGS, LOAD_ERROR_CODE, VARIANTS } from './_samples/load-error-story.constants';
import type { LoadErrorArgs } from './_samples/load-error-story.type';
import { ServersPane } from './_samples/ServersPane';
import { SessionsScreen } from './_samples/SessionsScreen';
import { useRetryDemo } from './_samples/useRetryDemo';
import './LoadError.stories.css';

const meta = {
  title: 'Composites · Feedback/LoadError',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<LoadErrorArgs>;

const RAW = { short: SESSIONS.raw, long: LONG_RAW, none: undefined } as const;

const Live = (args: Partial<LoadErrorArgs>) => {
  const retry = useRetryDemo(args.retrying);
  return (
    <Box className={`load-error-story__frame load-error-story__frame--${args.variant ?? 'center'}`}>
      <LoadError
        variant={args.variant}
        message={args.message ?? SESSIONS.sentence}
        error={RAW[args.raw ?? 'short']}
        {...(args.retry === false ? {} : retry)}
      />
    </Box>
  );
};

const Playground = {
  name: 'Playground',
  args: LOAD_ERROR_ARGS,
  argTypes: LOAD_ERROR_ARG_TYPES,
  render: (args) => <Live key={`${args.variant}-${String(args.retrying)}`} {...args} />,
} satisfies PlaygroundStory<LoadErrorArgs>;

const InPane = {
  name: 'In an ItemList pane',
  render: () => <ServersPane />,
} satisfies StoryLiteStoryDefinition<LoadErrorArgs>;

const InScreen = {
  name: 'In a screen',
  render: () => <SessionsScreen />,
} satisfies StoryLiteStoryDefinition<LoadErrorArgs>;

const InRow = {
  name: 'In a settings row',
  render: () => <DevicesRow />,
} satisfies StoryLiteStoryDefinition<LoadErrorArgs>;

const LongMessage = {
  name: 'A long raw message: open Details',
  render: () => (
    <Demonstrator rows={axis(VARIANTS)} align="stretch" cell={(variant) => <Live variant={variant} raw="long" message={SESSIONS.sentence} />} />
  ),
} satisfies StoryLiteStoryDefinition<LoadErrorArgs>;

const Retrying = {
  name: 'Retry in progress',
  render: () => (
    <Demonstrator rows={axis(VARIANTS)} align="stretch" cell={(variant) => <Live variant={variant} retrying message={SESSIONS.sentence} />} />
  ),
} satisfies StoryLiteStoryDefinition<LoadErrorArgs>;

const Overview = overviewStory({
  component: 'LoadError',
  description: 'What to show when something fails to load: one plain sentence, Retry, and the raw error behind Details.',
  points: [
    '`message` is one plain sentence; the raw `error` waits behind Details, closed at first.',
    '`onRetry` adds a [RetryButton]; `retrying` makes it spin and take no second click.',
    '`variant` is `center` for a pane or screen, `box` inside a section, `inline` in a row.',
    'The box is a danger [Callout], with the Details under its line.',
    '[ItemList], [TaskProgress], [ErrorBoundary] and a [SettingsRow] problem draw their failures with it.',
    'The sentence is an alert, so a screen reader reads it once when the load fails.',
  ],
  instead: '[EmptyState] when the load worked and there is nothing to show; [TaskProgress] for a long job.',
  playground: Playground,
  variants: [InPane, InScreen, InRow, LongMessage, Retrying],
  states: {
    render: (props: StateProps) => <Live {...LOAD_ERROR_ARGS} variant="box" {...(props as Partial<LoadErrorArgs>)} />,
    list: [STATE.idle, { ...STATE.focus, target: 'button' }, { name: 'Retrying', props: { retrying: true } }, { name: 'No Retry', props: { retry: false } }],
  },
  code: LOAD_ERROR_CODE,
});

export default meta;
export { InPane, InRow, InScreen, LongMessage, Overview, Playground, Retrying };
