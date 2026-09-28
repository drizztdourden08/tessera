/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Box, Text } from '../../src/primitives';
import { spacingFor } from './dimension-lists';
import { TokenTable } from './token-table';

const meta = {
  title: 'Tokens/Gap',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const Values = {
  name: 'Gap',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">Gap takes a step of the one spacing scale, src/tokens/space.css, never a raw length.</Text>
      <TokenTable entries={spacingFor('gap')} specimen="gap" />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition;

export default meta;
export { Values };
