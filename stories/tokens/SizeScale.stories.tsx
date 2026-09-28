/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { overviewStory } from '../_template/overview-story';
import { Box, Text } from '../../src/primitives';
import { SCALE } from './dimension-lists';
import { TokenTable } from './token-table';

const meta = {
  title: 'Tokens/Size scale',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const Scale = {
  name: 'Size scale',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">The one size scale. Spacing, radius, type, borders, shadows, fixed sizes and breakpoints are all steps of it, and nothing in between.</Text>
      <TokenTable entries={SCALE} specimen="size" showStep={false} />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition;

const Overview = overviewStory({
  component: 'Size scale',
  description: 'The one size scale. Spacing, radius, type, borders, shadows, fixed sizes and breakpoints are all steps of it, and nothing sits in between.',
  variants: [Scale],
});

export default meta;
export { Overview, Scale };
