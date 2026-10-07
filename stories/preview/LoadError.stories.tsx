/* @layer stories @kind story */
import type { ReactNode } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Box } from '../../src/primitives';
import { axis } from '../_template/axis';
import type { PlaygroundStory } from '../_template/controls/playground.type';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { LoadError } from './LoadError/LoadError';
import { DevicesRow } from './LoadError/_samples/DevicesRow';
import { LONG_RAW, SESSIONS } from './LoadError/_samples/load-error-samples.constants';
import {
  LOAD_ERROR_ARG_TYPES, LOAD_ERROR_ARGS, LOAD_ERROR_CODE, VARIANTS,
} from './LoadError/_samples/load-error-story.constants';
import type { LoadErrorArgs } from './LoadError/_samples/load-error-story.type';
import { LoadErrorChoices } from './LoadError/_samples/LoadErrorChoices';
import { LoadErrorPlaces } from './LoadError/_samples/LoadErrorPlaces';
import type { PlaceSampleProps } from './LoadError/_samples/place-sample.type';
import { ServersPane } from './LoadError/_samples/ServersPane';
import { SessionsScreen } from './LoadError/_samples/SessionsScreen';
import { useRetryDemo } from './LoadError/_samples/useRetryDemo';
import './LoadError.stories.css';

const meta = {
  title: 'Preview · For approval/LoadError',
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

const PLACE_COLUMNS = axis(['Today', 'Proposed']);

const beside = (Sample: (props: PlaceSampleProps) => ReactNode) => () => (
  <Demonstrator columns={PLACE_COLUMNS} align="start" valign="start" cell={(_row, column) => <Sample today={column === 'Today'} />} />
);

const InPane = {
  name: 'In an ItemList pane, today and proposed',
  render: beside(ServersPane),
} satisfies StoryLiteStoryDefinition<LoadErrorArgs>;

const InScreen = {
  name: 'In a screen, today and proposed',
  render: beside(SessionsScreen),
} satisfies StoryLiteStoryDefinition<LoadErrorArgs>;

const InRow = {
  name: 'Inline in a settings row, today and proposed',
  render: beside(DevicesRow),
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
  description: 'For approval, not a released part: what to show when something fails to load, with a plain sentence, Retry and Details.',
  points: [
    '**For approval:** this page lives in the gallery only, and nothing on it ships until the owner picks an option.',
    '`message` is one plain sentence; the raw `error` waits behind Details, closed at first.',
    '`onRetry` adds a [RetryButton]; `retrying` makes it spin and take no second click.',
    '`variant` is `center` for a pane or screen, `box` inside a section, `inline` in a row.',
    'The sentence is an alert, so a screen reader reads it once when the load fails.',
  ],
  instead: '[EmptyState] when the load worked and there is nothing to show; [TaskProgress] for a long job.',
  playground: Playground,
  variants: [InPane, InScreen, InRow, LongMessage, Retrying],
  sections: [
    { title: 'Where it would go', node: <LoadErrorPlaces /> },
    { title: 'Options weighed', node: <LoadErrorChoices /> },
  ],
  states: {
    render: (props: StateProps) => <Live {...LOAD_ERROR_ARGS} variant="box" {...(props as Partial<LoadErrorArgs>)} />,
    list: [STATE.idle, { ...STATE.focus, target: 'button' }, { name: 'Retrying', props: { retrying: true } }, { name: 'No Retry', props: { retry: false } }],
  },
  code: LOAD_ERROR_CODE,
});

export default meta;
export { InPane, InRow, InScreen, LongMessage, Overview, Playground, Retrying };
