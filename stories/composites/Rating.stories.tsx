/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Rating } from '../../src/composites';
import type { RatingSize } from '../../src/composites';
import { axis } from '../_template/axis';
import type { PlaygroundStory } from '../_template/controls/playground.type';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { RatingCards } from './_samples/RatingCards';
import { RatingPanelSample } from './_samples/RatingPanelSample';
import { RatingPick } from './_samples/RatingPick';
import { RATING_CODE } from './_samples/rating-story.constants';
import './Rating.stories.css';

type RatingArgs = { value: number; rated: boolean; count: number; showValue: boolean; size: RatingSize; pick: boolean; disabled: boolean };

const meta = {
  title: 'Composites · Content/Rating',
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

const Unrated = {
  name: 'Not rated yet',
  render: () => <Rating value={null} count={0} />,
} satisfies StoryLiteStoryDefinition<RatingArgs>;

const Pick = {
  name: 'Pick a rating',
  render: () => <RatingPick />,
} satisfies StoryLiteStoryDefinition<RatingArgs>;

const PickDisabled = {
  name: 'A picker that is off',
  render: () => <RatingPick disabled />,
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
  description: 'Stars that show how well something is rated, and let a person rate it.',
  points: [
    'Shows an average to the nearest half star, with the number and the count beside it if you ask.',
    '`null` means nobody has rated it yet: the stars fade and screen readers hear Not rated yet.',
    'Screen readers hear one sentence, such as 4.6 out of 5, from 212 ratings.',
    'With `onChange` it becomes a picker: tap a star, or use the arrow keys, Home and End.',
    'The picker is one Tab stop, a radio group with a radio per star; `disabled` turns it off.',
    'Three sizes, sm, md and lg; the stars take the main colour of the app.',
  ],
  instead: '[Slider] to pick any number on a track; [SegmentedControl] to pick one of a few named options.',
  playground: Playground,
  variants: [Sizes, Halves, Unrated, Pick, PickDisabled, Cards, Panel],
  code: RATING_CODE,
});

export default meta;
export { Cards, Halves, Overview, Panel, Pick, PickDisabled, Playground, Sizes, Unrated };
