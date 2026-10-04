/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../../../src/guide/usage.type';

const usage = {
  job: 'One on or off choice with its label, sent with the form around it.',
  useWhen: ['A form asks a yes or no question that applies on submit.'],
  avoidWhen: [{ case: 'The setting applies the moment it changes.', use: 'Toggle' }],
  rules: ['Word the label so that checked means yes.'],
  a11y: ['Without a visible label, set ariaLabel.'],
  tree: {
    path: ['a value the user sets', 'on or off', 'when the form is sent'],
    rule: 'A yes or no that waits for the form to be sent.',
  },
  example: `import { Checkbox } from '@drizztdourden08/tessera';

const Terms = ({ agreed, onAgree }: { agreed: boolean; onAgree: (next: boolean) => void }) => (
  <Checkbox label="I agree" ticked={agreed} onChange={onAgree} />
);
`,
  propsHash: 'c6d24f385a779643',
} satisfies ComponentUsage;

export { usage };
