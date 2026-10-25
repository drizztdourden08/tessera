/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { ItemCard } from '../../src/composites';
import type { ItemCardDensity, ItemCardLayout, ItemCardMediaTone, ItemCardProps } from '../../src/composites';
import { Box, Icon, Image, Stack, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { STATE } from '../_template/states/states.constants';
import { COMPACT_ROWS, TAG_ROWS } from './_samples/item-card-compact.constants';
import { DATA_CARDS, STORE_CARDS } from './_samples/item-card-samples.constants';
import './ItemCard.stories.css';

type ItemCardArgs = {
  density: ItemCardDensity;
  layout: ItemCardLayout;
  mediaTone: ItemCardMediaTone;
  media: boolean;
  actions: boolean;
  selected: boolean;
  opens: boolean;
};

const noop = (): void => undefined;
const SAMPLE: ItemCardProps = STORE_CARDS[0] ?? { title: 'Timespinner' };

const ARGS: Partial<ItemCardArgs> = { density: 'normal', layout: 'top', mediaTone: 'primary', media: true, actions: true, selected: false, opens: true };

const ARG_TYPES: PlaygroundArgTypes<ItemCardArgs> = {
  media: { group: 'Content', control: 'boolean' },
  actions: { group: 'Content', control: 'boolean', description: 'Update, Make a preset and Remove, through an ActionBar.' },
  mediaTone: { group: 'Appearance', control: 'select', options: ['neutral', 'primary', 'info', 'tertiary', 'success', 'warning', 'danger'] },
  density: { group: 'Layout', control: 'select', options: ['normal', 'compact'], description: 'Compact is one row: a 32 px tile, the title, one line and icon actions.' },
  layout: { group: 'Layout', control: 'select', options: ['top', 'left'] },
  selected: { group: 'State', control: 'boolean' },
  opens: { group: 'Behaviour', control: 'boolean', description: 'Passes onOpen, so a click anywhere on the card opens it.' },
};

const meta = {
  title: 'Composites · Content/ItemCard',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ItemCardArgs>;

const one = (props: Partial<ItemCardProps>) => (
  <Box className="item-card-story item-card-story--one"><ItemCard {...SAMPLE} onOpen={noop} {...props} /></Box>
);

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Box className={args.layout === 'left' || args.density === 'compact' ? 'item-card-story item-card-story--two' : 'item-card-story item-card-story--one'}>
      <ItemCard
        {...SAMPLE}
        layout={args.layout}
        density={args.density}
        mediaTone={args.mediaTone}
        media={args.media ? SAMPLE.media : undefined}
        actions={args.actions ? SAMPLE.actions : undefined}
        selected={args.selected}
        onOpen={args.opens ? noop : undefined}
      />
    </Box>
  ),
} satisfies PlaygroundStory<ItemCardArgs>;

