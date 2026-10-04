/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { overviewStory } from '../_template/overview-story';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { FormGroupTabsDemo } from './_samples/FormGroupTabsDemo';

type FormGroupTabsArgs = {
  tools: boolean;
};

const ARG_TYPES: PlaygroundArgTypes<FormGroupTabsArgs> = {
  tools: { group: 'Content', control: 'boolean', description: 'The search box and Show advanced over the tabs.' },
};

const meta = {
  title: 'Composites · Forms/FormGroupTabs',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<FormGroupTabsArgs>;

const Playground = {
  name: 'Playground',
  args: { tools: true },
  argTypes: ARG_TYPES,
  render: (args) => <FormGroupTabsDemo tools={args.tools} />,
} satisfies PlaygroundStory<FormGroupTabsArgs>;

const Groups = {
  name: 'Preset editor: option groups with their changed counts',
  render: () => <FormGroupTabsDemo />,
} satisfies StoryLiteStoryDefinition<FormGroupTabsArgs>;

const Plain = {
  name: 'The tabs alone',
  render: () => <FormGroupTabsDemo tools={false} />,
} satisfies StoryLiteStoryDefinition<FormGroupTabsArgs>;

const CODE = `import { FormGroupTabs } from '@drizztdourden08/tessera';

<FormGroupTabs
  tabs={groups.map((group) => ({ id: group.id, label: group.name, count: group.options.length, changed: changedIn(group) }))}
  activeTab={groupId}
  onTabChange={setGroupId}
  query={query}
  onQueryChange={setQuery}
  advanced={showAdvanced}
  onAdvancedChange={setShowAdvanced}
  advancedCount={advancedCount}
/>`;

const Overview = overviewStory({
  component: 'FormGroupTabs',
  description: 'The top of a long form split into groups: a search, Show advanced, and a tab per group with its counts.',
  points: [
    'Each tab reads its label and how many options changed, with the number of options as a badge.',
    '`onQueryChange` adds the search box; `onAdvancedChange` adds Show advanced with `advancedCount`.',
    'The tabs are [Tabs]: they scroll when they overflow and keep the arrow keys.',
  ],
  instead: '[SettingsPage] for app settings with a header and a scrolling body.',
  playground: Playground,
  variants: [Groups, Plain],
  code: CODE,
});

export default meta;
export { Groups, Overview, Plain, Playground };
