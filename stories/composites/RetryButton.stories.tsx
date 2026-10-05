/* @layer stories @kind story */
import { useMemo } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { RetryButton } from '../../src/composites';
import type { ButtonSize, ButtonVariant } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { ConnectionPhases } from './_samples/ConnectionPhases';
import { ReconnectDemo } from './_samples/ReconnectDemo';
import './RetryButton.stories.css';

type RetryButtonArgs = {
  waitSeconds: number;
  attempt: number;
  attempts: number;
  retrying: boolean;
  label: string;
  variant: ButtonVariant;
  size: ButtonSize;
};

const ARGS: Partial<RetryButtonArgs> = { waitSeconds: 30, attempt: 2, attempts: 5, retrying: false, label: '', variant: 'secondary', size: 'sm' };

const ARG_TYPES: PlaygroundArgTypes<RetryButtonArgs> = {
  waitSeconds: { group: 'Behaviour', control: 'number', min: 0, max: 600, description: 'Sets retryAt this many seconds from now; 0 leaves it out.' },
  attempt: { group: 'Content', control: 'number', min: 0, max: 20, description: 'The next try; 0 leaves attempt and attempts out.' },
  attempts: { group: 'Content', control: 'number', min: 1, max: 20, description: 'The most tries the app makes.' },
  retrying: { group: 'State', control: 'boolean', description: 'A try is running: a spinner, and no second click.' },
  label: { group: 'Content', control: 'text', description: 'Replaces Retry and Retry now.' },
  variant: { group: 'Appearance', control: 'select', options: ['secondary', 'tertiary', 'primary', 'ghost', 'danger'] },
  size: { group: 'Appearance', control: 'select', options: ['sm', 'md'] },
};

const meta = {
  title: 'Composites · Actions/RetryButton',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<RetryButtonArgs>;

const Counting = ({ waitSeconds, attempt, attempts, label, ...rest }: Partial<RetryButtonArgs>) => {
  const retryAt = useMemo(() => (waitSeconds ? Date.now() + waitSeconds * 1000 : null), [waitSeconds]);
  const counted = attempt ? { attempt, attempts } : {};
  return <RetryButton {...rest} {...counted} label={label === '' ? undefined : label} retryAt={retryAt} onRetry={() => undefined} />;
};

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <Counting {...args} />,
} satisfies PlaygroundStory<RetryButtonArgs>;

const CASES = {
  'Plain': {},
  'Counting down': { waitSeconds: 45 },
  'Counted tries': { waitSeconds: 95, attempt: 2, attempts: 5 },
  'Out of tries': { attempt: 5, attempts: 5 },
  'Retrying': { retrying: true, attempt: 3, attempts: 5 },
} as const;

const CASE_KEYS = Object.keys(CASES) as (keyof typeof CASES)[];

const Cases = {
  name: 'Cases',
  render: () => <Demonstrator rows={axis(CASE_KEYS)} cell={(key) => <Counting {...CASES[key]} />} />,
} satisfies StoryLiteStoryDefinition<RetryButtonArgs>;

const Phases = {
  name: 'In a connection status',
  render: () => <ConnectionPhases />,
} satisfies StoryLiteStoryDefinition<RetryButtonArgs>;

const Live = {
  name: 'Live reconnect',
  render: () => <ReconnectDemo />,
} satisfies StoryLiteStoryDefinition<RetryButtonArgs>;

const CODE = `import { RetryButton } from '@drizztdourden08/tessera';

<RetryButton onRetry={connect} />
<RetryButton onRetry={connect} retryAt={nextTryAt} attempt={2} attempts={5} retrying={busy} />`;

const Overview = overviewStory({
  component: 'RetryButton',
  description: 'Tries a failed step again, and counts down to the next automatic try while the app waits.',
  points: [
    '`retryAt` is the time of the next automatic try; the line before the button counts down to it.',
    'While it counts, the button reads Retry now, so the user can skip the wait.',
    '`attempt` and `attempts` add Try 2 of 5 to the line.',
    '`retrying` shows a spinner and takes no second click.',
    'The app owns the timer: the button never starts a try by itself.',
  ],
  instead: 'A [Button] for an action that is not a second try, or [TaskProgress] for a long job that failed.',
  playground: Playground,
  variants: [Cases, Phases, Live],
  states: {
    render: (props: StateProps) => <Counting waitSeconds={30} {...props} />,
    list: [STATE.idle, { ...STATE.hover, target: 'button' }, { ...STATE.focus, target: 'button' }, { name: 'Retrying', props: { retrying: true } }, STATE.disabled],
  },
  code: CODE,
});

export default meta;
export { Cases, Live, Overview, Phases, Playground };
