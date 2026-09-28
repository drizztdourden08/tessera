/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { Box, Text } from '../../src/primitives';
import { textElementStories } from './text-element-stories';

const meta = {
  title: 'Text/BlockQuote',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { InContext, Overview, Playground } = textElementStories({
  name: 'BlockQuote',
  short: 'Blockquote',
  element: Text.Blockquote,
  description: 'A quotation set as its own block, behind a rule in the primary colour. It takes cite for the source.',
  text: 'It is dangerous to go alone. Take this.',
  attributes: { cite: 'https://archipelago.gg' },
  context: <Box className="story-column"><Text.Blockquote>It is dangerous to go alone. Take this.</Text.Blockquote><Text.Small>The old man in the cave</Text.Small></Box>,
});

export default meta;
export { InContext, Overview, Playground };
