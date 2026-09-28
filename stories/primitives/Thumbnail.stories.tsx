/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, Flex, Stack, Text, Thumbnail } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { axis, VariantGrid } from '../_template/VariantGrid';
import './Thumbnail.stories.css';

type ThumbSize = 'sm' | 'md' | 'lg';

type ThumbnailArgs = {
  hasImage: boolean;
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

const SLOTS: readonly { name: string; detail: string; src: string | null }[] = [
  { name: 'Slot 1', detail: 'Castle cellar, 2h 14m', src: CELLAR_URI },
  { name: 'Slot 2', detail: 'Eastern ruins, 3h 02m', src: RUINS_URI },
  { name: 'Slot 3', detail: 'Empty', src: null },
];

const ARGS: Partial<ThumbnailArgs> = { hasImage: true, size: 'lg', alt: 'Castle cellar', placeholder: 'No screenshot' };

const ARG_TYPES: StoryLiteArgTypes<ThumbnailArgs> = {
    hasImage: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'], description: 'Frame size is set by the caller.' },
    alt: { control: 'text' },
    placeholder: { control: 'text' },
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
      className={`thumb-demo--${args.size}`}
      src={args.hasImage ? CELLAR_URI : null}
      alt={args.alt}
      placeholder={placeholderNode(args.placeholder)}
    />
  ),
} satisfies StoryLiteStoryDefinition<ThumbnailArgs>;

const CONTENTS = ['image', 'empty'] as const;
const SIZES: readonly ThumbSize[] = ['sm', 'md', 'lg'];

const Sizes = {
  name: 'Sizes, with and without an image',
  render: () => (
    <VariantGrid
      rows={axis(CONTENTS)}
      columns={axis(SIZES)}
      cell={(content, size) => (
        content === 'image'
          ? <Thumbnail className={`thumb-demo--${size}`} src={RUINS_URI} alt="Eastern ruins" />
          : <Thumbnail className={`thumb-demo--${size}`} placeholder={placeholderNode('Empty')} />
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<ThumbnailArgs>;

const SaveSlots = {
  name: 'Save slots',
  render: () => (
    <Stack gap="sm" className="story-column">
      {SLOTS.map((slot) => (
        <Flex key={slot.name} gap="md" align="center" className="thumb-demo__slot">
          <Thumbnail className="thumb-demo--md" src={slot.src} alt={slot.detail} placeholder={placeholderNode('No screenshot')} />
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
  description: 'A fixed frame that shows a small image, such as a save slot screenshot or a room preview. The caller sets the frame size with a class, and the image fills it. With no src it draws the placeholder node instead, so an empty slot keeps its shape in a list.',
  playground: Playground,
  variants: [Sizes],
});

export default meta;
export { Overview, Playground, SaveSlots, Sizes };
