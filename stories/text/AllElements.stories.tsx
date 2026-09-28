/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Box, TEXT_ELEMENT_SPECS, Text, TextElement } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';

const meta = {
  title: 'Text/All elements',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const All = {
  name: 'All elements',
  render: () => (
    <Box className="story-list">
      {TEXT_ELEMENT_SPECS.map((spec) => (
        <Box key={spec.tag} className="story-list__item">
          <Text className="story-label">{spec.name === spec.short ? `Text.${spec.name}` : `Text.${spec.name} · Text.${spec.short}`}</Text>
          <Box><TextElement as={spec.tag}>{spec.name}</TextElement></Box>
        </Box>
      ))}
    </Box>
  ),
} satisfies StoryLiteStoryDefinition;

const Overview = overviewStory({
  component: 'Text elements',
  description: 'Every HTML text element as a Tessera component, reachable three ways: on the Text namespace by full name or short name (Text.Paragraph, Text.P), or imported on its own (Paragraph, P). Each takes the typesetting props of Text, weight, italic, optical size and OpenType features, and the native attributes of its tag.',
  variants: [All],
});

export default meta;
export { All, Overview };
