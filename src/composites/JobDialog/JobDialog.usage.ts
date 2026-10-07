/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A long job in a dialog: its TaskProgress, with Cancel and Hide while it runs and Close once it ends.',
  useWhen: [
    'The user starts a long job, such as a generation, an install or an update, and should see it run.',
    'The user may hide the job and go on working, then come back to it.',
  ],
  avoidWhen: [
    { case: 'The progress belongs in a page or a panel, not over it.', use: 'TaskProgress' },
    { case: 'The dialog asks a question and waits for the answer.', use: 'Dialog' },
  ],
  rules: [
    'Name the job in the title, such as Generating Friday async, and keep it while the job runs.',
    'Keep the job running when the dialog hides, and give the user a way back to it, such as a button with the percent.',
    'Pass onCancel only when the job can stop; set cancelling while it stops.',
    'Add Try again through actions after a failure, beside Close.',
    'Mark the dialog with id and data, such as data-job-id, to find it from the app; both go on the element with role dialog.',
  ],
  a11y: [
    'Focus starts on Hide while the job runs and on Close once it ends.',
    'Escape hides a running job and closes an ended one, as the close button does.',
    'The progress inside reads as TaskProgress does: a status word, a named bar and an alert on failure.',
  ],
  tree: {
    path: ['something over the page', 'a long job the user can hide or cancel'],
    rule: 'JobDialog puts TaskProgress in a dialog whose buttons follow the state of the job.',
  },
  example: `import { useState } from 'react';
import { Button, JobDialog } from '@drizztdourden08/tessera';
import type { TaskState } from '@drizztdourden08/tessera';

const GenerateButton = ({ state, percent, cancel }: { state: TaskState; percent: number; cancel: () => void }) => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Show the run</Button>
      <JobDialog
        open={open}
        title="Generating Friday async"
        state={state}
        percent={percent}
        onHide={() => setOpen(false)}
        onCancel={cancel}
      />
    </>
  );
};
`,
  propsHash: '89e86129a5edb795',
} satisfies ComponentUsage;

export { usage };
