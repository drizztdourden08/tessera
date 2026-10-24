/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { VirtualSize } from '../../src/composites';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { VirtualGridActive } from './_samples/VirtualGridActive';
import { VirtualGridFrame } from './_samples/VirtualGridFrame';
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

const CODE = `import { VirtualGrid } from '@drizztdourden08/tessera';

<VirtualGrid
  label="Frames"
  items={frames}
  getKey={(frame) => frame.id}
  renderItem={(frame) => frame.name}
  tileSize="size-64"
/>`;

const Overview = overviewStory({
  component: 'VirtualGrid',
  description: 'A very long grid of equal square tiles where only the rows in view are drawn, with the keys to move through it.',
  points: [
    '`items`, `getKey` and `renderItem` draw the tiles; `getKey` returns a stable id for each item.',
    '`tileSize` is a size token name; the columns that fit the width are worked out from it.',
    '`overscan` draws extra rows on each side of the view so a fast scroll shows no gap.',
    'Arrows move by a tile or a row; Home, End, Page Up and Page Down jump, and Ctrl goes to the ends.',
    'A tile that holds focus stays drawn when it scrolls out of view.',
  ],
  instead: '[VirtualList] for rows in a column, or [ItemCard] for a few cards.',
  playground: Playground,
  variants: [Long, Small, Few],
  states: {
    render: (props: StateProps) => <VirtualGridFrame count={40} {...props} />,
    list: FILLED_AND_EMPTY,
  },
  code: CODE,
});

export default meta;
export { Few, Long, Overview, Playground, Small };
