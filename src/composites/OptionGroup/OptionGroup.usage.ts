/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A titled group of option rows, with the title in small capitals over the rows.',
  useWhen: [
    'The rows of one section of a long list of options need a heading, such as the items or the dungeon of a game preset.',
    'Some groups hold options that can change while a game runs and need to stand out.',
  ],
  avoidWhen: [
    { case: 'The groups are tabs of a form with a search and change counts.', use: 'FormGroupTabs' },
    { case: 'The group is a titled section of an app settings page.', use: 'SettingsSection' },
  ],
  rules: [
    'Put OptionRow children inside; the group adds the title and nothing else.',
    'Pass tone="live" for a group whose options can change while a game runs; its title takes the brighter accent.',
  ],
  a11y: [
    'The group is a labelled group named by its visible title.',
  ],
  buildingBlock: true,
  example: `import { OptionGroup, OptionRow, Toggle } from '@drizztdourden08/tessera';

const Items = () => (
  <OptionGroup title="Items">
    <OptionRow label="Shuffle" control={<Toggle checked onChange={() => {}} aria-label="Shuffle" />} />
  </OptionGroup>
);
`,
  propsHash: '3f8685aefd95a5c2',
} satisfies ComponentUsage;

export { usage };
