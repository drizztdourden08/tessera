/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'Several choices from a long list: the chosen ones as removable tags, a search, and a checklist that scrolls.',
  useWhen: [
    'An option is a set picked from dozens or hundreds of names, such as the items to hint at the start.',
    'The user should see every choice made so far while looking for the next one.',
  ],
  avoidWhen: [
    { case: 'The choices are few and fit in view.', use: 'ToggleGroup' },
    { case: 'The choices are tags from a small grouped list.', use: 'TagPicker' },
    { case: 'Several choices are picked by typing, in a dropdown.', use: 'Combobox' },
  ],
  rules: [
    'Pass every valid choice in options; value keeps their order, whatever order they were checked in.',
    'Keep each choice to a short name, since it shows as a tag and a checkbox label.',
  ],
  a11y: [
    'The picker is a group named by its Field or FormRow label, or by aria-label.',
    'Each choice is a Checkbox, so Space checks it, and each tag has a Remove button with the name.',
    'The search box is named after the number of choices it searches.',
  ],
  tree: {
    path: ['a value the user sets', 'several choices from a long list'],
    rule: 'SetPicker shows what is chosen on top and searches the rest, the same way in every app.',
  },
  example: `import { SetPicker } from '@drizztdourden08/tessera';

const StartHints = ({ items, value, onChange }: { items: string[]; value: string[]; onChange: (value: string[]) => void }) => (
  <SetPicker options={items} value={value} onChange={onChange} aria-label="Start hints" />
);
`,
  propsHash: 'e665eed432fa8512',
} satisfies ComponentUsage;

export { usage };
