/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A menu that picks the field a list is sorted by, with one button that flips the direction.',
  useWhen: [
    'A list or board can be ordered by one of a few fields, such as name or date.',
    'The choice sits in a toolbar beside a filter and a group.',
  ],
  avoidWhen: [
    { case: 'The list needs a filter, a group and a sort together behind one show button.', use: 'ViewControls' },
    { case: 'The user sorts by clicking a column header in a table.', use: 'DataTable' },
    { case: 'The user splits the list into sections.', use: 'GroupControl' },
  ],
  rules: [
    'Pass options as id and label pairs and keep the value, a key and a direction, in your state.',
    'A null key means the default order; the direction button still flips the direction.',
    'Change the sort only in onChange; the control keeps no value of its own.',
  ],
  a11y: [
    'The trigger is a button that opens a keyboard menu; its options are radio items.',
    'The direction button is named by the sort it switches to, such as Sort descending.',
  ],
  tree: {
    path: ['data', 'a menu to sort a collection by one field and a direction'],
    rule: 'SortControl pairs a field menu with one direction button, drawn like the other view controls.',
  },
  example: `import { useState } from 'react';
import { SortControl } from '@drizztdourden08/tessera';
import type { SortState } from '@drizztdourden08/tessera';

const FIELDS = [
  { id: 'name', label: 'Name' },
  { id: 'updated', label: 'Updated' },
];

const SortPicker = () => {
  const [sort, setSort] = useState<SortState>({ key: 'name', direction: 'asc' });
  return <SortControl options={FIELDS} value={sort} onChange={setSort} />;
};
`,
  propsHash: '906913cca4a6294c',
} satisfies ComponentUsage;

export { usage };
