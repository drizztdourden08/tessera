/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { Box, Text } from '../../src/primitives';
import { textElementStories } from './text-element-stories';

const meta = {
  title: 'Text/Paragraph',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { InContext, Overview, Playground } = textElementStories({
  name: 'Paragraph',
  element: Text.P,
  description: 'A paragraph of running text in Inter at the body size. Use it for any block of prose. It sets its own line height and adds no outer margin, so the layout around it owns the spacing.',
  text: 'Wren sent the Hookshot to Tavi, and the seed moved on.',
  context: <Box className="story-column"><Text.P>Wren sent the Hookshot to Tavi, and the seed moved on.</Text.P><Text.P>Two players are still in the Dark World.</Text.P></Box>,
});

export default meta;
export { InContext, Overview, Playground };
