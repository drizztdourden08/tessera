/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { overviewStory } from '../_template/overview-story';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import type { StateProps } from '../_template/states/states.type';
import { ItemListCreateDemo } from './_samples/ItemListCreateDemo';
import { ItemListDemo } from './_samples/ItemListDemo';
import { ItemListSwitchDemo } from './_samples/ItemListSwitchDemo';
import type { ItemListDemoProps, ItemListDemoState } from './_samples/preset-samples.type';
import './ItemList.stories.css';

type ItemListArgs = {
  state: ItemListDemoState;
  grouped: boolean;
  filter: boolean;
  actions: boolean;
  title: string;
  createLabel: string;
};

const STATES: readonly ItemListDemoState[] = ['ready', 'loading', 'empty', 'error'];

const ARGS: Partial<ItemListArgs> = { state: 'ready', grouped: true, filter: true, actions: true, title: 'Presets', createLabel: 'New' };

const ARG_TYPES: PlaygroundArgTypes<ItemListArgs> = {
  state: { group: 'State', control: 'select', options: [...STATES], description: 'Ready shows the rows; loading, empty and error replace them.' },
  grouped: { group: 'Layout', control: 'boolean', description: 'Sort the rows under one heading per game.' },
  filter: { group: 'Behaviour', control: 'boolean', description: 'A filter box over the rows; off, it shows from 8 items.' },
  actions: { group: 'Behaviour', control: 'boolean', description: 'Rename and delete on every row.' },
  title: { group: 'Content', control: 'text' },
  createLabel: { group: 'Content', control: 'text', description: 'The word on the New button.' },
};

const meta = {
  title: 'Composites · Lists/ItemList',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ItemListArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <ItemListDemo key={args.state} {...args} />,
} satisfies PlaygroundStory<ItemListArgs>;

const Grouped = {
  name: 'Presets in groups, with rename and delete',
  render: () => <ItemListDemo />,
} satisfies StoryLiteStoryDefinition<ItemListArgs>;

const Plain = {
  name: 'Servers, one list with Add',
  render: () => <ItemListDemo title="Servers" createLabel="Add" grouped={false} filter={false} />,
} satisfies StoryLiteStoryDefinition<ItemListArgs>;

const CreateForm = {
  name: 'Profiles, created in place with a game and a template',
  render: () => <ItemListCreateDemo />,
} satisfies StoryLiteStoryDefinition<ItemListArgs>;

const FirstRun = {
  name: 'First run, the form starts open',
  render: () => <ItemListCreateDemo firstRun />,
} satisfies StoryLiteStoryDefinition<ItemListArgs>;

const PickToSwitch = {
  name: 'Pick to switch: the arrows move, Enter switches',
  render: () => <ItemListSwitchDemo />,
} satisfies StoryLiteStoryDefinition<ItemListArgs>;

const CODE = `import { ItemList } from '@drizztdourden08/tessera';

<ItemList
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
/>

<ItemList
  title="Profiles"
  items={profiles}
  getId={(profile) => profile.id}
  getName={(profile) => profile.name}
  selectedId={selectedId}
  onSelect={setSelectedId}
  createLabel="New profile"
  createOpen={creating || profiles.length === 0}
  onCreateOpenChange={setCreating}
  create={(close) => (
    <InlineCreateForm
      placeholder="Profile name"
      canSubmit={game !== ''}
      onCreate={(name) => { setSelectedId(addProfile(name, game)); close(); }}
      onCancel={profiles.length ? close : undefined}
      extraFields={<Field label="Game"><Select value={game} onChange={setGame} options={GAMES} /></Field>}
    />
  )}
/>

<ItemList
  title="Profiles"
  items={profiles}
  getId={(profile) => profile.id}
  getName={(profile) => profile.name}
  selectedId={activeId}
  onActivate={switchProfile}
  onRename={renameProfile}
  onDelete={deleteProfile}
  actionVisibility="always"
/>`;

const Overview = overviewStory({
  component: 'ItemList',
  description: 'The list side of a list and editor screen: a title with its count, New, a filter, groups and rows to rename or delete.',
  points: [
    '`getId` and `getName` read each item; `render` adds the meta, an icon or end columns to its row.',
    '`create` draws a form such as [InlineCreateForm] under the title; `createOpen` lets the app hold it open.',
    '`groupBy` puts the rows under headings; the arrow keys, Home and End move the selection across groups.',
    '`onActivate` runs on a click, [[Enter]] or [[Space]]; the arrow keys then move the focus, not the selection.',
    '`onRename` ([[F2]]) and `onDelete` add a pencil and a trash; `actionVisibility` shows them on hover or always.',
    '`loading`, `error` and `empty` take the place of the rows; the filter shows from 8 items, or with `filter`.',
  ],
  instead: '[ListDetail] for the same list beside an editor that asks before unsaved edits are lost.',
  playground: Playground,
  variants: [Grouped, Plain, CreateForm, FirstRun, PickToSwitch],
  states: {
    render: (props: StateProps) => <ItemListDemo {...(props as ItemListDemoProps)} />,
    list: STATES.map((state) => ({ name: state, props: { state, title: state === 'ready' ? 'Presets' : 'Servers' } })),
  },
  code: CODE,
});

export default meta;
export { CreateForm, FirstRun, Grouped, Overview, PickToSwitch, Plain, Playground };
