/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { SearchSpark } from '../../src/composites';
import { Box, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';

type SearchSparkArgs = {
  size: number;
};

const SIZES = [12, 14, 20, 32, 48];

const ARGS: Partial<SearchSparkArgs> = { size: 32 };

const ARG_TYPES: StoryLiteArgTypes<SearchSparkArgs> = {
    size: { control: 'number', description: 'Glass size in px; the star scales with it' },
  };

const meta = {
  title: 'Composites · Menus/SearchSpark',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<SearchSparkArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <SearchSpark size={args.size} />,
} satisfies StoryLiteStoryDefinition<SearchSparkArgs>;

const Sizes = {
  name: 'Sizes',
  render: () => (
    <Box className="story-row">
      {SIZES.map((size) => (
        <Box key={size} className="story-column">
          <SearchSpark size={size} />
          <Text className="story-label">{`${size}px`}</Text>
        </Box>
      ))}
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<SearchSparkArgs>;

const Overview = overviewStory({
  component: 'SearchSpark',
  description: 'The search mark of the app: a gold magnifying glass with a soft glow and a small star that twinkles over the lens. Reach for it wherever a search starts, beside a search field or on a search button. Its one setting is size in pixels, and the star scales with the glass, so the mark reads the same at any size. It is decorative and hidden from assistive tech.',
  playground: Playground,
  variants: [Sizes],
});

export default meta;
export { Overview, Playground, Sizes };
