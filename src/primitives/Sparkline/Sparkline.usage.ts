/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A small line or area chart of the latest samples, so a reader sees which way a value moves at a glance.',
  useWhen: [
    'A live reading, such as frame rate or download speed, needs its recent history beside the number.',
    'A tile or a row has room for a trend but not for a full chart with axes.',
  ],
  avoidWhen: [
    { case: 'The number and its change matter more than the shape, in a tile of its own.', use: 'StatTile' },
    { case: 'One value against its limit, with no history.', use: 'Gauge' },
  ],
  rules: [
    'Pass the samples newest last, and set length to the window, so a new series fills in from the right.',
    'Fix min and max for a reading with known bounds, such as a percentage; leave them out to follow the samples.',
    'Use band for the zone that matters, such as a warning above 80, and dot to mark where the latest sample sits.',
    'Give it a width and height, or a box to fill; it is 32 px tall when nothing sets its height.',
  ],
  a11y: [
    'It is hidden from screen readers unless it has a label, since the number beside it usually says the same.',
    'With a label, a screen reader hears the name with the latest, lowest and highest sample.',
  ],
  tree: {
    path: ['data', 'a chart', 'a trend over recent samples'],
    rule: 'Sparkline draws the recent samples of one reading as a line or an area, with no axes.',
  },
  example: `import { Sparkline } from '@drizztdourden08/tessera';

const FrameRateTrend = ({ samples }: { samples: readonly number[] }) => (
  <Sparkline values={samples} length={40} min={0} max={165} band={{ from: 0, to: 60, tone: 'danger' }} tone="success" dot label="Frame rate" />
);
`,
  propsHash: '6aa00edc7d0ba954',
} satisfies ComponentUsage;

export { usage };
