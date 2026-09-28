/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
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
      <Text className="story-label">The one size scale, src/tokens/scale.css. Spacing, radius, type, borders, shadows, fixed sizes and breakpoints are all steps of it, and nothing in between.</Text>
      <TokenTable entries={SCALE} specimen="size" showStep={false} />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition;

export default meta;
export { Scale };
