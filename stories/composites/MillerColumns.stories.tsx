/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { MillerColumnsDemo } from './_samples/MillerColumnsDemo';
import type { MillerColumnsArgs } from './_samples/miller-columns-demo.type';
import './MillerColumns.stories.css';

const ARGS: Partial<MillerColumnsArgs> = { shared: false };

const ARG_TYPES: PlaygroundArgTypes<MillerColumnsArgs> = {
  shared: { group: 'Content', control: 'boolean', description: 'Shows a flat list below that picks the same keys.' },
};

const meta = {
  title: 'Composites · Lists/MillerColumns',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<MillerColumnsArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <MillerColumnsDemo {...args} />,
} satisfies PlaygroundStory<MillerColumnsArgs>;

const Browser = {
  name: 'Columns: a press opens the next column, Right goes in, Left goes back',
  render: () => <MillerColumnsDemo />,
} satisfies StoryLiteStoryDefinition<MillerColumnsArgs>;

const Shared = {
  name: 'One selection: the list below picks the same keys',
  render: () => <MillerColumnsDemo shared />,
} satisfies StoryLiteStoryDefinition<MillerColumnsArgs>;

const CODE = `import { MillerColumns } from '@drizztdourden08/tessera';

<MillerColumns
  label="Project files"
  items={entries}
  getKey={(entry) => entry.id}
  getChildren={(entry) => entry.children}
  renderItem={(entry) => entry.name}
  selection={{ selected: picked, onChange: setPicked }}
  onOpen={(entry) => open(entry)}
/>`;

const Overview = overviewStory({
  component: 'MillerColumns',
  description: 'Side by side columns for nested items: a press in one column opens its children in the next.',
  points: [
    '`getChildren` gives the children of a folder; a leaf gives nothing and opens with [[Enter]].',
    '`selection` is one set of keys for every column, so a grid or a list can pick the same keys.',
    'Each column is a `VirtualList`: arrows, a typed letter, Ctrl and Shift pick inside the column.',
    '[[Right]] goes into the open folder and [[Left]] back to the one before.',
    '`path` with `onPathChange` lets the app own which folders are open.',
  ],
  instead: '[Tree] for one list that folds open, or [GroupTree] for counted groups.',
  playground: Playground,
  variants: [Browser, Shared],
  states: {
    render: (props: StateProps) => <MillerColumnsDemo shared={props.selected === true} />,
    list: [STATE.idle, { ...STATE.hover, target: '.virtual-list__item' }, { ...STATE.focus, target: '.virtual-list__item' }],
  },
  code: CODE,
});

export default meta;
export { Browser, Overview, Playground, Shared };
