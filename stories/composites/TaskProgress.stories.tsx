/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { TaskProgress } from '../../src/composites';
import type { TaskProgressProps, TaskState } from '../../src/composites';
import { Box } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { RUN_ERROR, RUN_LINE, RUN_LOG, RUN_LOG_KINDS, RUN_STEPS } from './_samples/task-samples.constants';
import { TaskRunDemo } from './_samples/TaskRunDemo';
import './TaskProgress.stories.css';

type TaskProgressArgs = {
  state: TaskState;
  percent: number;
  steps: boolean;
  log: boolean;
};

const STATES: readonly TaskState[] = ['running', 'done', 'failed', 'cancelled'];

const ARGS: Partial<TaskProgressArgs> = { state: 'running', percent: 52, steps: true, log: true };

const ARG_TYPES: PlaygroundArgTypes<TaskProgressArgs> = {
  state: { group: 'State', control: 'select', options: [...STATES] },
  percent: { group: 'Value', control: 'number', description: 'From 0 to 100; below 0 leaves it out, so a running bar sweeps.' },
  steps: { group: 'Content', control: 'boolean', description: 'The steps of the run, in a vertical Stepper.' },
  log: { group: 'Content', control: 'boolean', description: 'The output lines, folded under Show log.' },
};

const meta = {
  title: 'Composites · Content/TaskProgress',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<TaskProgressArgs>;

const run = (patch: Partial<TaskProgressProps>) => (
  <Box className="task-progress-story">
    <TaskProgress
      state="running"
      percent={52}
      line={RUN_LINE}
      steps={RUN_STEPS}
      currentId="generate"
      error={RUN_ERROR}
      log={RUN_LOG}
      logKinds={RUN_LOG_KINDS}
      {...patch}
    />
  </Box>
);

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => run({
    state: args.state,
    percent: args.percent < 0 ? undefined : args.percent,
    steps: args.steps ? RUN_STEPS : undefined,
    log: args.log ? RUN_LOG : undefined,
  }),
} satisfies PlaygroundStory<TaskProgressArgs>;

const KINDS = {
  'a run with steps': {},
  'length unknown': { percent: undefined, line: 'Setting up the engine: downloading Python', steps: undefined },
  'a download': { percent: 37, line: 'Downloading 0.5.0: 31 of 84 MB', steps: undefined, log: undefined },
} as const satisfies Readonly<Record<string, Partial<TaskProgressProps>>>;

const Kinds = {
  name: 'Kinds of job',
  render: () => <Demonstrator rows={axis(Object.keys(KINDS) as (keyof typeof KINDS)[])} align="stretch" cell={(kind) => run(KINDS[kind])} />,
} satisfies StoryLiteStoryDefinition<TaskProgressArgs>;

const Live = {
  name: 'A run from start to end',
  render: () => <TaskRunDemo />,
} satisfies StoryLiteStoryDefinition<TaskProgressArgs>;

const CODE = `import { TaskProgress } from '@drizztdourden08/tessera';

<TaskProgress
  state={job.state}
  percent={job.percent}
  line={job.line}
  steps={job.steps}
  currentId={job.currentId}
  error={job.error}
  log={job.log}
/>`;

const Overview = overviewStory({
  component: 'TaskProgress',
  description: 'The progress of one long job: a bar, the current line, its steps, the error when it fails and its log.',
  points: [
    '`state` is `running`, `done`, `failed` or `cancelled`, and sets the bar colour and the status word.',
    '`percent` fills the bar and is written at its end; without it a running bar sweeps across.',
    '`steps` and `currentId` draw a vertical [Stepper]; done ticks every step, failed marks the current one.',
    '`log` folds the output lines under Show log, in a [LogPanel] of fixed height; a failed job opens it.',
    '`error` shows in a danger [Callout] once the job has failed.',
  ],
  instead: '[JobDialog] for the same progress in a dialog with Cancel and Hide.',
  playground: Playground,
  variants: [Kinds, Live],
  states: {
    render: (props: StateProps) => run(props as Partial<TaskProgressProps>),
    list: STATES.map((state) => ({ name: state, props: { state, percent: state === 'done' ? 100 : 52 } })),
  },
  code: CODE,
});

export default meta;
export { Kinds, Live, Overview, Playground };
