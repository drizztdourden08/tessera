/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A small tile with one headline number: its name, the value with a unit, how it moved, and an optional chart.',
  useWhen: [
    'A dashboard or a widget shows a few key readings, each with its change since the last one.',
    'A reading needs its trend drawn beside it, such as frame rate with a Sparkline.',
  ],
  avoidWhen: [
    { case: 'A plain label and value on one line, with no trend or chart.', use: 'StatRow' },
    { case: 'One value against its limit, as a round meter.', use: 'Gauge' },
  ],
  rules: [
    'Set trend from the change, and upIs from what a rise means: good for frame rate, bad for frame time.',
    'Keep delta short, such as +4 or -2.1, and leave the unit to the unit prop.',
    'Pass a Sparkline as chart, below the value in a narrow tile and beside it in a wide one.',
    'Use tone on the value only when the reading is past its limit.',
  ],
  a11y: [
    'The trend arrow is named Rising, Falling or Steady, so a screen reader hears the direction with the delta.',
    'The label, value and unit are plain text read in order; the chart speaks only when it has a label.',
  ],
  tree: {
    path: ['data', 'a chart', 'a headline number with its trend'],
    rule: 'StatTile puts one reading, its change and its trend together in a tile sized for a widget grid.',
  },
  example: `import { Sparkline, StatTile } from '@drizztdourden08/tessera';

const FrameRateTile = ({ samples }: { samples: readonly number[] }) => (
  <StatTile
    label="Frame rate"
    value={samples[samples.length - 1] ?? 0}
    unit="fps"
    delta="+4"
    trend="up"
    chart={<Sparkline values={samples} min={0} max={165} tone="success" dot />}
  />
);
`,
  propsHash: '6230fa9a39dc2c2e',
} satisfies ComponentUsage;

export { usage };
