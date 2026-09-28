/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Box, Text } from '../../src/primitives';
import { textElementStories } from './text-element-stories';

const LONG_QUOTE = 'It is dangerous to go alone. Take this sword, and keep it close while you cross the fields to the castle. The rain will not stop tonight, and the guards will not let you pass the gate, so look for the way in under the moat. Your uncle went ahead of you. Find him before the soldiers do.';

const meta = {
  title: 'Text/BlockQuote',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const Multiline = {
  name: 'Multiline',
  render: () => (
    <Box className="story-column">
      <Text.Blockquote cite="https://archipelago.gg">{LONG_QUOTE}</Text.Blockquote>
      <Text.Small>The old man in the cave</Text.Small>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition;

const { InContext, Overview, Playground } = textElementStories({
  name: 'BlockQuote',
  element: Text.Blockquote,
  description: 'A quotation set as its own block, behind a rule in the primary colour. A tone changes only the colour of the rule; the text keeps the dim ink. It takes cite for the source.',
  text: 'It is dangerous to go alone. Take this.',
  attributes: { cite: 'https://archipelago.gg' },
  context: <Box className="story-column"><Text.Blockquote>It is dangerous to go alone. Take this.</Text.Blockquote><Text.Small>The old man in the cave</Text.Small></Box>,
  variants: [Multiline],
});

export default meta;
export { InContext, Multiline, Overview, Playground };
