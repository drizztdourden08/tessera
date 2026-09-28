/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Box, Text } from '../../src/primitives';
import { spacingFor } from './dimension-lists';
import { TokenTable } from './token-table';

const meta = {
  title: 'Tokens/Padding',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const Values = {
  name: 'Padding',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">Padding takes a step of the one spacing scale, src/tokens/space.css, never a raw length.</Text>
      <TokenTable entries={spacingFor('padding')} specimen="padding" />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition;

export default meta;
export { Values };
