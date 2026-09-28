/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { Text } from '../../src/primitives';
import { textElementStories } from './text-element-stories';

const meta = {
  title: 'Text/Abbreviation',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { InContext, Overview, Playground } = textElementStories({
  name: 'Abbreviation',
  element: Text.Abbr,
  description: 'An abbreviation or acronym, underlined with dots. Its title holds the full form, shown on hover.',
  text: 'AP',
  attributes: { title: 'Archipelago' },
  context: <Text.P>Connect to an <Text.Abbr title="Archipelago">AP</Text.Abbr> room to play the seed.</Text.P>,
});

export default meta;
export { InContext, Overview, Playground };
