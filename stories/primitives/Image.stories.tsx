/* @layer stories @kind story */
import { useEffect, useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, Button, Image } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
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

const sceneUri = (sky: string, ground: string, label: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 90' width='320' height='180'>`
    + `<rect width='160' height='90' fill='${sky}'/>`
    + `<circle cx='124' cy='24' r='10' fill='#f4d35e'/>`
    + `<path d='M0 70 L40 44 L70 62 L104 36 L160 68 V90 H0Z' fill='${ground}'/>`
    + `<text x='8' y='84' font-family='monospace' font-size='8' fill='#ffffff'>${label}</text>`
    + `</svg>`,
  )}`;

const BROKEN_URI = 'data:image/png;base64,bm90LWFuLWltYWdl';
const VALLEY_URI = sceneUri('#7fb3d5', '#3d7a4a', 'Valley, 14:02');
const DUSK_URI = sceneUri('#5b4a7a', '#2e3b4e', 'Ridge, 19:40');
const ARRIVAL_MS = 2500;

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

const ARG_TYPES: StoryLiteArgTypes<ImageArgs> = {
    picture: {
      control: 'select',
      options: ['valley', 'dusk', 'broken', 'on its way', 'none'],
      description: 'A source that fails, one still on its way (pending, never arrives), or none at all.',
    },
    alt: { control: 'text' },
    ratio: { control: 'select', options: ['from the image', '16 / 9', '4 / 3', '1 / 1'], description: 'The box the picture takes before it loads.' },
    placeholder: { control: 'select', options: ['auto', 'none'], description: 'Draw the picture outline while loading and when broken.' },
    withFallback: { control: 'boolean', description: 'Custom node drawn when the source fails or is missing.' },
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
} satisfies StoryLiteStoryDefinition<ImageArgs>;

const renderState = (props: StateProps) => (
  <Image className="image-demo" src={DUSK_URI} alt="Screenshot of the ridge at dusk" {...props} />
);

const Arrival = () => {
  const [arrived, setArrived] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setArrived(true), ARRIVAL_MS);
    return () => clearTimeout(timer);
  }, []);
  return <Image className="image-demo" src={arrived ? VALLEY_URI : undefined} pending alt="Screenshot of the valley at midday" />;
};

const SlowArrival = () => {
  const [round, setRound] = useState(0);
  return (
    <Box className="story-column">
      <Arrival key={round} />
      <Box>
        <Button size="sm" variant="secondary" onClick={() => setRound((value) => value + 1)}>Load again</Button>
      </Box>
    </Box>
  );
};

const SlowSource = {
  name: 'A source that arrives after a pause',
  render: () => <SlowArrival />,
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

const Overview = overviewStory({
  component: 'Image',
  description: 'The image element of the design system, with every img attribute passed through. It holds the box the picture will take, from width and height, an aspect ratio, or 16 / 9 by default, so the layout never jumps. While the source loads it draws a picture outline that pulses, and a source that fails shows the same outline in the danger colour with a cross. A fallback node replaces the outline when the source fails or is missing. pending marks a source that is still on its way.',
  playground: Playground,
  variants: [SlowSource, WithFallback, Sizes],
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
export { Overview, Playground, Sizes, SlowSource, WithFallback };
