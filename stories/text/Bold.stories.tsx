/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { Text } from '../../src/primitives';
import { textElementStories } from './text-element-stories';

const meta = {
  title: 'Text/Bold',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { InContext, Overview, Playground } = textElementStories({
  name: 'Bold',
  element: Text.B,
  description: 'Draws attention to words without adding importance: key terms in a summary, item names in a list. Use Strong when the words matter more.',
  text: 'Pegasus Boots',
  context: <Text.P>Found the <Text.B>Pegasus Boots</Text.B> in the house by the well.</Text.P>,
});

export default meta;
export { InContext, Overview, Playground };
