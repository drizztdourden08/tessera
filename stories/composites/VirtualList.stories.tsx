/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { VirtualListActive } from './_samples/VirtualListActive';
import { VirtualListFrame } from './_samples/VirtualListFrame';
import { VirtualListOuter } from './_samples/VirtualListOuter';
import { VirtualListPicker } from './_samples/VirtualListPicker';
import { VirtualListReorder } from './_samples/VirtualListReorder';
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

const Outer = {
  name: 'A strip in a ScrollArea: the area scrolls, drag a row to its edge, Enter picks, the tab stop starts on Event 4',
  render: () => <VirtualListOuter />,
} satisfies StoryLiteStoryDefinition<VirtualListArgs>;

const Picking = {
  name: 'Selection: click, Ctrl, Shift, Ctrl+A, Space, Shift with an arrow, and type ahead',
  render: () => <VirtualListPicker count={5000} />,
} satisfies StoryLiteStoryDefinition<VirtualListArgs>;

const Moving = {
  name: 'Rows of different heights, an end gutter and a move: drag a row or press Alt with an arrow',
  render: () => <VirtualListReorder />,
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
/>

<ScrollArea axis="x">
  <VirtualList
    label="Events"
    orientation="horizontal"
    itemSize="size-96"
    items={entries}
    getKey={(entry) => entry.id}
    renderItem={(entry) => entry.text}
    scrollParent="auto"
    initialFocusIndex={current}
    onPick={(index, event) => open(entries[index])}
  />
</ScrollArea>

<VirtualList
  label="Events"
  items={entries}
  getKey={(entry) => entry.id}
  itemSize={(at) => (entries[at].tall ? 64 : 40)}
  itemSizeKey={order}
  endGutter={48}
  current={activeKey}
  ownsKey={(event) => event.key === 'Delete'}
  renderOption={(entry, at, cell) => <Row {...cell}>{entry.text}</Row>}
  reorder={{ onMove, canDrop, dropLabel: (position) => \`Move to \${position}\` }}
/>`;

const Overview = overviewStory({
  component: 'VirtualList',
  description: 'A very long list of rows where only the rows in view are drawn, with the keys to move through it.',
  points: [
    '`items`, `getKey` and `renderItem` draw the rows; `renderOption` draws a row from the cell props.',
    '`rowSize` or `rowHeight` sets one height from a token; `itemSize` as a function sets each height.',
    '`orientation="horizontal"` lays out a strip; `scrollParent` lets an outer ScrollArea scroll it.',
    '`selection` picks with click, Ctrl, Shift, Ctrl+A and Space; `getLabel` adds type ahead.',
    '`reorder` moves rows by drag or Alt with an arrow; `scrollRef`, `bind` and `overlay` let a marquee pick.',
    'Arrows move focus; `onPick` runs on click or Enter; `initialFocusIndex` sets the first tab stop.',
  ],
  instead: '[DataTable] for rows with columns to sort, or [ItemList] for a short list.',
  playground: Playground,
  variants: [Long, Compact, Taller, Short, Strip, Outer, Picking, Moving],
  states: {
    render: (props: StateProps) => <VirtualListFrame count={40} {...props} />,
    list: FILLED_AND_EMPTY,
  },
  code: CODE,
});

export default meta;
export { Compact, Long, Moving, Outer, Overview, Picking, Playground, Short, Strip, Taller };
