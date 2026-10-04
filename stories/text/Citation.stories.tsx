/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { Text } from '../../src/primitives';
import { textElementStories } from './text-element-stories';

const meta = {
  title: 'Core · Text/Citation',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { InContext, Overview, Playground } = textElementStories({
  name: 'Citation',
  element: Text.Cite,
  description: 'The title of a creative work: a game, a book, a song. It draws in italic.',
  points: [
    '`Text.Cite`, or `Cite` imported on its own, draws a `<cite>`.',
    '`tone="primary"` draws it in the primary colour.',
    'It names the work, not the person who made it.',
  ],
  instead: '[Quote] for the words quoted from it.',
  text: 'A Link to the Past',
  context: <Text.P>Randomized from <Text.Cite>A Link to the Past</Text.Cite>.</Text.P>,
});

export default meta;
export { InContext, Overview, Playground };
