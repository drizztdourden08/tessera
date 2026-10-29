/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { TileDemo, TileRatios, TileRow } from './_samples/TileDemo';

type TileArgs = { name: string; width: 'md' | 'lg'; mediaAspect: string; selected: boolean; focused: boolean; corners: boolean };

const ARGS: TileArgs = { name: 'hero-idle.png', width: 'md', mediaAspect: '1', selected: false, focused: false, corners: true };

const ARG_TYPES: PlaygroundArgTypes<TileArgs> = {
  name: { group: 'Content', control: 'text', description: 'The one line under the media.' },
  corners: { group: 'Content', control: 'boolean', description: 'A mark in each of the four corners.' },
  width: { group: 'Layout', control: 'select', options: ['md', 'lg'], description: 'The width the host gives the tile; the media keeps its shape.' },
  mediaAspect: { group: 'Layout', control: 'select', options: ['1', '4/3', '16/9', '3/4'], description: 'The shape of the media; a square by default.' },
  selected: { group: 'State', control: 'boolean' },
  focused: { group: 'State', control: 'boolean', description: 'The focus ring of a tile the grid marks as active.' },
};

const meta = {
  title: 'Composites · Data views/Tile',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<TileArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <TileDemo {...args} />,
} satisfies PlaygroundStory<TileArgs>;

const Row = {
  name: 'A row of tiles: selected, focused and a long name cut with an ellipsis',
  render: () => <TileRow />,
} satisfies StoryLiteStoryDefinition<TileArgs>;

const Plain = {
  name: 'Media and a name only',
  render: () => <TileDemo corners={false} />,
} satisfies StoryLiteStoryDefinition<TileArgs>;

const Ratios = {
  name: 'Media ratios with mediaAspect: 1, 4/3, 16/9 and 3/4',
  render: () => <TileRatios />,
} satisfies StoryLiteStoryDefinition<TileArgs>;

const CODE = `import { Badge, Image, Tile } from '@drizztdourden08/tessera';

<Tile
  name="hero-idle.png"
  mediaAspect="4/3"
  selected={picked}
  media={<Image src={src} alt="" fit="integer" backdrop="checker" pixelated />}
  corners={{
    topStart: <Badge variant="inline" value="PNG" color="info" />,
    bottomEnd: <Badge variant="inline" value={4} label="Frame count" />,
  }}
/>`;

const Overview = overviewStory({
  component: 'Tile',
  description: 'One square tile of a grid: media, a name line and up to four marks in its corners.',
  points: [
    '`media` fills a square, such as an [Image] with `fit="integer"` and `backdrop="checker"`.',
    '`mediaAspect` sets another shape, such as `4/3`, `16/9` or `1.5`; the default is a square.',
    '`name` is the one line under it; a long name is cut with an ellipsis.',
    '`corners` takes `topStart`, `topEnd`, `bottomStart` and `bottomEnd`; a [Badge] or an [Icon] fits.',
    '`selected` and `focused` are looks the grid passes in; they stay apart, so a focus ring never hides a pick.',
    'Pass `role`, `tabIndex` and handlers from a [VirtualGrid]; the tile fills its cell.',
  ],
  instead: '[ItemCard] for a catalogue item with tags, details and actions.',
  playground: Playground,
  variants: [Row, Plain, Ratios],
  code: CODE,
});

export default meta;
export { Overview, Plain, Playground, Ratios, Row };
