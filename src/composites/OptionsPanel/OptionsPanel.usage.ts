/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'The panel of a game preset editor: a small title with a toolbar, a row of tabs, the groups of the open tab, and an optional panel beside them.',
  useWhen: [
    'An app edits or shows the options of a randomizer or a game preset, split into tabs of OptionGroup and OptionRow.',
    'A side panel, such as the item pool, sits next to the options and the options panel must leave it room.',
  ],
  avoidWhen: [
    { case: 'The tabs need a search, Show advanced and counts of changed options.', use: 'FormGroupTabs' },
    { case: 'The page is the settings of the app.', use: 'SettingsPage' },
  ],
  rules: [
    'Give tabs, activeTab and onTabChange; the app owns which tab is open and what each tab shows.',
    'Put OptionGroup children inside; the body scrolls when they are taller than the panel.',
    'Pass toolbar for the buttons at the end of the title line and aside for a panel beside the options.',
    'A tab with a zero badge hides the badge.',
  ],
  a11y: [
    'The tabs are Tabs, with their arrow keys, and the tab names are their labels.',
  ],
  tree: {
    path: ['a value the user sets', 'the options of a game, in tabs and groups'],
    rule: 'OptionsPanel lays out the tabs, groups and rows of a game preset the same way in every app.',
  },
  example: `import { OptionGroup, OptionRow, OptionsPanel, ValueTag } from '@drizztdourden08/tessera';

const Preset = ({ tab, setTab }: { tab: string; setTab: (tab: string) => void }) => (
  <OptionsPanel title="Randomizer options" tabs={[{ id: 'items', label: 'Items' }, { id: 'world', label: 'World' }]} activeTab={tab} onTabChange={setTab}>
    <OptionGroup title="Shuffle">
      <OptionRow label="Chests" control={<ValueTag value />} />
    </OptionGroup>
  </OptionsPanel>
);
`,
  propsHash: '1eed73493f16ee15',
} satisfies ComponentUsage;

export { usage };
