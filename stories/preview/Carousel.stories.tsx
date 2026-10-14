/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { PreviewCards } from './_shared/PreviewCards';
import { FeaturedCarousel } from './Carousel/_samples/FeaturedCarousel';
import { TipsCarousel } from './Carousel/_samples/TipsCarousel';
import { CAROUSEL_CHOICES, CAROUSEL_CODE, CAROUSEL_MAPPING } from './Carousel/_samples/carousel-story.constants';
import './Carousel.stories.css';

type CarouselArgs = { turns: boolean; seconds: number };

const meta = {
  title: 'Preview · For approval/Carousel',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<CarouselArgs>;

const Playground = {
  name: 'Playground',
  args: { turns: true, seconds: 8 },
  argTypes: {
    turns: { group: 'Behaviour', control: 'boolean', description: 'Passes turnEvery, so it turns by itself and shows a stop button.' },
    seconds: { group: 'Behaviour', control: 'range', min: 3, max: 15, step: 1, description: 'Seconds on each slide.' },
  },
  render: (args) => <FeaturedCarousel key={`${args.turns}-${args.seconds}`} turnEvery={args.turns ? args.seconds * 1000 : null} />,
} satisfies PlaygroundStory<CarouselArgs>;

const Featured = {
  name: 'Featured packs on the store home page',
  render: () => <FeaturedCarousel />,
} satisfies StoryLiteStoryDefinition<CarouselArgs>;

const Tips = {
  name: 'Tips in a card, turned by hand',
  render: () => <TipsCarousel />,
} satisfies StoryLiteStoryDefinition<CarouselArgs>;

const Overview = overviewStory({
  component: 'Carousel',
  description: 'For approval, not a released part: one slide at a time from a set, with dots and arrows to move between them.',
  points: [
    '**For approval:** this page lives in the gallery only; nothing on it ships until the owner picks an option.',
    'A slide can be anything: a Hero, a card, a picture.',
    'With `turnEvery` it turns by itself, and a button stops it.',
    'It never turns under the pointer, on focus, on a hidden tab, off screen or with reduced motion.',
    'Slides keep one height, so the page never jumps; screen readers hear a slide only when moved by hand.',
  ],
  instead: '[Grid] or [ItemCard] to show every item at once; [Tabs] when each slide has a name to pick.',
  playground: Playground,
  variants: [Featured, Tips],
  sections: [
    { title: 'What it replaces', node: <PreviewCards entries={CAROUSEL_MAPPING} /> },
    { title: 'Options weighed', node: <PreviewCards entries={CAROUSEL_CHOICES} /> },
  ],
  code: CAROUSEL_CODE,
});

export default meta;
export { Featured, Overview, Playground, Tips };
