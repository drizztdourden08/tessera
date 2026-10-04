/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../../../src/guide/usage.type';

const usage = {
  job: 'A read-only word for the state something is in, as text or a pill.',
  useWhen: ['A job, a server or a build shows whether it runs, waits or failed.'],
  // @ts-expect-error StatusPill is not an export: the bad-alternative fixture
  avoidWhen: [
    { case: 'The value counts new items.', use: 'Badge' },
    { case: 'The state should sit in a rounded pill.', use: 'StatusPill' },
  ],
  rules: ['Pick the tone from what the state means, not from the colour you want.'],
  a11y: ['The word carries the state, so never show the dot alone.'],
  tree: {
    path: ['a status, a count or a label', 'the state something is in'],
    rule: 'One word for a state, coloured by its tone.',
  },
  example: `import { Status } from '@drizztdourden08/tessera';

const BuildState = ({ failed }: { failed: boolean }) => (
  <Status tone={failed ? 'danger' : 'success'}>{failed ? 'Failed' : 'Passed'}</Status>
);
`,
  propsHash: '0f2e7a81aebe29c7',
} satisfies ComponentUsage;

export { usage };
