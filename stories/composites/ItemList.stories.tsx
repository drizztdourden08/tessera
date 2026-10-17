/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { overviewStory } from '../_template/overview-story';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import type { StateProps } from '../_template/states/states.type';
import { ItemListCreateDemo } from './_samples/ItemListCreateDemo';
import { ItemListDemo } from './_samples/ItemListDemo';
import { ItemListNewDisabledDemo } from './_samples/ItemListNewDisabledDemo';
import { ItemListSaveRowDemo } from './_samples/ItemListSaveRowDemo';
import { ITEM_LIST_CODE } from './_samples/item-list-story.constants';
import { ItemListSwitchDemo } from './_samples/ItemListSwitchDemo';
import { ItemListUndoDemo } from './_samples/ItemListUndoDemo';
import { ItemListUndoStackDemo } from './_samples/ItemListUndoStackDemo';
import type { ItemListDemoProps, ItemListDemoState } from './_samples/preset-samples.type';
import './ItemList.stories.css';

type ItemListArgs = {
  state: ItemListDemoState;
  grouped: boolean;
  filter: boolean;
  actions: boolean;
  emptyGame: boolean;
  title: string;
  createLabel: string;
};

const STATES: readonly ItemListDemoState[] = ['ready', 'loading', 'empty', 'error'];

const ARGS: Partial<ItemListArgs> = { state: 'ready', grouped: true, filter: true, actions: true, emptyGame: false, title: 'Presets', createLabel: 'New' };

const ARG_TYPES: PlaygroundArgTypes<ItemListArgs> = {
  state: { group: 'State', control: 'select', options: [...STATES], description: 'Ready shows the rows; loading, empty and error replace them.' },
  grouped: { group: 'Layout', control: 'boolean', description: 'Sort the rows under one heading per game.' },
  filter: { group: 'Behaviour', control: 'boolean', description: 'A filter box over the rows; off, it shows from 8 items.' },
  actions: { group: 'Behaviour', control: 'boolean', description: 'Rename and delete on every row.' },
  emptyGame: { group: 'Layout', control: 'boolean', description: 'Super Metroid is installed with no preset: its group shows New preset. Needs grouped.' },
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

const EmptyGame = {
  name: 'Presets with an installed game that has no preset yet',
  render: () => <ItemListDemo emptyGame />,
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

const UndoDelete = {
  name: 'Saves: delete at once with an Undo, the Delete key and a Load button',
  render: () => <ItemListUndoDemo />,
} satisfies StoryLiteStoryDefinition<ItemListArgs>;

const NeedsGame = {
  name: 'Saves: New needs a running game and says so',
  render: () => <ItemListNewDisabledDemo />,
} satisfies StoryLiteStoryDefinition<ItemListArgs>;

const UndoStack = {
  name: 'Saves: Load, Save over and delete, each undone with Ctrl+Z',
  render: () => <ItemListUndoStackDemo />,
} satisfies StoryLiteStoryDefinition<ItemListArgs>;

const SaveRows = {
  name: 'Saves: the screenshot flush on the left, renamed in place with the pen',
  render: () => <ItemListSaveRowDemo />,
} satisfies StoryLiteStoryDefinition<ItemListArgs>;

const Overview = overviewStory({
  component: 'ItemList',
  description: 'The list side of a list and editor screen: a title with its count, New, a filter, groups and rows to rename or delete.',
  points: [
    '`render` adds meta, an icon or columns; `loading`, `error` and `empty` replace the rows; a filter shows from 8.',
    '`create` draws a form such as [InlineCreateForm]; `newDisabled` greys New out, and a string says why.',
    '`groupBy` sorts rows under headings; `groups` orders them and draws empty ones with a line and an action.',
    '`onActivate` runs on a click, [[Enter]] or [[Space]]; the arrow keys then move the focus, not the selection.',
    '`rowActions`, `onRename` ([[F2]]) and `onDelete` fill the row buttons, shown on hover or `"always"`.',
    '`media` in `render` draws a flush picture; `renameInline` renames in place with a pen.',
    '`undoDelete` deletes at once with an Undo that [[Ctrl+Z]] reaches through `useUndo`; `deleteKey` binds [[Delete]].',
  ],
  instead: '[ListDetail] for the same list beside an editor that asks before unsaved edits are lost.',
  playground: Playground,
  variants: [Grouped, EmptyGame, Plain, CreateForm, FirstRun, PickToSwitch, UndoDelete, NeedsGame, UndoStack, SaveRows],
  states: {
    render: (props: StateProps) => <ItemListDemo {...(props as ItemListDemoProps)} />,
    list: STATES.map((state) => ({ name: state, props: { state, title: state === 'ready' ? 'Presets' : 'Servers' } })),
  },
  code: ITEM_LIST_CODE,
});

export default meta;
export { CreateForm, EmptyGame, FirstRun, Grouped, NeedsGame, Overview, PickToSwitch, Plain, Playground, SaveRows, UndoDelete, UndoStack };
