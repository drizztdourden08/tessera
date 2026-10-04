/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { Text } from '../../src/primitives';
import { textElementStories } from './text-element-stories';

const meta = {
  title: 'Core · Text/Bold',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { InContext, Overview, Playground } = textElementStories({
  name: 'Bold',
  element: Text.B,
  description: 'Draws attention to words without adding importance: key terms in a summary, item names in a list.',
  points: [
    '`Text.B`, or `B` imported on its own, draws a `<b>`.',
    '`tone` takes `primary`, `secondary` or `tertiary`.',
    'Screen readers read it as plain text.',
  ],
  instead: '[Strong] when the words matter more.',
  text: 'Pegasus Boots',
  context: <Text.P>Found the <Text.B>Pegasus Boots</Text.B> in the house by the well.</Text.P>,
});

export default meta;
export { InContext, Overview, Playground };
