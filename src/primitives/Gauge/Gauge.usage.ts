/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A small round meter that shows one value against its limit, coloured by the zone the value is in.',
  useWhen: [
    'A load, a temperature or a fill level reads best as a share of its maximum, such as CPU use.',
    'A panel shows a few such readings side by side and each needs its own colour for good, warning and danger.',
  ],
  avoidWhen: [
    { case: 'Progress toward the end of a task, such as a download.', use: 'ProgressRing' },
    { case: 'The history of a reading matters more than where it sits now.', use: 'Sparkline' },
  ],
  rules: [
    'Pass min and max when the range is not 0 to 100, and a unit for the value in the middle.',
    'Leave tone out so the zone sets it; set thresholds when the default edges at 60% and 85% do not fit.',
    'Put the danger edge below the warning edge for a reading where low is bad, such as frame rate.',
    'Pick sm for a dense row, md for a panel and lg for a page about that one reading.',
  ],
  a11y: [
    'It is a meter: a screen reader hears its label, its value with the unit, and its bounds.',
    'Without a label it is named Meter; give each gauge a label so they can be told apart.',
  ],
  tree: {
    path: ['data', 'a chart', 'one value against its limit'],
    rule: 'Gauge shows where one reading sits between its bounds, in the tone of its zone.',
  },
  example: `import { Gauge } from '@drizztdourden08/tessera';

const CpuGauge = ({ load }: { load: number }) => <Gauge value={load} unit="%" label="CPU" zones />;
`,
  propsHash: '80a6706e93fdb143',
} satisfies ComponentUsage;

export { usage };
