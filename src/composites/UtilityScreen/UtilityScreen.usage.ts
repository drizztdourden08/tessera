/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../ai/usage.type';

const usage = {
  job: 'A compact screen for one short task: a status with an icon or a spinner, optional progress, settings and details, a footnote bar and a row of actions.',
  useWhen: [
    'The app checks for updates, imports a file or tests a connection, and shows how it went.',
    'The task has a few states, each with its own title, message and actions.',
  ],
  avoidWhen: [
    { case: 'The user answers one question and nothing runs.', use: 'Dialog' },
    { case: 'The screen holds settings or several pages.', use: 'WorkspaceScreen' },
    { case: 'The screen is read, such as About or credits.', use: 'InfoScreen' },
    { case: 'The screen is one big custom surface.', use: 'StageScreen' },
  ],
  rules: [
    'Set status.tone to busy while the task runs; it shows a spinner in place of the icon.',
    'Write the status title as the state, such as You are up to date, and the message as what it means or what to do.',
    'Put the main action last in actions, with variant primary, and keep one primary action.',
    'Set progress only when the task can say how far it is.',
    'Put choices that shape the task, such as a pre-release toggle or a version picker, in settings, not in the children.',
    'Use footnote for fine print that stays in view, with an action at its end such as a button to report an issue.',
  ],
  a11y: [
    'The status is a live region: a screen reader reads each new title and message.',
    'The card is a modal dialog named by the title.',
  ],
  tree: {
    path: ['a full screen view', 'one short task with a status, such as an update check'],
    rule: 'A status, details and actions in a compact window.',
  },
  example: `import { Button, UtilityScreen } from '@drizztdourden08/tessera';

const UpdateCheck = ({ onClose, onInstall }: { onClose: () => void; onInstall: () => void }) => (
  <UtilityScreen
    title="Check for updates"
    onClose={onClose}
    status={{ tone: 'info', title: 'Version 0.10.0 is ready', message: 'You have 0.9.2.' }}
    footnote={{ text: 'Please report anything that stops working.', action: <Button size="sm" variant="secondary">Report an issue</Button> }}
    actions={[
      { label: 'Later', variant: 'ghost', onClick: onClose },
      { label: 'Install', variant: 'primary', onClick: onInstall },
    ]}
  />
);
`,
  propsHash: '5c5caab09961b13b',
} satisfies ComponentUsage;

export { usage };
