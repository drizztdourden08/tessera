/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A menu that picks the one field a list is grouped by, or no grouping.',
  useWhen: [
    'A list or board can be split into sections by one of a few fields, such as status or owner.',
    'The choice sits in a toolbar beside a filter and a sort.',
  ],
  avoidWhen: [
    { case: 'The list needs a filter, a group and a sort together behind one show button.', use: 'ViewControls' },
    { case: 'The list groups by several levels, or the grouping should look like the FilterBar chips.', use: 'GroupBar' },
    { case: 'The user picks the field to order rows by.', use: 'SortControl' },
    { case: 'The user narrows rows by a value.', use: 'FilterBar' },
  ],
  rules: [
    'Pass options as id and label pairs and keep the chosen id in your state; null means no grouping.',
    'Change the grouping only in onChange; the control keeps no value of its own.',
    'Set label to rename the menu title when the list calls its sections something else.',
  ],
  a11y: [
    'The trigger is a button that opens a keyboard menu named by label.',
    'The options are radio items, and the checked one is the current grouping.',
  ],
  tree: {
    path: ['data', 'a menu to group a collection by one field'],
    rule: 'GroupControl offers one grouping field at a time, with None to turn grouping off, drawn like the other view controls.',
  },
  example: `import { useState } from 'react';
import { GroupControl } from '@drizztdourden08/tessera';

const FIELDS = [
  { id: 'status', label: 'Status' },
  { id: 'owner', label: 'Owner' },
];

const GroupPicker = () => {
  const [grouping, setGrouping] = useState<string | null>(null);
  return <GroupControl options={FIELDS} value={grouping} onChange={setGrouping} />;
};
`,
  propsHash: '325dd0615e140e75',
} satisfies ComponentUsage;

export { usage };
