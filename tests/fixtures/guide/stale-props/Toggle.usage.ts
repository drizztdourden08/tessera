/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../../../src/guide/usage.type';

const usage = {
  job: 'A switch for a setting that applies the moment it flips.',
  useWhen: ['A setting takes effect at once, with no Save button.'],
  avoidWhen: [{ case: 'The choice is sent with the rest of a form.', use: 'Checkbox' }],
  rules: ['Label the setting, not the action: Sound effects, not Turn on sound.'],
  a11y: ['Give it a label, or an aria-label when the label sits elsewhere.'],
  tree: {
    path: ['a value the user sets', 'on or off', 'at once'],
    rule: 'A setting that applies the moment it flips.',
  },
  example: `import { Toggle } from '@drizztdourden08/tessera';

const SoundSetting = ({ on, onFlip }: { on: boolean; onFlip: (next: boolean) => void }) => (
  <Toggle label="Sound effects" checked={on} onChange={onFlip} />
);
`,
  propsHash: '0000000000000000',
} satisfies ComponentUsage;

export { usage };
