/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { ItemCard } from '../../src/composites';
import type { ItemCardLayout, ItemCardMediaTone, ItemCardProps } from '../../src/composites';
import { Box } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { STATE } from '../_template/states/states.constants';
import { DATA_CARDS, STORE_CARDS } from './_samples/item-card-samples.constants';
import './ItemCard.stories.css';

type ItemCardArgs = {
  layout: ItemCardLayout;
  mediaTone: ItemCardMediaTone;
  media: boolean;
  actions: boolean;
  selected: boolean;
  opens: boolean;
};

const noop = (): void => undefined;
const SAMPLE: ItemCardProps = STORE_CARDS[0] ?? { title: 'Timespinner' };

const ARGS: Partial<ItemCardArgs> = { layout: 'top', mediaTone: 'primary', media: true, actions: true, selected: false, opens: true };

const ARG_TYPES: PlaygroundArgTypes<ItemCardArgs> = {
  media: { group: 'Content', control: 'boolean' },
  actions: { group: 'Content', control: 'boolean', description: 'Update, Make a preset and Remove, through an ActionBar.' },
  mediaTone: { group: 'Appearance', control: 'select', options: ['neutral', 'primary', 'info', 'success', 'warning', 'danger'] },
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
    <Box className={args.layout === 'left' ? 'item-card-story item-card-story--two' : 'item-card-story item-card-story--one'}>
      <ItemCard
        {...SAMPLE}
        layout={args.layout}
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

const Linked = {
  name: 'A link to a page, with no actions',
  render: () => one({ href: '#/story/composites-itemcard--overview', actions: undefined, onOpen: undefined }),
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
/>`;

const Overview = overviewStory({
  component: 'ItemCard',
  description: 'One item of a catalogue as a card: media, a small line, a status, the title, tags, details and actions.',
  points: [
    '`layout` puts the `media` on top for a grid of cards, or on the left for a list or an overview.',
    '`details` join with dots and stop at three lines; `tags` take [Tag] nodes.',
    '`actions` go through an [ActionBar] with one action in view, the rest under More.',
    '`onOpen` or `href` makes a click anywhere on the card open it; the title takes the focus.',
    '`selected` draws the primary border, such as the item open beside the list.',
  ],
  instead: '[Card] for a box with a header row, or [ListItemRow] for one line per item.',
  playground: Playground,
  variants: [Store, Left, Linked],
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
export { Left, Linked, Overview, Playground, Store };
