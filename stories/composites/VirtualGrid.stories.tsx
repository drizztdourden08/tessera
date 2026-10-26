/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { VirtualSize } from '../../src/composites';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { VirtualGridActive } from './_samples/VirtualGridActive';
import { VirtualGridButtons } from './_samples/VirtualGridButtons';
import { VirtualGridFolders } from './_samples/VirtualGridFolders';
import { VirtualGridFrame } from './_samples/VirtualGridFrame';
import { VirtualGridJump } from './_samples/VirtualGridJump';
import { VirtualGridMarquee } from './_samples/VirtualGridMarquee';
import { FILLED_AND_EMPTY } from './_samples/virtual-states.constants';
import './VirtualGrid.stories.css';

type VirtualGridArgs = {
  count: number;
  tileSize: VirtualSize;
};

const TILE_SIZES = ['size-48', 'size-64', 'size-96', 'size-128'] as const;

const ARGS: Partial<VirtualGridArgs> = { count: 2000, tileSize: 'size-96' };

const ARG_TYPES: PlaygroundArgTypes<VirtualGridArgs> = {
  count: { group: 'Content', control: 'range', min: 0, max: 5000, step: 100, description: 'How many tiles the grid holds; only the rows in view are drawn.' },
  tileSize: { group: 'Appearance', control: 'select', options: TILE_SIZES, description: 'The side of every tile, from a size token.' },
};

const meta = {
  title: 'Composites · Lists/VirtualGrid',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<VirtualGridArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <VirtualGridFrame count={args.count} tileSize={args.tileSize} />,
} satisfies PlaygroundStory<VirtualGridArgs>;

const Long = {
  name: '2000 tiles: click a tile, then use the arrows, Home, End, Page Up and Page Down',
  render: () => <VirtualGridActive />,
} satisfies StoryLiteStoryDefinition<VirtualGridArgs>;

const Small = {
  name: 'Small tiles',
  render: () => <VirtualGridFrame count={2000} tileSize="size-48" />,
} satisfies StoryLiteStoryDefinition<VirtualGridArgs>;

const Few = {
  name: 'Three tiles',
  render: () => <VirtualGridFrame count={3} />,
} satisfies StoryLiteStoryDefinition<VirtualGridArgs>;

const Wide = {
  name: 'Wide tiles with tileWidth and tileHeight',
  render: () => <VirtualGridFrame count={600} tileWidth="size-128" tileHeight="size-64" />,
} satisfies StoryLiteStoryDefinition<VirtualGridArgs>;

const Folders = {
  name: 'Folders with actions and depth: click a header, or use Enter, Space, Left and Right on it',
  render: () => <VirtualGridFolders folders={6} perFolder={40} />,
} satisfies StoryLiteStoryDefinition<VirtualGridArgs>;

const Marquee = {
  name: 'Marquee: drag over the gaps to pick tiles, even those not drawn',
  render: () => <VirtualGridMarquee count={300} />,
} satisfies StoryLiteStoryDefinition<VirtualGridArgs>;

const Jump = {
  name: 'Scroll to an index with the ref',
  render: () => <VirtualGridJump count={2000} />,
} satisfies StoryLiteStoryDefinition<VirtualGridArgs>;

const Buttons = {
  name: 'Button tiles: the tile is the cell, one tab stop for the grid',
  render: () => <VirtualGridButtons count={300} />,
} satisfies StoryLiteStoryDefinition<VirtualGridArgs>;

const CODE = `import { VirtualGrid } from '@drizztdourden08/tessera';

<VirtualGrid
  label="Frames"
  items={frames}
  getKey={(frame) => frame.id}
  renderItem={(frame) => frame.name}
  tileSize="size-64"
/>

<VirtualGrid
  ref={gridRef}
  label="Folders"
  sections={folders}
  getKey={(frame) => frame.id}
  renderItem={(frame) => frame.name}
  tileWidth="size-128"
  tileHeight="size-64"
  onToggleSection={(key, collapsed) => remember(key, collapsed)}
/>

<VirtualGrid
  label="Frames"
  items={frames}
  getKey={(frame) => frame.id}
  renderTile={(frame, index, cell) => <Button {...cell} onClick={() => open(frame)}>{frame.name}</Button>}
/>

gridRef.current?.scrollToIndex(1200, 'center');

const marquee = useMarqueeSelect({ containerRef, selected, onChange, getRects: () => gridRef.current?.getRects() ?? [] });`;

const Overview = overviewStory({
  component: 'VirtualGrid',
  description: 'A very long grid of equal tiles, in sections if wanted, where only the rows in view are drawn, with the keys to move through it.',
  points: [
    '`items`, `getKey` and `renderItem` draw the tiles; `getKey` returns a stable id for each item.',
    '`tileSize` sets a square tile; `tileWidth` and `tileHeight` size a tile that is not square.',
    '`sections` groups the tiles under collapsing headers; a section takes `actions` and `depth`.',
    '`scrollRef`, `bind` and `overlay` let a marquee pick tiles; each tile carries `data-marquee-key`.',
    'A `ref` gives `scrollToIndex(index, align)` and `getRects()`, the rects of all tiles for a marquee.',
    '`renderTile` hands the cell props to the app tile, so a button tile is the cell and the one tab stop.',
  ],
  instead: '[VirtualList] for rows in a column, or [ItemCard] for a few cards.',
  playground: Playground,
  variants: [Long, Small, Few, Wide, Folders, Marquee, Jump, Buttons],
  states: {
    render: (props: StateProps) => <VirtualGridFrame count={40} {...props} />,
    list: FILLED_AND_EMPTY,
  },
  code: CODE,
});

export default meta;
export { Buttons, Few, Folders, Jump, Long, Marquee, Overview, Playground, Small, Wide };
