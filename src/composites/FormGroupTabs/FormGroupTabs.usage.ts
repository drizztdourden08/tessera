/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'The top of a long form split into groups: a search over the options, Show advanced, and a tab per group with how many options changed.',
  useWhen: [
    'A form has dozens of options in named groups, such as the option groups of a game preset.',
    'The user needs to find an option by name and see which groups hold changes.',
  ],
  avoidWhen: [
    { case: 'The screen is the settings of the app, with a header over a scrolling body.', use: 'SettingsPage' },
    { case: 'Only the tabs are needed, with no counts or search.', use: 'Tabs' },
  ],
  rules: [
    'Give each tab count, the number of options in the group, and changed, how many differ from their default.',
    'Pass onQueryChange and filter the rows of the form with the query; the tabs stay.',
    'Pass onAdvancedChange with advancedCount to show or hide the options tagged advanced.',
  ],
  a11y: [
    'The tabs are Tabs, with their arrow keys, and each tab reads its label, its changed count and its badge.',
    'The search box and the switch are named by their own words.',
  ],
  tree: {
    path: ['a value the user sets', 'a long form split into tabs'],
    rule: 'FormGroupTabs shows where the changes are in a long form and how to find an option, the same way in every app.',
  },
  example: `import { FormGroupTabs } from '@drizztdourden08/tessera';
import type { FormGroupTab } from '@drizztdourden08/tessera';

const OptionGroups = ({ groups, groupId, setGroupId, query, setQuery }: {
  groups: FormGroupTab[];
  groupId: string;
  setGroupId: (id: string) => void;
  query: string;
  setQuery: (query: string) => void;
}) => <FormGroupTabs tabs={groups} activeTab={groupId} onTabChange={setGroupId} query={query} onQueryChange={setQuery} />;
`,
  propsHash: 'ffd1a020bcaa4356',
} satisfies ComponentUsage;

export { usage };
