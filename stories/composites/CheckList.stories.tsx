/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { CheckList } from '../../src/composites';
import type { Check, CheckListProps, CheckState } from '../../src/composites';
import { Box, Button } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { ACTION_LABELS, RUNNING_CHECKS, SERVER_CHECKS } from './_samples/check-samples.constants';
import './CheckList.stories.css';

type CheckListArgs = {
  summary: string;
  compact: boolean;
  actions: boolean;
  python: CheckState;
};

const STATES: readonly CheckState[] = ['pass', 'warn', 'fail', 'pending', 'skip'];

const ARGS: Partial<CheckListArgs> = { summary: 'Home NAS is not ready', compact: false, actions: true, python: 'pass' };

const ARG_TYPES: PlaygroundArgTypes<CheckListArgs> = {
  summary: { group: 'Content', control: 'text', description: 'The line before the counts; empty leaves only the counts.' },
  actions: { group: 'Content', control: 'boolean', description: 'A button at the end of each failed check.' },
  compact: { group: 'Appearance', control: 'boolean', description: 'One line per check, with no box.' },
  python: { group: 'State', control: 'select', options: [...STATES], description: 'The state of the Python check.' },
};

const meta = {
  title: 'Composites · Content/CheckList',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<CheckListArgs>;

const withActions = (checks: readonly Check[]): Check[] => checks.map((check) => {
  const label = ACTION_LABELS[check.id];
  return label ? { ...check, action: <Button size="sm" variant="secondary">{label}</Button> } : check;
});

const draw = (props: Partial<CheckListProps>) => (
  <Box className="check-list-story">
    <CheckList checks={withActions(SERVER_CHECKS)} summary="Home NAS is not ready" {...props} />
  </Box>
);

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => draw({
    summary: args.summary || undefined,
    compact: args.compact,
    checks: (args.actions ? withActions(SERVER_CHECKS) : SERVER_CHECKS).map((check) => (check.id === 'python' ? { ...check, state: args.python } : check)),
  }),
} satisfies PlaygroundStory<CheckListArgs>;

const Result = {
  name: 'A connection test, done',
  render: () => draw({}),
} satisfies StoryLiteStoryDefinition<CheckListArgs>;

const Running = {
  name: 'While the test runs',
  render: () => draw({ checks: RUNNING_CHECKS, summary: undefined }),
} satisfies StoryLiteStoryDefinition<CheckListArgs>;

const Compact = {
  name: 'Compact, in a narrow panel',
  render: () => draw({ compact: true, checks: SERVER_CHECKS }),
} satisfies StoryLiteStoryDefinition<CheckListArgs>;

const CODE = `import { CheckList } from '@drizztdourden08/tessera';

<CheckList
  summary="Home NAS is not ready"
  checks={[
    { id: 'connect', label: 'Connect over SSH', state: 'pass', detail: 'ap@nas.local:22' },
    { id: 'port', label: 'Game port', state: 'fail', detail: 'port 38281 is in use', action: <Button size="sm">Pick another port</Button> },
    { id: 'linger', label: 'Keep running after logout', state: 'warn', detail: 'lingering is off' },
  ]}
/>`;

const Overview = overviewStory({
  component: 'CheckList',
  description: 'The results of a list of checks, such as a connection test, each passed, advice, failed, checking or skipped.',
  points: [
    'Each check has a `state`; its icon and colour come from one table built with `defineStatuses`.',
    'A `pending` check spins; a `skip` check is a grey ring, such as a step that waits for another.',
    'The counts on top add up the checks by state; `summary` puts a line before them.',
    '`detail` says what was found, and `action` puts a button at the end, such as Pick another port.',
    '`compact` draws one line per check with no box, for a narrow panel.',
  ],
  instead: '[TaskProgress] for one long job with steps, or [Status] for one state alone.',
  playground: Playground,
  variants: [Result, Running, Compact],
  states: {
    render: (props: StateProps) => draw({ summary: undefined, ...props }),
    list: STATES.map((state) => ({ name: state, props: { checks: [{ id: state, label: 'Game port', state, detail: 'port 38281' }] } })),
  },
  code: CODE,
});

export default meta;
export { Compact, Overview, Playground, Result, Running };
