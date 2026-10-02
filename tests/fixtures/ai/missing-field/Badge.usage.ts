/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../../../src/ai/usage.type';

const usage = {
  job: 'A count or a dot, after a word or on the corner of an icon.',
  useWhen: ['A tab, a menu entry or an icon shows how many new items wait.'],
  avoidWhen: [{ case: 'The text names a state, such as Running or Failed.', use: 'Status' }],
  rules: ['Cap long counts with max, so 120 reads as 99+.'],
  tree: {
    path: ['a status, a count or a label', 'a count, or a dot for news'],
    rule: 'A number or a dot that says there is something new.',
  },
  example: `import { Badge } from '@drizztdourden08/tessera';

const Unread = ({ count }: { count: number }) => <Badge value={count} max={99} />;
`,
  propsHash: 'b2fb9bfd90236764',
// @ts-expect-error a11y is left out on purpose: the missing-field fixture
} satisfies ComponentUsage;

export { usage };
