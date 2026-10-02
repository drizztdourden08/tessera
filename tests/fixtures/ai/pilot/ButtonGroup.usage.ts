/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../../../src/ai/usage.type';

const usage = {
  job: 'Buttons joined into one control with shared borders, for peer actions on one thing.',
  useWhen: [
    'Two to five buttons act on the same thing and read as one tool, such as undo and redo.',
    'A toolbar groups its actions by subject, one group per subject.',
    'Buttons and icon buttons mix in one tool.',
  ],
  avoidWhen: [
    { case: 'Only one of the buttons can be on at a time.', use: 'SegmentedControl' },
    { case: 'Each button turns its own setting on or off.', use: 'ToggleGroup' },
    { case: 'The buttons are separate decisions, such as Cancel and Save.', use: 'ButtonRow' },
    { case: 'There are too many actions to show, or most of them are secondary.', use: 'DropdownMenu' },
  ],
  rules: [
    'Give every button in the group the same variant and size.',
    'The children are Button or IconButton only. The group joins their borders.',
    'Use orientation="vertical" for a column of tools, such as a side toolbar.',
    'Never put a gap or a margin between the buttons. The shared border is what makes them one tool.',
  ],
  a11y: [
    'Give the group an aria-label that names the tool, such as "History".',
    'The group renders role="group", so a screen reader announces its buttons together.',
    'Each IconButton inside still needs its own label.',
  ],
  tree: {
    path: ['actions', 'several related buttons', 'peer actions on one thing, read as one tool'],
    rule: 'Peer actions joined into one tool by shared borders.',
  },
  example: `import { Button, ButtonGroup } from '@drizztdourden08/tessera';

const HistoryTool = ({ onUndo, onRedo }: { onUndo: () => void; onRedo: () => void }) => (
  <ButtonGroup aria-label="History">
    <Button onClick={onUndo}>Undo</Button>
    <Button onClick={onRedo}>Redo</Button>
  </ButtonGroup>
);
`,
  propsHash: 'aca3533bf8447fca',
} satisfies ComponentUsage;

export { usage };
