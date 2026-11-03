/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'One option of a randomizer or game preset: its name, tag and description on the left, its control in the middle, and an optional cell at the end.',
  useWhen: [
    'A list of game options needs rows that show locked, forced and changed options the same way in every app.',
    'The row has an extra cell at the end, such as the effect of the option on the item pool.',
  ],
  avoidWhen: [
    { case: 'The option comes from a schema and its control is laid out by the form.', use: 'FormRow' },
    { case: 'The row is an app setting with a live hint.', use: 'SettingsRow' },
  ],
  rules: [
    'Pass the control you want as control: a Toggle, a Select, a Slider or a ValueTag. The row does not pick it for you.',
    'Set locked for an option the user cannot change; the row dims.',
    'Set forced with note when another option overrides this one; the row stays at full strength and the note shows in the danger tone.',
    'Set changed when the value differs from its default, and pass onReset to show the reset button after the name.',
    'Pass tag for a short word after the name and aside for the cell at the end of the row.',
  ],
  a11y: [
    'The reset button is named Reset and the option, and the changed mark is written as text.',
    'Give the control an accessible name from the same label.',
  ],
  buildingBlock: true,
  example: `import { OptionRow, Toggle } from '@drizztdourden08/tessera';

const ShuffleRow = ({ on, setOn }: { on: boolean; setOn: (on: boolean) => void }) => (
  <OptionRow label="Shuffle items" description="Mix the items between the chests." control={<Toggle checked={on} onChange={setOn} aria-label="Shuffle items" />} />
);
`,
  propsHash: '26c11397312d9e81',
} satisfies ComponentUsage;

export { usage };
