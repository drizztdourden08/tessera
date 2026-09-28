/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Box, Text } from '../../src/primitives';
import { RADIUS } from './dimension-lists';
import { TokenTable } from './token-table';

const meta = {
  title: 'Tokens/Radius',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const Values = {
  name: 'Radius',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">Every rounded corner takes a step of this one scale, src/tokens/radius.css.</Text>
      <TokenTable entries={RADIUS} specimen="radius" />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition;

export default meta;
export { Values };
