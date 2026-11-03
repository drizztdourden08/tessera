/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { overviewStory } from '../_template/overview-story';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { OptionsPanelDemo } from './_samples/OptionsPanelDemo';

type OptionsPanelArgs = {
  title: string;
  toolbar: boolean;
  aside: boolean;
};

const ARG_TYPES: PlaygroundArgTypes<OptionsPanelArgs> = {
  title: { group: 'Content', control: 'text', description: 'The small title over the tabs.' },
  toolbar: { group: 'Content', control: 'boolean', description: 'Buttons at the end of the title line.' },
  aside: { group: 'Layout', control: 'boolean', description: 'A panel beside the options.' },
};

const meta = {
  title: 'Composites · Forms/OptionsPanel',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<OptionsPanelArgs>;

const Playground = {
  name: 'Playground',
  args: { title: 'Randomizer options', toolbar: true, aside: true },
  argTypes: ARG_TYPES,
  render: (args) => <OptionsPanelDemo title={args.title} toolbar={args.toolbar} aside={args.aside} />,
} satisfies PlaygroundStory<OptionsPanelArgs>;

const Tabs = {
  name: 'Two tabs: locked, forced and changed rows, a tag, a note and a read only value',
  render: () => <OptionsPanelDemo />,
} satisfies StoryLiteStoryDefinition<OptionsPanelArgs>;

const Alone = {
  name: 'Without the toolbar and the side panel',
  render: () => <OptionsPanelDemo toolbar={false} aside={false} />,
} satisfies StoryLiteStoryDefinition<OptionsPanelArgs>;

const CODE = `import { OptionGroup, OptionRow, OptionsPanel, ValueTag } from '@drizztdourden08/tessera';

<OptionsPanel title="Randomizer options" tabs={tabs} activeTab={tab} onTabChange={setTab} aside={<ItemPool />}>
  <OptionGroup title="Pool">
    <OptionRow label="Shuffle items" changed onReset={reset} control={<Toggle checked={on} onChange={setOn} />} />
    <OptionRow label="Small keys" locked tag="Locked" control={<ValueTag value />} />
  </OptionGroup>
  <OptionGroup title="During a run" tone="live" />
</OptionsPanel>`;

const Overview = overviewStory({
  component: 'OptionsPanel',
  description: 'The panel of a game preset editor: a title, tabs, groups of option rows and an optional panel beside them.',
  points: [
    'OptionGroup titles a section; `tone="live"` marks options that can change while a game runs.',
    'OptionRow takes any control, plus `tag`, `note` and an `aside` cell at the end of the row.',
    '`locked` dims a row; `forced` keeps it at full strength and shows its `note` in red.',
    '`changed` adds a changed mark, and `onReset` adds a reset button after the name.',
    'ValueTag shows a value read only: a True or False pill, or a tag, with an optional label.',
  ],
  instead: '[FormGroupTabs] when the tabs need a search and counts of changes.',
  playground: Playground,
  variants: [Tabs, Alone],
  code: CODE,
});

export default meta;
export { Alone, Overview, Playground, Tabs };