const Store = {
  name: 'A store of games, media on top',
  render: () => (
    <Box className="item-card-story">
      {STORE_CARDS.map((card) => <ItemCard key={String(card.title)} {...card} onOpen={noop} />)}
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<ItemCardArgs>;

const Left = {
  name: 'Media on the left, for lists and overviews',
  render: () => (
    <Box className="item-card-story item-card-story--two">
      {DATA_CARDS.map((card) => <ItemCard key={String(card.title)} {...card} />)}
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<ItemCardArgs>;

const Rows = ({ rows }: { rows: readonly ItemCardProps[] }) => (
  <Box className="item-card-story item-card-story--rows">
    {rows.map((row) => <ItemCard key={String(row.title)} {...row} density="compact" onOpen={noop} />)}
  </Box>
);

const Compact = {
  name: 'Compact rows for a long catalogue',
  render: () => <Rows rows={COMPACT_ROWS} />,
} satisfies StoryLiteStoryDefinition<ItemCardArgs>;

const CompactExtras = {
  name: 'Compact with tags, a tooltip, a named tile and a loading action',
  render: () => <Rows rows={TAG_ROWS} />,
} satisfies StoryLiteStoryDefinition<ItemCardArgs>;

const Tile = {
  name: 'A small tile beside the title',
  render: () => one({ mediaSize: 'sm', media: <Icon name="gamepad-2" size={20} /> }),
} satisfies StoryLiteStoryDefinition<ItemCardArgs>;

const Linked = {
  name: 'A link to a page, with no actions',
  render: () => one({ href: '#/story/composites-itemcard--overview', actions: undefined, onOpen: undefined }),
} satisfies StoryLiteStoryDefinition<ItemCardArgs>;

const TALL_MEDIA = (
  <Image aspectRatio="16 / 9" fallback={<Icon name="music" size={40} />} />
);

const Tall = {
  name: 'A picture taller than the band',
  render: () => (
    <Box className="item-card-story">
      <ItemCard title="Hyrule Symphony" eyebrow="Music pack" media={TALL_MEDIA} mediaTone="neutral" details={['band, cut to 96 px']} />
      <ItemCard title="Hyrule Symphony" eyebrow="Music pack" media={TALL_MEDIA} mediaTone="neutral" mediaHeight="auto" details={['auto, the picture keeps 16 by 9']} />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<ItemCardArgs>;

const RoutedCard = () => {
  const [route, setRoute] = useState('/store');
  return (
    <Stack gap="sm" className="item-card-story item-card-story--one">
      <ItemCard {...SAMPLE} actions={undefined} href="/store/timespinner" navigate={setRoute} />
      <Text className="story-label">{`Route: ${route}`}</Text>
    </Stack>
  );
};

const Routed = {
  name: 'Routed by the app, with navigate',
  render: () => <RoutedCard />,
} satisfies StoryLiteStoryDefinition<ItemCardArgs>;

const CODE = `import { ItemCard } from '@drizztdourden08/tessera';

<ItemCard
  media={<Icon name="gamepad-2" size={40} />}
  eyebrow="Official"
  title="Timespinner"
  status={{ label: 'update', tone: 'warning' }}
  tags={[<Tag key="genre" variant="category" color="violet">Metroidvania</Tag>]}
  details={['World 1.2.0', 'For AP 0.6.7', 'Installed 1.1.4']}
  actions={[{ id: 'update', label: 'Update', icon: 'download', kind: 'primary', onSelect: update }]}
  onOpen={() => openGame('timespinner')}
/>

<ItemCard density="compact" title="Timespinner" media={<Icon name="gamepad-2" />} status={{ label: 'update', tone: 'warning' }} details={['World 1.2.0']} actions={[{ id: 'install', label: 'Install', icon: 'download', onSelect: install }]} />

<ItemCard title="Hyrule Symphony" media={<Image src={cover} aspectRatio="16 / 9" />} mediaHeight="auto" href="/store/hyrule-symphony" navigate={navigate} />`;

const Overview = overviewStory({
  component: 'ItemCard',
  description: 'One item of a catalogue as a card: media, a small line, a status, the title, tags, details and actions.',
  points: [
    '`layout` puts the `media` on top for a grid of cards, or on the left for a list or an overview.',
    '`details` take text or nodes, joined with dots, three lines at most; `tags` take [Tag] nodes.',
    '`actions` go through an [ActionBar] with one action in view, the rest under More.',
    '`onOpen` or `href` makes a click anywhere on the card open it; `navigate` routes `href` in the app.',
    '`mediaSize="sm"` swaps the 96 px band for a 32 px tile; `mediaLabel` names a media that means something.',
    '`density="compact"` is one row: a tile, the title, one line, a line of tags with +N, and icon actions.',
  ],
  instead: '[Card] for a box with a header row, or [ListItemRow] for one line per item.',
  playground: Playground,
  variants: [Store, Left, Compact, CompactExtras, Tile, Linked, Routed, Tall],
  states: {
    render: (props: StateProps) => one(props as Partial<ItemCardProps>),
    list: [
      STATE.idle,
      { ...STATE.hover, target: '.item-card' },
      { ...STATE.focus, target: '.item-card__open' },
      STATE.selected,
    ],
  },
  code: CODE,
});

export default meta;
export { Compact, CompactExtras, Left, Linked, Overview, Playground, Routed, Store, Tall, Tile };
