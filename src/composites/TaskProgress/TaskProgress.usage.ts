/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'The progress of one long job: a bar, the current line, its steps, the error when it fails and its log, folded.',
  useWhen: [
    'A job runs for seconds or minutes, such as a generation, an engine setup or a download, and the user waits on it.',
    'The job has named steps, writes output lines, or can fail with a message the user must read.',
  ],
  avoidWhen: [
    { case: 'The job should sit in a dialog the user can hide or cancel.', use: 'JobDialog' },
    { case: 'Only a bar is needed, with no line, steps or log.', use: 'ProgressBar' },
    { case: 'The user walks through the steps and picks when to go on.', use: 'Wizard' },
  ],
  rules: [
    'Pass percent only when the job knows it; leave it out and the running bar sweeps.',
    'Write the line as what happens now, such as Downloading Python: 31 of 84 MB, and update it as the job moves.',
    'Pass the error as a sentence that says what failed and what to do; it shows once the state is failed.',
    'Keep every output line in log, so the user can read why a job failed.',
  ],
  a11y: [
    'The section is named by label, and the bar by the same name.',
    'The state word is a status region, so a screen reader hears Done, Failed or Cancelled when it changes.',
    'The error is an alert, and the log sits behind a Disclosure that says whether it is open.',
  ],
  tree: {
    path: ['feedback', 'a long job with steps, a log or a failure'],
    rule: 'TaskProgress draws a bar, the steps, the failure and the log of one job the same way in every app.',
  },
  example: `import { TaskProgress } from '@drizztdourden08/tessera';
import type { LogRow, StepperStep, TaskState } from '@drizztdourden08/tessera';

interface Job {
  state: TaskState;
  percent?: number;
  line: string;
  steps: StepperStep[];
  currentId: string;
  error?: string;
  log: LogRow[];
}

const EngineSetup = ({ job }: { job: Job }) => (
  <TaskProgress
    state={job.state}
    percent={job.percent}
    line={job.line}
    steps={job.steps}
    currentId={job.currentId}
    error={job.error}
    log={job.log}
  />
);
`,
  propsHash: 'd0f7170e82b89711',
} satisfies ComponentUsage;

export { usage };
