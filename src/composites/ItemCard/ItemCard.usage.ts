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
  ],
  a11y: [
    'The title is a heading, level 3 by default, so a screen reader can jump from card to card.',
    'With onOpen or href the title is the one button or link of the card; a click anywhere on the card goes through it, and the focus ring circles the card.',
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
  propsHash: 'b8aee39c4a4e7c0c',
} satisfies ComponentUsage;

export { usage };
