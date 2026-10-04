/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Box, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { SIZES, SPECIMEN } from './type-lists';
import { TypeTable } from './TypeTable';

const meta = {
  title: 'Core · Typography/Sizes',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const Sizes = {
  name: 'Sizes',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">The type sizes, smallest to biggest. Each one is a step of the size scale.</Text>
      <TypeTable entries={SIZES} property="fontSize" specimen={SPECIMEN} />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition;

const Overview = overviewStory({
  component: 'Sizes',
  description: 'The type sizes, from `--text-xs` to `--text-display`, each a step of the size scale.',
  points: [
    '[Text] variants and component styles pick from these sizes.',
    'App CSS sets a font size with these tokens, never a raw pixel value.',
    'Every token is a step of the [size scale](#/story/tokens-sizescale--overview), as spacing is.',
  ],
  variants: [Sizes],
});

export default meta;
export { Overview, Sizes };
