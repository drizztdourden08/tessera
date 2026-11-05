/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'Filter, group and sort controls in one row, behind a button that shows or hides them.',
  useWhen: [
    'A list, board or table offers any of a filter, a group and a sort, and the controls should be able to fold away.',
    'Different screens need different parts: each part shows only when its config is passed.',
  ],
  avoidWhen: [
    { case: 'The screen only needs a search box and filter chips, always visible.', use: 'FilterBar' },
    { case: 'The screen only needs a grouping menu.', use: 'GroupControl' },
    { case: 'The screen only needs a sort menu.', use: 'SortControl' },
  ],
  rules: [
    'Pass filter, group and sort with the props of FilterBar, GroupControl and SortControl; leave out a part to hide it.',
    'Control the row with open and onOpenChange, or leave both out and set defaultOpen; the row starts open.',
    'Folded, the button shows a count of the search, enabled filters, grouping and sort that are on.',
    'Set label to rename the button.',
  ],
  a11y: [
    'The button reports aria-expanded and is named Show view controls or Hide view controls.',
    'The count is a badge named by its number, such as 3 active settings.',
  ],
  tree: {
    path: ['data', 'filters over a collection'],
    rule: 'ViewControls keeps filter, group and sort in one row with one show button, so every collection view folds its controls the same way.',
  },
  example: `import { useState } from 'react';
import { ViewControls } from '@drizztdourden08/tessera';
import type { SortState } from '@drizztdourden08/tessera';

const FIELDS = [
  { id: 'name', label: 'Name' },
  { id: 'status', label: 'Status' },
];

const PlayerControls = () => {
  const [search, setSearch] = useState('');
  const [grouping, setGrouping] = useState<string | null>(null);
  const [sort, setSort] = useState<SortState>({ key: 'name', direction: 'asc' });
  return (
    <ViewControls
      filter={{ search, onSearchChange: setSearch }}
      group={{ options: FIELDS, value: grouping, onChange: setGrouping }}
      sort={{ options: FIELDS, value: sort, onChange: setSort }}
    />
  );
};
`,
  propsHash: '5a7ecbdea2fc1436',
} satisfies ComponentUsage;

export { usage };
