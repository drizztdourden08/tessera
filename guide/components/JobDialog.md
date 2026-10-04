# JobDialog

A long job in a dialog: its TaskProgress, with Cancel and Hide while it runs and Close once it ends.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { JobDialog } from '@drizztdourden08/tessera';
```

The source is `src/composites/JobDialog/JobDialog.tsx`. Its gallery page is Composites · Dialogs/JobDialog (`#/story/composites-jobdialog--overview`).

## Where the questions lead here

What are you placing? Something over the page. What sits over the page? A long job the user can hide or cancel.

JobDialog puts TaskProgress in a dialog whose buttons follow the state of the job.

## Use it when

- The user starts a long job, such as a generation, an install or an update, and should see it run.
- The user may hide the job and go on working, then come back to it.

## Use something else when

- The progress belongs in a page or a panel, not over it. Use [TaskProgress](TaskProgress.md) instead.
- The dialog asks a question and waits for the answer. Use `Dialog` instead.

## Rules

- Name the job in the title, such as Generating Friday async, and keep it while the job runs.
- Keep the job running when the dialog hides, and give the user a way back to it, such as a button with the percent.
- Pass onCancel only when the job can stop; set cancelling while it stops.
- Add Try again through actions after a failure, beside Close.

## Accessibility

- Focus starts on Hide while the job runs and on Close once it ends.
- Escape hides a running job and closes an ended one, as the close button does.
- The progress inside reads as TaskProgress does: a status word, a named bar and an alert on failure.

## Example

```tsx
import { useState } from 'react';
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
```

## Props

- `open`: `boolean`.
- `title`: `ReactNode`.
- `onHide`: `() => void`.
- `onCancel` (optional): `() => void`.
- `onClose` (optional): `() => void`. Default `onHide`.
- `cancelling` (optional): `boolean`. Default `false`.
- `actions` (optional): `ReactNode`.
- `className` (optional): `string`.
- `line` (optional): `ReactNode`.
- `state`: `TaskState`, one of `'running'`, `'done'`, `'failed'`, `'cancelled'`.
- `percent` (optional): `number`.
- `steps` (optional): `readonly StepperStep[]`.
- `currentId` (optional): `string`.
- `error` (optional): `ReactNode`.
- `log` (optional): `readonly LogRow[]`.
- `logKinds` (optional): `readonly LogKindDef[]`.
- `logOpen` (optional): `boolean`.
- `onLogToggle` (optional): `(open: boolean) => void`.
- `logHeight` (optional): `number`.
- `label` (optional): `string`.

## Tokens

It draws on `--dialog-w-md`.
