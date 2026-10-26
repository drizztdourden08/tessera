/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A running log, such as a server log or a simulation trace, in one framed box with search, filters, a line count and Copy all.',
  useWhen: [
    'Lines arrive over time and the user reads, searches and filters them, such as a server log or the trace of a run.',
    'The user picks some lines to copy or act on, such as the lines to attach to a bug report.',
  ],
  avoidWhen: [
    { case: 'The rows have columns to sort and resize.', use: 'DataTable' },
    { case: 'A job shows its steps, with a short log under them.', use: 'TaskProgress' },
    { case: 'The text is code or a fixed block to read and copy.', use: 'CodeBlock' },
  ],
  rules: [
    'Give each row a stable id: the window, the new line behaviour and the selection all follow it.',
    'Pass kinds with a tone per type: a text tone, a tag tint such as teal, or an app hex colour, lifted until it reads.',
    'A line takes the tone of its kind; set tone on one row to colour that line alone, with or without a kind.',
    'Set toneMessage to colour the message in the same tone, as for errors, or to a tone of its own, such as dim.',
    'Set strong on a kind whose messages mark a step, such as a session that starts, and uppercase to set them in capitals.',
    'Pass selectedIds with onSelectionChange to let the user pick rows; the app holds the set and copies or acts on it.',
    'Put the action on the picked rows in toolbarExtra, such as Copy selected or Report these lines, beside the line count.',
    'Set ansi for lines that carry colour codes, such as a build or process output; other escape codes are stripped, never drawn.',
    'ansi draws the sixteen colours, bold, dim, italic and underline; 256 and true colour map to the nearest of the sixteen.',
    'Follow is on: the view stays at the end while lines arrive, and a scroll up stops it until Jump to bottom is pressed.',
    'Set order="newest-first" to show the latest line at the top; follow then sticks to the top and Jump to top returns to it.',
    'Set follow={false} to leave the view where the reader put it; set onInput to add a prompt row for a process that reads lines.',
    'onInput gets each line on Enter; Up and Down walk the lines sent. Echo the line back as a row yourself.',
    'Return false, or a promise that resolves false or rejects, to keep the text in the field and out of the history; true or nothing clears it.',
    'While a returned promise is pending a second Enter is ignored, so one line is never sent twice.',
    'Set inputDisabled to show the row with a disabled field even when onInput is absent, and inputPlaceholder to say why, such as This run has no input.',
    'Pass height="fill" inside a box that sets the height, or a number for a fixed height in pixels.',
  ],
  a11y: [
    'Without a selection the log is one focusable region that the arrow keys scroll.',
    'With selectedIds the rows are options of a listbox: Up and Down move the pick, Shift extends it, and a click with Shift picks the rows between.',
    'The input row is a labelled text field; the prompt mark is hidden from screen readers.',
    'Each time cell carries the review mask, so screenshots of a running log compare run to run.',
  ],
  tree: {
    path: ['data', 'a stream of log lines'],
    rule: 'LogPanel shows a running log with search, filters, the newest lines first in view and rows the user can pick.',
  },
  example: `import { Button, LogPanel } from '@drizztdourden08/tessera';
import type { LogRow } from '@drizztdourden08/tessera';
import { useState } from 'react';

const ServerLog = ({ rows, onReport }: { rows: readonly LogRow[]; onReport: (lines: readonly LogRow[]) => void }) => {
  const [selected, setSelected] = useState<ReadonlySet<string>>(new Set());
  const picked = rows.filter((row) => selected.has(row.id));
  return (
    <LogPanel
      rows={rows}
      kinds={[{ id: 'error', label: 'Errors', tone: 'danger', toneMessage: true }]}
      selectedIds={selected}
      onSelectionChange={setSelected}
      toolbarExtra={<Button size="sm" disabled={picked.length === 0} onClick={() => onReport(picked)}>Report these lines</Button>}
      height="fill"
    />
  );
};
`,
  propsHash: '40ec5e2accbaae1b',
} satisfies ComponentUsage;

export { usage };
