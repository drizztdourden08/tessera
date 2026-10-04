/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { overviewStory } from '../_template/overview-story';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import type { StateProps } from '../_template/states/states.type';
import { ManagedListDemo } from './_samples/ManagedListDemo';
import type { ManagedListDemoProps, ManagedListDemoState } from './_samples/preset-samples.type';
import './ManagedList.stories.css';

type ManagedListArgs = {
  state: ManagedListDemoState;
  grouped: boolean;
  filter: boolean;
  actions: boolean;
  title: string;
  createLabel: string;
};

const STATES: readonly ManagedListDemoState[] = ['ready', 'loading', 'empty', 'error'];

const ARGS: Partial<ManagedListArgs> = { state: 'ready', grouped: true, filter: true, actions: true, title: 'Presets', createLabel: 'New' };

const ARG_TYPES: PlaygroundArgTypes<ManagedListArgs> = {
  state: { group: 'State', control: 'select', options: [...STATES], description: 'Ready shows the rows; loading, empty and error replace them.' },
  grouped: { group: 'Layout', control: 'boolean', description: 'Sort the rows under one heading per game.' },
  filter: { group: 'Behaviour', control: 'boolean', description: 'A filter box over the rows; off, it shows from 8 items.' },
  actions: { group: 'Behaviour', control: 'boolean', description: 'Rename and delete on every row.' },
  title: { group: 'Content', control: 'text' },
  createLabel: { group: 'Content', control: 'text', description: 'The word on the New button.' },
};

const meta = {
  title: 'Composites · Lists/ManagedList',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ManagedListArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <ManagedListDemo key={args.state} {...args} />,
} satisfies PlaygroundStory<ManagedListArgs>;

const Grouped = {
  name: 'Presets in groups, with rename and delete',
  render: () => <ManagedListDemo />,
} satisfies StoryLiteStoryDefinition<ManagedListArgs>;

const Plain = {
  name: 'Servers, one list with Add',
  render: () => <ManagedListDemo title="Servers" createLabel="Add" grouped={false} filter={false} />,
} satisfies StoryLiteStoryDefinition<ManagedListArgs>;

const CODE = `import { ManagedList } from '@drizztdourden08/tessera';

<ManagedList
  title="Presets"
  items={presets}
  getId={(preset) => preset.id}
  getName={(preset) => preset.name}
  render={(preset) => ({ meta: \`\${preset.changes} changes\` })}
  groupBy={(preset) => preset.game}
  selectedId={selectedId}
  onSelect={setSelectedId}
  onCreate={createPreset}
  onRename={renamePreset}
  onDelete={deletePreset}
  loading={loading}
  error={error}
  empty="Install a game from Games, then make a preset for it."
/>`;

const Overview = overviewStory({
  component: 'ManagedList',
  description: 'The list side of a list and editor screen: a title with its count, New, a filter, groups and rows to rename or delete.',
  points: [
    '`getId` and `getName` read each item; `render` adds the meta, an icon or end columns to its row.',
    '`groupBy` puts the rows under small headings, in the order each group first appears.',
    '`onRename` adds a pencil to the picked row and [[F2]]: [[Enter]] keeps the new name, [[Esc]] cancels.',
    '`onDelete` adds a trash button to the picked row that asks once, through [ConfirmIconButton].',
    'The arrow keys, Home and End move the selection between rows, across groups.',
    '`loading`, `error` and `empty` take the place of the rows; the filter shows from 8 items, or with `filter`.',
  ],
  instead: '[MasterDetail] for the same list beside an editor that asks before unsaved edits are lost.',
  playground: Playground,
  variants: [Grouped, Plain],
  states: {
    render: (props: StateProps) => <ManagedListDemo {...(props as ManagedListDemoProps)} />,
    list: STATES.map((state) => ({ name: state, props: { state, title: state === 'ready' ? 'Presets' : 'Servers' } })),
  },
  code: CODE,
});

export default meta;
export { Grouped, Overview, Plain, Playground };
