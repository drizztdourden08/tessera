/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { overviewStory } from '../_template/overview-story';
import { Box, Text } from '../../src/primitives';
import { SPACING } from './dimension-lists';
import { TokenTable } from './token-table';

const meta = {
  title: 'Tokens/Padding',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const Values = {
  name: 'Padding',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">Padding takes a step of the one spacing scale, never a raw length.</Text>
      <TokenTable entries={SPACING} specimen="padding" />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition;

const Overview = overviewStory({
  component: 'Padding',
  description: 'The space inside an element, between its edge and its content. Padding takes a step of the one spacing scale, never a raw length.',
  variants: [Values],
});

export default meta;
export { Overview, Values };
