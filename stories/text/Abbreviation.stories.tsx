/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { Text } from '../../src/primitives';
import { textElementStories } from './text-element-stories';

const meta = {
  title: 'Core · Text/Abbreviation',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { InContext, Overview, Playground } = textElementStories({
  name: 'Abbreviation',
  element: Text.Abbr,
  description: 'An abbreviation or acronym, underlined with dots, with its full form in its title.',
  points: [
    '`Text.Abbr`, or `Abbr` imported on its own, draws an `<abbr>`.',
    '`title` holds the full form, shown on hover.',
    'Touch screens have no hover, so spell the full form out once in the text where it matters.',
  ],
  text: 'AP',
  attributes: { title: 'Archipelago' },
  context: <Text.P>Connect to an <Text.Abbr title="Archipelago">AP</Text.Abbr> room to play the seed.</Text.P>,
});

export default meta;
export { InContext, Overview, Playground };
