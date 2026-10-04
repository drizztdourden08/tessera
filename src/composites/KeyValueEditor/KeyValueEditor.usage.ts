/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A map of names to values, row by row: a name, a value control and Remove, then an add row, with a check for names listed twice.',
  useWhen: [
    'An option is a map, such as item counts for a start inventory, and a raw JSON box would let one typo break it.',
    'The names come from a list of valid items, or are typed freely, and each has a number, a word or a choice.',
  ],
  avoidWhen: [
    { case: 'The value nests deeper than one name and one value.', use: 'JsonInput' },
    { case: 'The value is a set of names with nothing attached.', use: 'SetPicker' },
  ],
  rules: [
    'Pass keys whenever the valid names are known, so the add row searches them and a wrong name is caught.',
    'Pick valueKind for the values: count for small whole numbers, number, text or select with options.',
    'Store the value from onChange; it waits while a name is empty, listed twice or not in keys.',
  ],
  a11y: [
    'The editor is a group named by its Field or FormRow label, or by aria-label, and its rows are a list.',
    'Each value control is named Value of and the name, and each Remove button Remove and the name.',
    'A problem is an alert under the rows, and the rows it is about are marked invalid.',
  ],
  tree: {
    path: ['a value the user sets', 'pairs of a name and a value'],
    rule: 'KeyValueEditor edits a map row by row and holds it back while it has a duplicate, the same way in every app.',
  },
  example: `import { KeyValueEditor } from '@drizztdourden08/tessera';
import type { KeyValueEntry } from '@drizztdourden08/tessera';

const StartInventory = ({ items, value, onChange }: {
  items: string[];
  value: Record<string, number>;
  onChange: (value: Record<string, KeyValueEntry>) => void;
}) => (
  <KeyValueEditor value={value} onChange={onChange} keys={items} min={0} max={99} aria-label="Start inventory" />
);
`,
  propsHash: '52d4e706fa4c0f99',
} satisfies ComponentUsage;

export { usage };
