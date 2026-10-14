/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { FeaturedCarousel } from './_samples/FeaturedCarousel';
import { TipsCarousel } from './_samples/TipsCarousel';
import { CAROUSEL_CODE } from './_samples/carousel-story.constants';
import './Carousel.stories.css';

type CarouselArgs = { turns: boolean; seconds: number };

const meta = {
  title: 'Composites · Content/Carousel',
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
  description: 'One slide at a time from a set, with dots and arrows to move between them.',
  points: [
    'A slide can be anything: a Hero, a card, a picture.',
    'Dots and arrows move between slides; `index` and `onIndexChange` let the app hold the place.',
    'With `turnEvery` it turns by itself, and a stop button stops it.',
    'It never turns under the pointer, on focus, on a hidden tab, off screen or with reduced motion.',
    'Slides keep one height, so the page never jumps.',
    'Screen readers hear a new slide only when a person moves it, never while it turns.',
  ],
  instead: '[Grid] or [ItemCard] to show every item at once; [Tabs] when each slide has a name to pick.',
  playground: Playground,
  variants: [Featured, Tips],
  code: CAROUSEL_CODE,
});

export default meta;
export { Featured, Overview, Playground, Tips };
