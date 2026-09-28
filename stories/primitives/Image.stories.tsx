/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, Image, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import './Image.stories.css';

type Picture = 'valley' | 'dusk' | 'broken';

type ImageArgs = {
  picture: Picture;
  alt: string;
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

const SOURCES: Record<Picture, string> = {
  valley: sceneUri('#7fb3d5', '#3d7a4a', 'Valley, 14:02'),
  dusk: sceneUri('#5b4a7a', '#2e3b4e', 'Ridge, 19:40'),
  broken: BROKEN_URI,
};

const fallbackNode = <Box className="image-demo__fallback">Screenshot unavailable</Box>;

const ARGS: Partial<ImageArgs> = { picture: 'valley', alt: 'Screenshot of the valley at midday', withFallback: true };

const ARG_TYPES: StoryLiteArgTypes<ImageArgs> = {
    picture: { control: 'select', options: ['valley', 'dusk', 'broken'] },
    alt: { control: 'text' },
    withFallback: { control: 'boolean', description: 'Placeholder drawn when the source fails.' },
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
      alt={args.alt}
      fallback={args.withFallback ? fallbackNode : undefined}
    />
  ),
} satisfies StoryLiteStoryDefinition<ImageArgs>;

const LoadFailure = {
  name: 'Load failure',
  render: () => (
    <Box className="story-row">
      <Box className="story-column">
        <Text className="story-label">loads</Text>
        <Image className="image-demo" src={SOURCES.dusk} alt="Screenshot of the ridge at dusk" />
      </Box>
      <Box className="story-column">
        <Text className="story-label">fails, with fallback</Text>
        <Image className="image-demo" src={BROKEN_URI} alt="Missing screenshot" fallback={fallbackNode} />
      </Box>
      <Box className="story-column">
        <Text className="story-label">fails, no fallback</Text>
        <Image className="image-demo" src={BROKEN_URI} alt="Missing screenshot" />
      </Box>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<ImageArgs>;

const Overview = overviewStory({
  component: 'Image',
  description: 'The image element of the design system, with every img attribute passed through. Give it a fallback and a source that fails to load is replaced by that placeholder, not the browser\'s broken-image glyph. The failure is remembered per source, so a new src gets a fresh attempt.',
  playground: Playground,
  variants: [LoadFailure],
});

export default meta;
export { LoadFailure, Overview, Playground };
