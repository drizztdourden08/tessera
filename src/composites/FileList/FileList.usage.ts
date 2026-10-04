/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'The files a job made or an app keeps, one row each with its type icon, name, size and date, and buttons to open it or show it in its folder.',
  useWhen: [
    'A job writes output files the user opens next, such as a generated seed, a spoiler log or a save.',
    'A report or a settings page lists log files or attachments the user may open or find on disk.',
  ],
  avoidWhen: [
    { case: 'Many files to sort, filter or pick from.', use: 'DataTable' },
    { case: 'Rows that are not files, with their own columns and action.', use: 'ListItemRow' },
    { case: 'One path the user reads or copies.', use: 'CopyValue' },
  ],
  rules: [
    'Pass size in bytes and modified in milliseconds; the list writes them, so every app shows them the same way.',
    'Pass onOpen and onReveal when the app can open the file and its folder; leave them out and the buttons go.',
    'Write empty as why there is nothing yet and when files will show, such as once the seed is generated.',
    'Give a file an icon only for a type of the app, such as a save file; common types take theirs from the extension.',
  ],
  a11y: [
    'The list is named by label, Files by default, and each file is a list item.',
    'The buttons are named after the file, such as Open server.log and Show server.log in its folder, with a tooltip.',
    'The date is a time element with its full timestamp.',
  ],
  tree: {
    path: ['data', 'files, with their size, date, open and reveal'],
    rule: 'FileList gives every file the same row, with the size, the date and the two ways to reach it.',
  },
  example: `import { FileList } from '@drizztdourden08/tessera';
import type { FileEntry } from '@drizztdourden08/tessera';

interface RunOutputProps {
  files: FileEntry[];
  openPath: (path: string) => void;
  showInFolder: (path: string) => void;
}

const RunOutput = ({ files, openPath, showInFolder }: RunOutputProps) => (
  <FileList
    label="Output"
    files={files}
    onOpen={openPath}
    onReveal={showInFolder}
    empty="No output files yet. They show here once the seed is generated."
  />
);
`,
  propsHash: 'bc5a31f321c1427e',
} satisfies ComponentUsage;

export { usage };
