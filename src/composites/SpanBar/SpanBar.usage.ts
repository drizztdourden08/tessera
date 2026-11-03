/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A bar over a row of cells that the user drags to move, stretches from either end and moves with the keys, with a lane to draw a new one.',
  useWhen: [
    'A range of cells is edited in place, such as the frames an animation clip covers.',
    'The cells are equal, or have different widths such as frames with different hold times.',
  ],
  avoidWhen: [
    { case: 'The user picks one cell, not a range.', use: 'ScrubRuler' },
    { case: 'The range is a number between two limits, with no row of cells behind it.', use: 'Slider' },
  ],
  rules: [
    'Pass the same cells to every bar and ruler of a row, so they line up for any cell widths.',
    'Keep start and end in the parent and write them back from onChange, which fires once when a drag ends.',
    'Use onDraft to follow a drag in progress, such as a preview; it gets null when the drag is cancelled.',
    'Wrap the bars in a SpanLane when the user may draw a new span, and add it from onCreate.',
    'Pass announce so the range is read after each key step, and label so the bar has a name.',
    'Set readOnly to keep the bar focusable and block every change.',
  ],
  a11y: [
    'The bar is a button with a name; Enter activates it.',
    'Alt + Shift + Left and Right move the end, and Alt + Ctrl + Left and Right move the whole span.',
    'Each key step is announced through announce, such as Cells 3 to 6.',
    'Escape cancels a drag, and the bar keeps a 24 pixel minimum size for touch.',
  ],
  tree: {
    path: ['a value the user sets', 'a range'],
    rule: 'SpanBar edits a range of cells on a row, where Slider edits a number between two limits.',
  },
  example: `import { SpanBar, SpanLane } from '@drizztdourden08/tessera';
import type { CellGeometry, CellSpan } from '@drizztdourden08/tessera';

const ClipRow = ({ cells, span, setSpan }: { cells: CellGeometry; span: CellSpan; setSpan: (span: CellSpan) => void }) => (
  <SpanLane cells={cells} label="Frames">
    <SpanBar start={span.start} end={span.end} cells={cells} onChange={setSpan} label="Walk" colour="blue">
      Walk
    </SpanBar>
  </SpanLane>
);
`,
  propsHash: '811dd36755c5e7d2',
} satisfies ComponentUsage;

export { usage };
