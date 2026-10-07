/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'One option of a long form: its name and help on the left, its control in the middle, a changed mark and a reset at the end.',
  useWhen: [
    'A form lists many options built from a schema, such as the options of a game preset, each with a default to go back to.',
    'The user needs to see at a glance which options differ from their default.',
  ],
  avoidWhen: [
    { case: 'The row is an app setting with a live hint, compact or read only.', use: 'SettingsRow' },
    { case: 'A short form needs a label, a hint and an error around each input.', use: 'Field' },
  ],
  rules: [
    'Set changed when the value differs from its default, and pass onReset to put the default back.',
    'Write problem as what blocks the save and what to do, such as Not saved: fix the JSON first.',
    'Tag rare options with advanced, and hide them behind Show advanced in FormGroupTabs.',
    'Write the whole description: past descriptionLines lines, 2 by default, it folds behind More and Less, so the app needs no fold of its own.',
  ],
  a11y: [
    'The control gets the id, label and notes of the row, as inside a Field, so it is named by the option.',
    'A problem is an alert and marks the control invalid; Reset is named Reset and the option.',
    'More and Less is a button with aria-expanded that controls the folded text.',
  ],
  tree: {
    path: ['a value the user sets', 'one option in a long form, with a reset'],
    rule: 'FormRow lays out the name, the control, the changed mark and the reset of an option the same way in every app.',
  },
  example: `import { FormRow, Slider } from '@drizztdourden08/tessera';
import type { ScaleLabelEntry } from '@drizztdourden08/tessera';

const BALANCING: ScaleLabelEntry[] = [[0, 'Disabled'], [50, 'Normal'], [99, 'Extreme']];

const BalancingRow = ({ value, onChange }: { value: number; onChange: (value: number) => void }) => (
  <FormRow label="Progression Balancing" description="Moves progression earlier." changed={value !== 50} onReset={() => onChange(50)}>
    <Slider value={value} onChange={onChange} min={0} max={99} labels={BALANCING} input />
  </FormRow>
);
`,
  propsHash: 'b5fe52025eb352f7',
} satisfies ComponentUsage;

export { usage };
