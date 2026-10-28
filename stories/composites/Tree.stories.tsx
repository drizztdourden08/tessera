/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { TreeBigDemo } from './_samples/TreeBigDemo';
import { TreeDemo } from './_samples/TreeDemo';
import { TreeLazyDemo } from './_samples/TreeLazyDemo';
import type { TreeArgs } from './_samples/tree-demo.type';
import './Tree.stories.css';

const ARGS: Partial<TreeArgs> = { mode: 'multiple', reorder: true, guides: true, compact: false, openOnPick: false, query: '' };

const ARG_TYPES: PlaygroundArgTypes<TreeArgs> = {
  mode: { group: 'Behaviour', control: 'select', options: ['multiple', 'single'], description: 'Many rows at once with Ctrl and Shift, or one row.' },
  reorder: { group: 'Behaviour', control: 'boolean', description: 'Drag rows to a gap or into a folder; Alt with the arrows moves by key.' },
  openOnPick: { group: 'Behaviour', control: 'boolean', description: 'A press on a folder also opens or closes it.' },
  guides: { group: 'Appearance', control: 'boolean', description: 'A line for each level, with the branch of the picked row lit.' },
  compact: { group: 'Appearance', control: 'boolean', description: 'Rows of 24 px instead of 28 px.' },
  query: { group: 'Content', control: 'text', description: 'Keeps the rows that match and the folders above them.' },
};

const meta = {
  title: 'Composites · Lists/Tree',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<TreeArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <TreeDemo key={`${args.mode}-${args.compact}`} {...args} rowSize={args.compact ? 'compact' : 'normal'} />,
} satisfies PlaygroundStory<TreeArgs>;

const Files = {
  name: 'Files: arrows, Home, End, a typed letter, Ctrl and A, Shift with the arrows',
  render: () => <TreeDemo guides />,
} satisfies StoryLiteStoryDefinition<TreeArgs>;

const Reorder = {
  name: 'Reorder: drag to a gap or into a folder, or Alt with the arrows, depth limit 3',
  render: () => <TreeDemo reorder guides maxDepth={3} />,
} satisfies StoryLiteStoryDefinition<TreeArgs>;

const Single = {
  name: 'One row picked, a press on a folder opens it',
  render: () => <TreeDemo mode="single" openOnPick />,
} satisfies StoryLiteStoryDefinition<TreeArgs>;

const Filtered = {
  name: 'Filtered: the matches keep the folders above them',
  render: () => <TreeDemo query="tok" guides />,
} satisfies StoryLiteStoryDefinition<TreeArgs>;

const Lazy = {
  name: 'Lazy children: a folder loads when it opens and shows a spinner',
  render: () => <TreeLazyDemo />,
} satisfies StoryLiteStoryDefinition<TreeArgs>;

const Big = {
  name: '10,100 rows drawn only where they are in view',
  render: () => <TreeBigDemo />,
} satisfies StoryLiteStoryDefinition<TreeArgs>;

const CODE = `import { Tree } from '@drizztdourden08/tessera';

<Tree
  label="Project files"
  items={entries}
  getKey={(entry) => entry.id}
  getChildren={(entry) => entry.children}
  getLabel={(entry) => entry.name}
  renderLead={(entry, state) => <Icon name={state.expanded ? 'folder-open' : 'folder'} />}
  selection={{ selected: picked, onChange: setPicked }}
  reorder={{ onMove: (move) => setEntries((now) => moveEntries(now, move)), maxDepth: 4 }}
/>`;

const Overview = overviewStory({
  component: 'Tree',
  description: 'A long tree of items that fold open, drawn only where it is in view, to pick, move and drop into folders.',
  points: [
    '`getChildren` gives the children of an item; thousands of rows draw only what is in view.',
    'The keys of a tree: arrows, [[Right]] and [[Left]] to fold, [[Home]], [[End]] and a typed letter.',
    '`selection` picks many rows through `useSelectionModel`, or one with `mode="single"`.',
    '`reorder` drags rows to a gap or into a folder; [[Alt]] with an arrow moves by key and is announced.',
    '`onLoadChildren` loads a folder when it opens; `filter` keeps the folders above its matches.',
    '`renderLead`, `renderLabel` and `renderTrail` are the row slots; the tree adds no toggles.',
  ],
  instead: '[GroupTree] for counted groups with one picked row, or [VirtualList] for a flat list.',
  playground: Playground,
  variants: [Files, Reorder, Single, Filtered, Lazy, Big],
  states: {
    render: (props: StateProps) => <TreeDemo mode="single" guides open={props.open === true ? ['src', 'components'] : []} />,
    list: [
      STATE.idle,
      { ...STATE.hover, target: '.tree__row' },
      { ...STATE.focus, target: '.tree__row' },
      { ...STATE.open, name: 'Expanded' },
    ],
  },
  code: CODE,
});

export default meta;
export { Big, Files, Filtered, Lazy, Overview, Playground, Reorder, Single };
