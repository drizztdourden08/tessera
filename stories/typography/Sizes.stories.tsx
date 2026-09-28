/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Box, Text } from '../../src/primitives';
import { SIZES, SPECIMEN } from './type-lists';
import { TypeTable } from './TypeTable';

const meta = {
  title: 'Typography/Sizes',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const Sizes = {
  name: 'Sizes',
  render: () => (
    <Box className="story-column type-section">
      <Text className="story-label">The type sizes, smallest to biggest. Each one is a step of the size scale. src/tokens/typography.css.</Text>
      <TypeTable entries={SIZES} property="fontSize" specimen={SPECIMEN} />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition;

export default meta;
export { Sizes };
