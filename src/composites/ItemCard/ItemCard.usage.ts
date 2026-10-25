/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'One item of a catalogue as a card: media, a small line above the title, a status, the title, tags, details and its actions.',
  useWhen: [
    'A screen lists things to browse and pick from as a grid of cards, such as games in a store, mods or saves.',
    'An overview shows a few areas side by side, each with a figure, a short summary and an action, with the media on the left.',
  ],
  avoidWhen: [
    { case: 'A box of content under a header row with its own actions.', use: 'Card' },
    { case: 'Many items read as one line each, in a list.', use: 'ListItemRow' },
    { case: 'One headline number with its change and a small chart.', use: 'StatTile' },
  ],
  rules: [
    'Keep the title to the name of the item, and put the source or the kind in eyebrow, such as Official.',
    'Write details as short facts, such as World 1.2.0 and For AP 0.6.7; they join with dots and stop at three lines.',
    'Give the main action kind primary; one other shows and the rest fold under More, danger ones asking first.',
    'Pass onOpen or href when the card opens a page of its own, and selected for the item open beside the list.',
    'With href, pass navigate to route a plain click inside the app, as Link and SiteHeader take it.',
    'Set mediaHeight auto when the media is a picture taller than the 96 px band, such as a 16 by 9 cover.',
    'Set density compact for a long catalogue with no pictures: one row of about 56 px with the media as a 32 px tile, the title, one line and up to three icon actions.',
    'Set mediaSize sm to swap the 96 px band for a 32 px tile beside the title; compact does this itself.',
    'In a VirtualList row, give the list a rowHeight of about 56 px; the compact card fills the row width and sets no height of its own.',
  ],
  a11y: [
    'The title is a heading, level 3 by default, so a screen reader can jump from card to card.',
    'With onOpen or href the title is the one button or link of the card; a click anywhere on the card goes through it, and the focus ring circles the card.',
    'Compact actions are icon buttons whose label is their accessible name and their tooltip; give each action an icon.',
    'The selected card marks its title with aria-current; the media is hidden from screen readers.',
  ],
  tree: {
    path: ['data', 'items of a catalogue, as cards'],
    rule: 'ItemCard gives every catalogue the same card, with its media, facts and actions in fixed places.',
  },
  example: `import { ItemCard } from '@drizztdourden08/tessera';
import { Icon, Tag } from '@drizztdourden08/tessera';

interface GameCardProps {
  name: string;
  genre: string;
  version: string;
  onInstall: () => void;
  onOpen: () => void;
}

const GameCard = ({ name, genre, version, onInstall, onOpen }: GameCardProps) => (
  <ItemCard
    media={<Icon name="gamepad-2" size={40} />}
    eyebrow="Official"
    title={name}
    status={{ label: 'stable', tone: 'info' }}
    tags={[<Tag key="genre" variant="category" color="violet">{genre}</Tag>]}
    details={[\`World \${version}\`, 'For AP 0.6.7']}
    actions={[{ id: 'install', label: 'Install', icon: 'download', kind: 'primary', onSelect: onInstall }]}
    onOpen={onOpen}
  />
);
`,
  propsHash: '013de868072c7a71',
} satisfies ComponentUsage;

export { usage };
