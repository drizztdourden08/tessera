/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A number from a range whose common values have names: the names as joined buttons, then Custom for any other number.',
  useWhen: [
    'An option is a number, but most people pick one of a few named values, such as progression balancing.',
    'The named values matter more than the exact number, and a custom number is still allowed.',
  ],
  avoidWhen: [
    { case: 'The number has no named values.', use: 'Slider' },
    { case: 'Only the named values are allowed.', use: 'SegmentedControl' },
  ],
  rules: [
    'Keep names to three or four, in the order of their values, and write each name as a word, such as Normal.',
    'Set min and max to the full range; Custom holds its number between them.',
    'Leave showValues on unless the numbers mean nothing to the user.',
  ],
  a11y: [
    'The control is a group named by its Field or FormRow label, or by aria-label.',
    'The names are the buttons of a SegmentedControl, and the custom number a NumberStepper named Custom value.',
  ],
  tree: {
    path: ['a value the user sets', 'a number with named steps'],
    rule: 'NamedRange puts the named values first and a number second, the same way in every app.',
  },
  example: `import { NamedRange } from '@drizztdourden08/tessera';

const BALANCING = [{ label: 'Disabled', value: 0 }, { label: 'Normal', value: 50 }, { label: 'Extreme', value: 99 }];

const Balancing = ({ value, onChange }: { value: number; onChange: (value: number) => void }) => (
  <NamedRange value={value} onChange={onChange} names={BALANCING} min={0} max={99} aria-label="Progression balancing" />
);
`,
  propsHash: '13c9358e5b644594',
} satisfies ComponentUsage;

export { usage };
