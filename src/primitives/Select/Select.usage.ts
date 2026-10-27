/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A field that opens a list and picks one option, or several, from plain options, from options in labelled groups, or from your own items.',
  useWhen: [
    'The user picks one value from a list too long to show as buttons, such as a country or a sprite size.',
    'The user picks several values from a fixed list and the list does not need typing to find them: pass values and onValuesChange.',
    'The options sit under labelled headings, such as warm and cool colours: pass groups.',
  ],
  avoidWhen: [
    { case: 'The user finds the option by typing, or may type a value that is not in the list.', use: 'Combobox' },
    { case: 'The list is short enough to show all at once.', use: 'SegmentedControl' },
    { case: 'The options are actions, not values for a field.', use: 'DropdownMenu' },
  ],
  rules: [
    'Pass options for a plain list and groups for options under headings. Pass items for objects of your own, with the field that holds the value.',
    'When options and groups are both given, the options come first with no heading, then each group under its label. A group never hides the options.',
    'An option that sits in a group is not repeated in options; put it in one place only.',
    'The app owns the value: pass value and onChange for one choice, values and onValuesChange for several.',
    'Pass grow={false} to keep a fixed width (the token --field-w-inline, 256 px, shrinking to 160 px) beside other tools in a toolbar; TextInput, SearchInput and Combobox take the same prop.',
    'Pass width="fit" to size the control to its content, or width="narrow" for a 220 px control; TextInput, SearchInput and Combobox take the same prop.',
    'Use NativeSelect instead of Select for a form that posts to the browser, or on a touch screen.',
  ],
  a11y: [
    'The trigger is a combobox with a listbox; options are option rows, and a group heading names its block.',
    'The arrow keys, Home and End move through the options, Enter picks, Escape closes and returns focus to the trigger.',
  ],
  tree: {
    path: ['a value the user sets', 'one choice', 'many, in a list'],
    rule: 'Select is the field that opens a list of options, plain or grouped, and picks one or several.',
  },
  example: `import { Select } from '@drizztdourden08/tessera';

interface TintPickerProps {
  tint: string;
  onTint: (tint: string) => void;
}

const TintPicker = ({ tint, onTint }: TintPickerProps) => (
  <Select
    value={tint}
    onChange={onTint}
    options={[{ value: 'none', label: 'No tint' }]}
    groups={[
      { label: 'Warm', options: [{ value: 'red', label: 'Red' }, { value: 'amber', label: 'Amber' }] },
      { label: 'Cool', options: [{ value: 'blue', label: 'Blue' }, { value: 'teal', label: 'Teal' }] },
    ]}
  />
);
`,
  propsHash: '599be7e5e1a07cfb',
} satisfies ComponentUsage;

export { usage };
