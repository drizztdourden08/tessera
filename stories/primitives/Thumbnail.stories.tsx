/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Box, Flex, Stack, Text, Thumbnail } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import './Thumbnail.stories.css';

type ThumbSize = 'sm' | 'md' | 'lg';
type Picture = 'cellar' | 'ruins' | 'broken' | 'on its way' | 'none';

type ThumbnailArgs = {
  picture: Picture;
  size: ThumbSize;
  alt: string;
  placeholder: string;
};

const roomUri = (floor: string, wall: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 90'>`
    + `<rect width='160' height='90' fill='${wall}'/>`
    + `<rect x='16' y='14' width='128' height='62' fill='${floor}'/>`
    + `<rect x='72' y='14' width='16' height='8' fill='#1a1a1a'/>`
    + `<rect x='40' y='40' width='10' height='10' fill='#d9a441'/>`
    + `<circle cx='110' cy='52' r='5' fill='#e8e8e8'/>`
    + `</svg>`,
  )}`;

const CELLAR_URI = roomUri('#6b6b7a', '#3a3a48');
const RUINS_URI = roomUri('#8a7a5a', '#4a3f2e');
const BROKEN_URI = 'data:image/png;base64,bm90LWFuLWltYWdl';

const SOURCES: Record<Picture, string | null> = {
  cellar: CELLAR_URI,
  ruins: RUINS_URI,
  broken: BROKEN_URI,
  'on its way': null,
  none: null,
};

const SLOTS: readonly { name: string; detail: string; src: string | null; pending?: boolean }[] = [
  { name: 'Slot 1', detail: 'Castle cellar, 2h 14m', src: CELLAR_URI },
  { name: 'Slot 2', detail: 'Eastern ruins, 3h 02m', src: RUINS_URI },
  { name: 'Slot 3', detail: 'Saving now', src: null, pending: true },
  { name: 'Slot 4', detail: 'Screenshot missing', src: BROKEN_URI },
  { name: 'Slot 5', detail: 'Empty', src: null },
];

const ARGS: Partial<ThumbnailArgs> = { picture: 'cellar', size: 'lg', alt: 'Castle cellar', placeholder: 'No screenshot' };

const ARG_TYPES: PlaygroundArgTypes<ThumbnailArgs> = {
    picture: {
      group: 'Content',
      control: 'select',
      options: ['cellar', 'ruins', 'broken', 'on its way', 'none'],
      description: 'A source that fails, one still on its way (pending, never arrives), or none at all.',
    },
    alt: { group: 'Content', control: 'text' },
    placeholder: { group: 'Content', control: 'text', description: 'Drawn in an empty frame, with no source.' },
    size: { group: 'Appearance', control: 'select', options: ['sm', 'md', 'lg'], description: 'Frame size is set by the caller.' },
  };

const meta = {
  title: 'Primitives · Display/Thumbnail',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ThumbnailArgs>;

const placeholderNode = (text: string) => <Text className="thumb-demo__placeholder">{text}</Text>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Thumbnail
      key={args.picture}
      className={`thumb-demo--${args.size}`}
      src={SOURCES[args.picture]}
      pending={args.picture === 'on its way'}
      alt={args.alt}
      placeholder={args.placeholder ? placeholderNode(args.placeholder) : undefined}
    />
  ),
} satisfies PlaygroundStory<ThumbnailArgs>;

const renderState = (props: StateProps) => (
  <Thumbnail className="thumb-demo--md" src={RUINS_URI} alt="Eastern ruins" {...props} />
);

const SIZES: readonly ThumbSize[] = ['sm', 'md', 'lg'];

const Sizes = {
  name: 'Sizes',
  render: () => (
    <Demonstrator rows={axis(SIZES)} cell={(size) => <Thumbnail className={`thumb-demo--${size}`} src={RUINS_URI} alt="Eastern ruins" />} />
  ),
} satisfies StoryLiteStoryDefinition<ThumbnailArgs>;

const BrokenSizes = {
  name: 'Broken, at every size',
  render: () => (
    <Demonstrator rows={axis(SIZES)} cell={(size) => <Thumbnail className={`thumb-demo--${size}`} src={BROKEN_URI} alt="Missing screenshot" />} />
  ),
} satisfies StoryLiteStoryDefinition<ThumbnailArgs>;

const SaveSlots = {
  name: 'Save slots',
  render: () => (
    <Stack gap="sm" className="story-column">
      {SLOTS.map((slot) => (
        <Flex key={slot.name} gap="md" align="center" className="thumb-demo__slot">
          <Thumbnail
            className="thumb-demo--md"
            src={slot.src}
            pending={slot.pending}
            alt={slot.detail}
            placeholder={placeholderNode('No screenshot')}
          />
          <Box>
            <Text as="div" variant="title">{slot.name}</Text>
            <Text variant="caption">{slot.detail}</Text>
          </Box>
        </Flex>
      ))}
    </Stack>
  ),
} satisfies StoryLiteStoryDefinition<ThumbnailArgs>;

const Overview = overviewStory({
  component: 'Thumbnail',
  description: 'A fixed frame that shows a small image, such as a save slot screenshot or a room preview. The caller sets the frame size with a class, and the image fills it. It draws through Image, so a loading source shows the pulsing picture outline and a source that fails shows the outline in the danger colour with a cross, sized to the frame. With no src it draws the placeholder node, or the plain outline, so an empty slot keeps its shape in a list.',
  playground: Playground,
  variants: [Sizes, BrokenSizes, SaveSlots],
  states: {
    render: renderState,
    list: [
      { name: 'Loaded' },
      { name: 'Empty', props: { src: null } },
      { name: 'Empty, with a placeholder', props: { src: null, placeholder: placeholderNode('Empty') } },
      { ...STATE.loading, props: { src: null, pending: true } },
      { ...STATE.error, name: 'Broken', props: { src: BROKEN_URI } },
    ],
  },
});

export default meta;
export { BrokenSizes, Overview, Playground, SaveSlots, Sizes };
