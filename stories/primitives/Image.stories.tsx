/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Box, Image } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { ImageFits } from './_samples/ImageFits';
import { ImageBackdrops } from './_samples/ImageBackdrops';
import { ImageFrames } from './_samples/ImageFrames';
import { ImagePixels } from './_samples/ImagePixels';
import { MISSING_URI as BROKEN_URI } from './_samples/image-frame-samples.constants';
import { DUSK_URI, VALLEY_URI } from './_samples/image-scenes.constants';
import { ImageSaveSlots } from './_samples/ImageSaveSlots';
import { ImageSlowArrival } from './_samples/ImageSlowArrival';
import './Image.stories.css';

type Picture = 'valley' | 'dusk' | 'broken' | 'on its way' | 'none';
type Ratio = 'from the image' | '16 / 9' | '4 / 3' | '1 / 1';

type ImageArgs = {
  picture: Picture;
  alt: string;
  ratio: Ratio;
  placeholder: 'auto' | 'none';
  withFallback: boolean;
};

const SOURCES: Record<Picture, string | undefined> = {
  valley: VALLEY_URI,
  dusk: DUSK_URI,
  broken: BROKEN_URI,
  'on its way': undefined,
  none: undefined,
};

const fallbackNode = <Box className="image-demo__fallback">Screenshot unavailable</Box>;

const ARGS: Partial<ImageArgs> = {
  picture: 'valley',
  alt: 'Screenshot of the valley at midday',
  ratio: 'from the image',
  placeholder: 'auto',
  withFallback: false,
};

const ARG_TYPES: PlaygroundArgTypes<ImageArgs> = {
    picture: {
      group: 'Content',
      control: 'select',
      options: ['valley', 'dusk', 'broken', 'on its way', 'none'],
      description: 'A source that fails, one still on its way (pending, never arrives), or none at all.',
    },
    alt: { group: 'Content', control: 'text' },
    withFallback: { group: 'Content', control: 'boolean', description: 'Custom node drawn when the source fails or is missing.' },
    placeholder: { group: 'Appearance', control: 'select', options: ['auto', 'none'], description: 'Draw the picture outline while loading and when broken.' },
    ratio: { group: 'Layout', control: 'select', options: ['from the image', '16 / 9', '4 / 3', '1 / 1'], description: 'The box the picture takes before it loads.' },
  };

const meta = {
  title: 'Primitives · Display/Image',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ImageArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Image
      key={`${args.picture}-${String(args.withFallback)}`}
      className="image-demo"
      src={SOURCES[args.picture]}
      pending={args.picture === 'on its way'}
      alt={args.alt}
      aspectRatio={args.ratio === 'from the image' ? undefined : args.ratio}
      placeholder={args.placeholder}
      fallback={args.withFallback ? fallbackNode : undefined}
    />
  ),
} satisfies PlaygroundStory<ImageArgs>;

const renderState = (props: StateProps) => (
  <Image className="image-demo" src={DUSK_URI} alt="Screenshot of the ridge at dusk" {...props} />
);

const SlowSource = {
  name: 'A source that arrives after a pause',
  render: () => <ImageSlowArrival />,
} satisfies StoryLiteStoryDefinition<ImageArgs>;

const FALLBACKS = ['source fails', 'no source'] as const;

const WithFallback = {
  name: 'A fallback node',
  render: () => (
    <Demonstrator
      rows={axis(FALLBACKS)}
      cell={(item) => (
        <Image
          className="image-demo"
          src={item === 'source fails' ? BROKEN_URI : undefined}
          alt="Missing screenshot"
          fallback={fallbackNode}
        />
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<ImageArgs>;

const SIZES = ['16 / 9 by default', 'aspect ratio 4 / 3', 'aspect ratio 1 / 1', 'width 240 and height 100'] as const;

const SIZE_PROPS: Record<(typeof SIZES)[number], { aspectRatio?: string; width?: number; height?: number }> = {
  '16 / 9 by default': {},
  'aspect ratio 4 / 3': { aspectRatio: '4 / 3' },
  'aspect ratio 1 / 1': { aspectRatio: '1 / 1' },
  'width 240 and height 100': { width: 240, height: 100 },
};

const Sizes = {
  name: 'Sizes, the box held while loading',
  render: () => (
    <Demonstrator
      rows={axis(SIZES)}
      cell={(size) => <Image className="image-demo" pending alt="Screenshot on its way" {...SIZE_PROPS[size]} />}
    />
  ),
} satisfies StoryLiteStoryDefinition<ImageArgs>;

const Framed = {
  name: 'Framed, at three sizes',
  render: () => <ImageFrames />,
} satisfies StoryLiteStoryDefinition<ImageArgs>;

const SaveSlots = {
  name: 'Framed, in a list of save slots',
  render: () => <ImageSaveSlots />,
} satisfies StoryLiteStoryDefinition<ImageArgs>;

const Fits = {
  name: 'fit, in a 16 by 9 frame',
  render: () => <ImageFits />,
} satisfies StoryLiteStoryDefinition<ImageArgs>;

const Pixels = {
  name: 'pixelated, sharp sprites',
  render: () => <ImagePixels />,
} satisfies StoryLiteStoryDefinition<ImageArgs>;

const Backdrops = {
  name: 'backdrop checker and fit integer, a sprite at whole-number scale',
  render: () => <ImageBackdrops />,
} satisfies StoryLiteStoryDefinition<ImageArgs>;

const Overview = overviewStory({
  component: 'Image',
  description: 'The image element of the design system, which holds its space so the layout never jumps while it loads.',
  points: [
    'It takes its box from `width` and `height` or `aspectRatio`, and falls back to 16 / 9.',
    'Loading pulses a picture outline; a failed source shows it with a cross, and `fallback` replaces it.',
    '`pending` marks a source that is still on its way; `fit` sets how it fills its box, `cover` by default.',
    '`fit="integer"` draws a sprite at the largest whole-number scale; `backdrop="checker"` shows its holes.',
    '`frame` rounds the corners and keeps a small picture from shrinking in a row; set its size with a class.',
    '`pixelated` keeps a sprite sharp, `auto` at 256 px or less; `usePixelArt` tells the same for your own img.',
  ],
  instead: '[Video] for moving pictures.',
  playground: Playground,
  variants: [SlowSource, WithFallback, Sizes, Fits, Pixels, Backdrops, Framed, SaveSlots],
  states: {
    render: renderState,
    list: [
      { name: 'Loaded' },
      { name: 'Empty', props: { src: undefined } },
      { ...STATE.loading, props: { src: undefined, pending: true } },
      { ...STATE.error, name: 'Broken', props: { src: BROKEN_URI } },
    ],
  },
});

export default meta;
export { Backdrops, Fits, Framed, Overview, Pixels, Playground, SaveSlots, Sizes, SlowSource, WithFallback };
