/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { TaskState } from '../../src/composites';
import { Flex } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { JobDialogDemo } from './_samples/JobDialogDemo';

type JobDialogArgs = {
  state: TaskState;
  percent: number;
};

const ARGS: Partial<JobDialogArgs> = { state: 'running', percent: 30 };

const ARG_TYPES: PlaygroundArgTypes<JobDialogArgs> = {
  state: { group: 'State', control: 'select', options: ['running', 'done', 'failed', 'cancelled'], description: 'The state the job starts in.' },
  percent: { group: 'Value', control: 'number', description: 'Where the bar starts, from 0 to 100.' },
};

const meta = {
  title: 'Composites · Dialogs/JobDialog',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<JobDialogArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <JobDialogDemo key={`${args.state}:${args.percent}`} start={args.state} percent={args.percent} label="Show the job" />,
} satisfies PlaygroundStory<JobDialogArgs>;

const States = {
  name: 'Running, failed and done',
  render: () => (
    <Flex gap="sm" wrap>
      <JobDialogDemo start="running" label="A running job" />
      <JobDialogDemo start="failed" percent={52} label="A failed job" />
      <JobDialogDemo start="done" percent={100} label="A finished job" />
    </Flex>
  ),
} satisfies StoryLiteStoryDefinition<JobDialogArgs>;

const CODE = `import { JobDialog } from '@drizztdourden08/tessera';

<JobDialog
  open={open}
  title={\`Generating \${name}\`}
  state={job.state}
  percent={job.percent}
  line={job.line}
  steps={job.steps}
  currentId={job.currentId}
  error={job.error}
  log={job.log}
  onHide={() => setOpen(false)}
  onCancel={job.cancel}
/>`;

const Overview = overviewStory({
  component: 'JobDialog',
  description: 'A long job in a dialog: its [TaskProgress], with Cancel and Hide while it runs and Close once it ends.',
  points: [
    'Takes every prop of [TaskProgress], plus `open`, `title` and the handlers.',
    'While it runs, Hide calls `onHide` and leaves the job running; Cancel shows when `onCancel` is given.',
    'Once the job ends, one Close button calls `onClose`, or `onHide` without it.',
    'Escape, the close button and a click outside hide a running job and close an ended one.',
    '`actions` adds buttons before the main one, such as Try again after a failure.',
  ],
  instead: '[TaskProgress] alone to show the job in a page or a panel.',
  playground: Playground,
  variants: [States],
  code: CODE,
});

export default meta;
export { Overview, Playground, States };
