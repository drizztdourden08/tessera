/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { axis } from '../_template/axis';
import type { PlaygroundStory } from '../_template/controls/playground.type';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { PreviewCards } from './_shared/PreviewCards';
import { Rating } from './Rating/Rating';
import type { RatingSize } from './Rating/Rating.type';
import { RatingCards } from './Rating/_samples/RatingCards';
import { RatingPanelSample } from './Rating/_samples/RatingPanelSample';
import { RatingPick } from './Rating/_samples/RatingPick';
import { RATING_CHOICES, RATING_CODE, RATING_MAPPING } from './Rating/_samples/rating-story.constants';
import './Rating.stories.css';

type RatingArgs = { value: number; rated: boolean; count: number; showValue: boolean; size: RatingSize; pick: boolean; disabled: boolean };

const meta = {
  title: 'Preview · For approval/Rating',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<RatingArgs>;

const Playground = {
  name: 'Playground',
  args: { value: 4.6, rated: true, count: 212, showValue: true, size: 'md', pick: false, disabled: false },
  argTypes: {
    value: { group: 'Value', control: 'range', min: 0, max: 5, step: 0.1, description: 'The average. It is drawn to the nearest half star.' },
    rated: { group: 'Value', control: 'boolean', description: 'Off passes null: nobody has rated it yet.' },
    count: { group: 'Content', control: 'number', description: 'How many ratings, shown after the stars.' },
    showValue: { group: 'Content', control: 'boolean' },
    size: { group: 'Appearance', control: 'select', options: ['sm', 'md', 'lg'] },
    pick: { group: 'Behaviour', control: 'boolean', description: 'Passes onChange, so the stars become a picker.' },
    disabled: { group: 'State', control: 'boolean' },
  },
  render: (args) => (args.pick
    ? <RatingPick key={args.size} size={args.size} disabled={args.disabled} />
    : <Rating value={args.rated ? args.value : null} count={args.count} showValue={args.showValue} size={args.size} />),
} satisfies PlaygroundStory<RatingArgs>;

const Sizes = {
  name: 'Sizes',
  render: () => <Demonstrator rows={axis(['sm', 'md', 'lg'] as const)} cell={(size) => <Rating value={4.6} count={212} showValue size={size} />} />,
} satisfies StoryLiteStoryDefinition<RatingArgs>;

const Halves = {
  name: 'Half stars',
  render: () => <Demonstrator rows={axis(['5', '4.6', '3.8', '2.3', '1', '0'] as const)} cell={(value) => <Rating value={Number(value)} showValue />} />,
} satisfies StoryLiteStoryDefinition<RatingArgs>;

const Pick = {
  name: 'Pick a rating',
  render: () => <RatingPick />,
} satisfies StoryLiteStoryDefinition<RatingArgs>;

const Cards = {
  name: 'On store cards',
  render: () => <RatingCards />,
} satisfies StoryLiteStoryDefinition<RatingArgs>;

const Panel = {
  name: 'The ratings panel of an item page',
  render: () => <RatingPanelSample />,
} satisfies StoryLiteStoryDefinition<RatingArgs>;

const Overview = overviewStory({
  component: 'Rating',
  description: 'For approval, not a released part: stars that show how well something is rated, and let a person rate it.',
  points: [
    '**For approval:** this page lives in the gallery only; nothing on it ships until the owner picks an option.',
    'Shows an average to the nearest half star, with the number and the count beside it if you ask.',
    '`null` means nobody has rated it yet: the stars fade and screen readers hear Not rated yet.',
    'With `onChange` it becomes a picker: tap a star, or use the arrow keys, Home and End.',
    'Screen readers hear one sentence, such as 4.6 out of 5, from 212 ratings.',
  ],
  instead: '[Slider] to pick any number on a track; [SegmentedControl] to pick one of a few named options.',
  playground: Playground,
  variants: [Sizes, Halves, Pick, Cards, Panel],
  sections: [
    { title: 'What it replaces', node: <PreviewCards entries={RATING_MAPPING} /> },
    { title: 'Options weighed', node: <PreviewCards entries={RATING_CHOICES} /> },
  ],
  code: RATING_CODE,
});

export default meta;
export { Cards, Halves, Overview, Panel, Pick, Playground, Sizes };
