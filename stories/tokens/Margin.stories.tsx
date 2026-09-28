/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Box, Text } from '../../src/primitives';
import { spacingFor } from './dimension-lists';
import { TokenTable } from './token-table';

const meta = {
  title: 'Tokens/Margin',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const Values = {
  name: 'Margin',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">Margin takes a step of the one spacing scale, src/tokens/space.css, never a raw length.</Text>
      <TokenTable entries={spacingFor('margin')} specimen="margin" />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition;

export default meta;
export { Values };
