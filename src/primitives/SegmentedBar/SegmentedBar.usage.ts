/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'One bar of equal segments with a gap between them, each in its own colour, with a tooltip per segment and no text inside.',
  useWhen: [
    'A run of steps or checks is shown as one segment each, such as passed, failed and pending.',
    'The whole bar opens a detail view when pressed.',
  ],
  avoidWhen: [
    { case: 'The parts differ in size and share a total.', use: 'StackedBar' },
    { case: 'One value toward an end, with nothing to split.', use: 'ProgressBar' },
  ],
  rules: [
    'Give every segment a tone and a label; the label is its tooltip.',
    'Use status tones when segments are states, tag colours when they are names, and track for a segment not reached yet.',
    'Give the bar a label that names the whole, since the segments hold no text.',
    'Pass onClick only when the whole bar does something; it then acts as one button, with Enter and Space too.',
  ],
  a11y: [
    'The bar is a group named by its label, or a button named by it when onClick is set.',
    'A tooltip is not the only place a state may live; keep the same facts in text near the bar.',
  ],
  tree: {
    path: ['data', 'a chart', 'progress in equal segments'],
    rule: 'SegmentedBar shows a run of equal steps, each in its own colour, in a single bar.',
  },
  example: `import { SegmentedBar } from '@drizztdourden08/tessera';

const RunBar = () => (
  <SegmentedBar
    label="Checks"
    segments={[{ tone: 'success', label: 'Lint passed' }, { tone: 'danger', label: 'Tests failed' }, { tone: 'track', label: 'Build pending' }]}
  />
);
`,
  propsHash: 'a1e71a5d7caef083',
} satisfies ComponentUsage;

export { usage };
