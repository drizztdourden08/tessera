/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { Text } from '../../src/primitives';
import { textElementStories } from './text-element-stories';

const meta = {
  title: 'Text/Citation',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { InContext, Overview, Playground } = textElementStories({
  name: 'Citation',
  short: 'Cite',
  element: Text.Cite,
  description: 'The title of a creative work: a game, a book, a song. It draws in italic.',
  text: 'A Link to the Past',
  context: <Text.P>Randomized from <Text.Cite>A Link to the Past</Text.Cite>.</Text.P>,
});

export default meta;
export { InContext, Overview, Playground };
