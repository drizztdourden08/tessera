/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A ruler over a row of cells that the user drags along to move the current cell, with markers, a range band and ticks.',
  useWhen: [
    'The user scrubs through frames, steps or time and one cell is current.',
    'Markers such as a hit frame, or a range of cells to loop, sit on the same ruler.',
  ],
  avoidWhen: [
    { case: 'A range of cells is moved or stretched as one piece.', use: 'SpanBar' },
    { case: 'The value is a plain number with no cells behind it.', use: 'Slider' },
  ],
  rules: [
    'Pass the same cells as the SpanBar rows below it, so the ticks line up with the bars.',
    'Keep value, markers and band in the parent and write them back from onChange, onMarkerChange and onBandChange.',
    'Give every marker an id, a label and the min and max it may be dragged between.',
    'Leave tickEvery on auto unless the ticks must fall on a fixed step; tickLabel writes the text of each tick.',
    'Set readOnly to keep the ruler focusable and block every change.',
  ],
  a11y: [
    'The track is a slider with a value text such as Frame 4 of 16.',
    'Arrows step one cell, Page Up and Page Down step ten, Home and End jump to the ends.',
    'Each marker is a slider of its own with its label, moved by the same keys.',
    'A clear button removes the band and has a name.',
  ],
  tree: {
    path: ['a value the user sets', 'a range'],
    rule: 'ScrubRuler sets one current cell on a row of cells, with markers and a band, where SpanBar sets a range of cells.',
  },
  example: `import { ScrubRuler } from '@drizztdourden08/tessera';
import type { CellGeometry } from '@drizztdourden08/tessera';

const Timeline = ({ cells, frame, setFrame }: { cells: CellGeometry; frame: number; setFrame: (index: number) => void }) => (
  <ScrubRuler cells={cells} value={frame} onChange={setFrame} label="Frames" />
);
`,
  propsHash: 'debbcfcf9039f706',
} satisfies ComponentUsage;

export { usage };
