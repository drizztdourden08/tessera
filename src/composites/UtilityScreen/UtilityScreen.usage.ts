/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A compact screen for one short task, laid out as the rotp update dialog: the window header shows the status with a spinner or a tone icon and the close button, then one column with a centred message, settings, details, a framed notes box and progress, then a report button over a rule and the actions.',
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
    'The status is the header at the top of the window, with the close button at its end: status.title is its title and names the window, and the tone picks its icon. There is no card inside the window.',
    'Set status.tone to busy while the task runs; it shows a spinner in place of the icon. Use status.icon for a closer icon, such as a download arrow.',
    'Write the status title as the state, such as Update available, and the message as one short line, such as the version.',
    'When the task fails, pass the raw error in status.error: it waits behind Details under the message.',
    'Mark the action that tries a failed task again with retry, so it shows as a RetryButton with the label of the action.',
    'Put choices that shape the task, such as a pre-release toggle or a version picker, in settings, not in the children.',
    'Put long text, such as release notes, in notes: a framed box with its own scroll.',
    'Set progress only when the task can say how far it is.',
    'Pass report to offer a way to report a problem: one red bug icon button over a rule, with report.footnote as a short line beside it.',
    'Put the main action last in actions, with tone primary, and keep one primary action.',
    'In a narrow or short window the card fills the room: the body scrolls, and the footer with the actions stays in view.',
  ],
  a11y: [
    'The status title and the message are live regions: a screen reader reads each new one.',
    'The report button is named Report an issue from the strings, and shows the same words in a tooltip.',
    'The card is a modal dialog named by the status title.',
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
    onClose={onClose}
    status={{ tone: 'info', icon: <Icon name="download" />, title: 'Update available', message: <>Version <Strong>0.10.0</Strong> is available</> }}
    notes={{ title: 'What is new in 0.10.0', children: notes }}
    report={{ onSelect: onReport, footnote: 'Any earlier version can be picked above if something stops working.' }}
    actions={[
      { label: 'Later', tone: 'tertiary', onSelect: onClose },
      { label: 'Install', tone: 'primary', onSelect: onInstall },
    ]}
  />
);
`,
  propsHash: '55c8ccffeed3e8b7',
} satisfies ComponentUsage;

export { usage };
