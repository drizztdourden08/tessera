/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A row of group by chips, each added from an Add group menu and removed with its x.',
  useWhen: [
    'A list can be grouped by one or several fields and the choice sits beside a FilterBar.',
    'The grouping should read like the filter chips, with a plus button to add a level.',
  ],
  avoidWhen: [
    { case: 'The list is grouped by one field chosen from a single menu.', use: 'GroupControl' },
    { case: 'The user narrows rows by a value.', use: 'FilterBar' },
    { case: 'The list needs a filter, a group and a sort together behind one show button.', use: 'ViewControls' },
  ],
  rules: [
    'Keep the ordered ids in your state; the first id is the outermost group. Change them only in onChange.',
    'Set maxLevels to cap the levels; at the cap, or when every option is used, the Add group button is not drawn.',
    'An id that is not in options draws no chip.',
  ],
  a11y: [
    'Each chip is a group named by its option, and its remove button is named Remove grouping by that option.',
    'The Add group button opens a keyboard menu of the options not yet used.',
  ],
  tree: {
    path: ['data', 'group by chips with an Add group menu, like a filter bar'],
    rule: 'GroupBar lists the grouping levels as removable chips and adds one through a menu, drawn like the FilterBar chips.',
  },
  example: `import { useState } from 'react';
import { GroupBar } from '@drizztdourden08/tessera';

const FIELDS = [
  { id: 'status', label: 'Status' },
  { id: 'owner', label: 'Owner' },
];

const Grouping = () => {
  const [levels, setLevels] = useState<string[]>([]);
  return <GroupBar options={FIELDS} value={levels} onChange={setLevels} maxLevels={2} />;
};
`,
  propsHash: '1e7233dd4411db61',
} satisfies ComponentUsage;

export { usage };
