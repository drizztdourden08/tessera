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
    'Pass kinds with a tone per type; toneMessage colours the message too, as for errors.',
    'Set strong on a kind whose messages mark a step, such as a session that starts; they draw in semibold.',
    'Pass selectedIds with onSelectionChange to let the user pick rows; the app holds the set and copies or acts on it.',
    'Put the action on the picked rows in toolbarExtra, such as Copy selected or Report these lines, beside the line count.',
    'Pass height="fill" inside a box that sets the height, or a number for a fixed height in pixels.',
  ],
  a11y: [
    'Without a selection the log is one focusable region that the arrow keys scroll.',
    'With selectedIds the rows are options of a listbox: Up and Down move the pick, Shift extends it, and a click with Shift picks the rows between.',
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
  propsHash: '51728d1123a811b8',
} satisfies ComponentUsage;

export { usage };
