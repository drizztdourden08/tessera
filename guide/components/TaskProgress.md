# TaskProgress

The progress of one long job: a bar, the current line, its steps, the error when it fails and its log, folded.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { TaskProgress } from '@drizztdourden08/tessera';
```

The source is `src/composites/TaskProgress/TaskProgress.tsx`. Its gallery page is Composites · Content/TaskProgress (`#/story/composites-taskprogress--overview`).

## Where the questions lead here

What are you placing? Feedback. What are you telling the user? A long job with steps, a log or a failure.

TaskProgress draws a bar, the steps, the failure and the log of one job the same way in every app.

## Use it when

- A job runs for seconds or minutes, such as a generation, an engine setup or a download, and the user waits on it.
- The job has named steps, writes output lines, or can fail with a message the user must read.

## Use something else when

- The job should sit in a dialog the user can hide or cancel. Use [JobDialog](JobDialog.md) instead.
- Only a bar is needed, with no line, steps or log. Use `ProgressBar` instead.
- The user walks through the steps and picks when to go on. Use `Wizard` instead.

## Rules

- Pass percent only when the job knows it; leave it out and the running bar sweeps.
- Write the line as what happens now, such as Downloading Python: 31 of 84 MB, and update it as the job moves.
- Pass the error as a sentence that says what failed and what to do; it shows once the state is failed.
- Keep every output line in log, so the user can read why a job failed.

## Accessibility

- The section is named by label, and the bar by the same name.
- The state word is a status region, so a screen reader hears Done, Failed or Cancelled when it changes.
- The error is an alert, and the log toggle says whether the log is open.

## Example

```tsx
import { TaskProgress } from '@drizztdourden08/tessera';
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
```

## Props

- `state`: `TaskState`, one of `'running'`, `'done'`, `'failed'`, `'cancelled'`.
- `percent` (optional): `number`.
- `line` (optional): `ReactNode`.
- `steps` (optional): `readonly StepperStep[]`.
- `currentId` (optional): `string`.
- `error` (optional): `ReactNode`.
- `log` (optional): `readonly LogRow[]`.
- `logKinds` (optional): `readonly LogKindDef[]`.
- `logOpen` (optional): `boolean`.
- `onLogToggle` (optional): `(open: boolean) => void`.
- `logHeight` (optional): `number`. Default `LOG_HEIGHT`.
- `label` (optional): `string`.
- `actions` (optional): `ReactNode`.
- `className` (optional): `string`.

## Tokens

It draws on `--c-text-dim`, `--space-md`, `--space-sm`, `--space-xs`, `--text-sm`.
