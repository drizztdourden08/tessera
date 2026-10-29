/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { VirtualListActive } from './_samples/VirtualListActive';
import { VirtualListFrame } from './_samples/VirtualListFrame';
import { VirtualListPicker } from './_samples/VirtualListPicker';
import { FILLED_AND_EMPTY } from './_samples/virtual-states.constants';
import './VirtualList.stories.css';

type VirtualListArgs = {
  count: number;
  rowSize: 'compact' | 'normal' | 'roomy';
};

const ROW_SIZES = ['compact', 'normal', 'roomy'] as const;

const ARGS: Partial<VirtualListArgs> = { count: 5000, rowSize: 'normal' };

const ARG_TYPES: PlaygroundArgTypes<VirtualListArgs> = {
  count: { group: 'Content', control: 'range', min: 0, max: 5000, step: 100, description: 'How many items the list holds; only the ones in view are drawn.' },
  rowSize: { group: 'Appearance', control: 'select', options: ROW_SIZES, description: 'The height of every row, from a token.' },
};

const meta = {
  title: 'Composites · Lists/VirtualList',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<VirtualListArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <VirtualListFrame count={args.count} rowSize={args.rowSize} />,
} satisfies PlaygroundStory<VirtualListArgs>;

const Long = {
  name: '5000 items: click a row, then use the arrows, Home, End, Page Up and Page Down',
  render: () => <VirtualListActive />,
} satisfies StoryLiteStoryDefinition<VirtualListArgs>;

const Compact = {
  name: 'Compact rows',
  render: () => <VirtualListFrame count={5000} rowSize="compact" />,
} satisfies StoryLiteStoryDefinition<VirtualListArgs>;

const Taller = {
  name: 'A row height of your own: size-64',
  render: () => <VirtualListFrame count={5000} rowHeight="size-64" />,
} satisfies StoryLiteStoryDefinition<VirtualListArgs>;

const Short = {
  name: 'Three items',
  render: () => <VirtualListFrame count={3} />,
} satisfies StoryLiteStoryDefinition<VirtualListArgs>;

const Strip = {
  name: 'A horizontal strip: pick with click, Ctrl, Shift, Ctrl+A, Space or a drag; type a letter to jump',
  render: () => <VirtualListPicker count={2000} horizontal />,
} satisfies StoryLiteStoryDefinition<VirtualListArgs>;

const Picking = {
  name: 'Selection: click, Ctrl, Shift, Ctrl+A, Space, Shift with an arrow, and type ahead',
  render: () => <VirtualListPicker count={5000} />,
} satisfies StoryLiteStoryDefinition<VirtualListArgs>;

const CODE = `import { VirtualList } from '@drizztdourden08/tessera';

<VirtualList
  label="Events"
  items={entries}
  getKey={(entry) => entry.id}
  renderItem={(entry) => entry.text}
/>

<VirtualList
  label="Events"
  orientation="horizontal"
  itemSize="size-96"
  items={entries}
  getKey={(entry) => entry.id}
  getLabel={(entry) => entry.text}
  renderItem={(entry) => entry.text}
  selection={{ selected, onChange: setSelected }}
/>`;

const Overview = overviewStory({
  component: 'VirtualList',
  description: 'A very long list of equal rows where only the rows in view are drawn, with the keys to move through it.',
  points: [
    '`items`, `getKey` and `renderItem` draw the rows; `getKey` returns a stable id for each item.',
    '`rowSize` or `rowHeight` sets one height for every row from a token; `rowHeight` wins.',
    '`orientation="horizontal"` lays a strip out left to right; `itemSize` sets the width of each item.',
    '`selection` picks with click, Ctrl, Shift, Ctrl+A and Space; `getLabel` adds type ahead.',
    '`scrollRef`, `bind`, `overlay` and `getRects` on the `ref` let a marquee pick items.',
    'Arrows, Home, End, Page Up and Page Down move focus; a focused row stays drawn.',
  ],
  instead: '[DataTable] for rows with columns to sort, or [ItemList] for a short list.',
  playground: Playground,
  variants: [Long, Compact, Taller, Short, Strip, Picking],
  states: {
    render: (props: StateProps) => <VirtualListFrame count={40} {...props} />,
    list: FILLED_AND_EMPTY,
  },
  code: CODE,
});

export default meta;
export { Compact, Long, Overview, Picking, Playground, Short, Strip, Taller };
