/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../ai/usage.type';

const usage = {
  job: 'A compact screen for one short task: the page header shows the status with a spinner or a tone icon, then a centred message, settings, details, a framed notes box, progress, and a footer with a report button and the actions.',
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
    'The status is the page header, which every screen kind shows and nothing turns off: status.title is its title and the tone picks its icon.',
    'Set status.tone to busy while the task runs; it shows a spinner in place of the icon. Use status.icon for a closer icon, such as a download arrow.',
    'Write the status title as the state, such as Update available, and the message as one short line, such as the version.',
    'Put choices that shape the task, such as a pre-release toggle or a version picker, in settings, not in the children.',
    'Put long text, such as release notes, in notes: a framed box with its own scroll.',
    'Set progress only when the task can say how far it is.',
    'Pass report to offer a way to report a problem; it is one red bug icon button, never a bar of text.',
    'Put the main action last in actions, with variant primary, and keep one primary action.',
  ],
  a11y: [
    'The status title and the message are live regions: a screen reader reads each new one.',
    'The report button is named Report an issue from the strings, and shows the same words in a tooltip.',
    'The card is a modal dialog named by the title.',
  ],
  tree: {
    path: ['a full screen view', 'one short task with a status, such as an update check'],
    rule: 'A status, details and actions in a compact window.',
  },
  example: `import { Icon, Strong, UtilityScreen } from '@drizztdourden08/tessera';

interface UpdateCheckProps {
  notes: string;
  onClose: () => void;
  onInstall: () => void;
  onReport: () => void;
}

const UpdateCheck = ({ notes, onClose, onInstall, onReport }: UpdateCheckProps) => (
  <UtilityScreen
    title="Check for updates"
    onClose={onClose}
    status={{ tone: 'info', icon: <Icon name="download" />, title: 'Update available', message: <>Version <Strong>0.10.0</Strong> is available</> }}
    notes={{ title: 'What is new in 0.10.0', children: notes }}
    report={{ onClick: onReport }}
    actions={[
      { label: 'Later', variant: 'ghost', onClick: onClose },
      { label: 'Install', variant: 'primary', onClick: onInstall },
    ]}
  />
);
`,
  propsHash: '8cfef9ecf566f7fb',
} satisfies ComponentUsage;

export { usage };
