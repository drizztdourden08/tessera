/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../../../src/ai/usage.type';

const usage = {
  job: 'A row of separate buttons, spaced by a token gap and aligned to one end.',
  useWhen: [
    'A dialog, a form or a panel ends with its decisions, such as Cancel and Save.',
    'A few unrelated actions sit in a line under some content.',
  ],
  avoidWhen: [
    { case: 'The buttons act on one thing and read as one tool.', use: 'ButtonGroup' },
    { case: 'Only one of the options can be on.', use: 'SegmentedControl' },
    { case: 'The row holds more than buttons and needs its own alignment.', use: 'Flex' },
  ],
  rules: [
    'The main action comes last, at the end the row aligns to.',
    'Keep one primary button per row.',
    'Change the spacing through the gap prop, never with margins on the buttons.',
    'Set align="start" or align="between" only when the layout around the row asks for it.',
  ],
  a11y: [
    'Focus moves through the buttons in source order, so write them in reading order.',
    'The row adds no role. Related controls that form one tool belong in a ButtonGroup with an aria-label.',
  ],
  tree: {
    path: ['actions', 'several related buttons', 'separate decisions, with space between'],
    rule: 'Separate decisions in one row, with a gap between them.',
  },
  example: `import { Button, ButtonRow } from '@drizztdourden08/tessera';

const DialogActions = ({ onCancel, onSave }: { onCancel: () => void; onSave: () => void }) => (
  <ButtonRow>
    <Button onClick={onCancel}>Cancel</Button>
    <Button variant="primary" onClick={onSave}>Save</Button>
  </ButtonRow>
);
`,
  propsHash: '35bee83bf1368908',
} satisfies ComponentUsage;

export { usage };
