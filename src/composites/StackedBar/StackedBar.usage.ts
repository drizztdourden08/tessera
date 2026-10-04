/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'One horizontal bar split into the parts of a whole, such as memory by process, with a tooltip and a legend.',
  useWhen: [
    'A total is shared by a few named parts and the reader compares their sizes, such as memory or disk use.',
    'A count of jobs splits by status, each part in its status tone.',
  ],
  avoidWhen: [
    { case: 'One value toward an end, with nothing to split.', use: 'ProgressBar' },
    { case: 'Rows of exact figures the reader sorts and filters.', use: 'DataTable' },
  ],
  rules: [
    'Give each segment a stable id, so a live bar keeps its parts in place from one update to the next.',
    'Set limit to the parts worth naming; the smallest beyond it join one Other part.',
    'Pass total when the parts do not fill the whole, so the room left shows as free track.',
    'Use status tones when the parts are states and tag colours when they are names; leave color out to cycle the tag colours.',
  ],
  a11y: [
    'With a label, the bar is an image named with every part and its value.',
    'The legend lists each part as text, so the values never live only in a tooltip.',
  ],
  tree: {
    path: ['data', 'a chart', 'a whole split into parts'],
    rule: 'StackedBar shows how one total splits into named parts, in a single bar.',
  },
  example: `import { StackedBar } from '@drizztdourden08/tessera';

const gigabytes = (value: number) => \`\${value.toFixed(1)} GB\`;

const MemoryBar = () => (
  <StackedBar
    segments={[{ id: 'game', label: 'Game', value: 4.2 }, { id: 'browser', label: 'Browser', value: 1.8 }]}
    total={16}
    legend
    label="Memory"
    format={gigabytes}
  />
);
`,
  propsHash: '344a6c4a1bf04399',
} satisfies ComponentUsage;

export { usage };
