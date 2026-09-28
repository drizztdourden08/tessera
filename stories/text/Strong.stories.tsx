/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { Text } from '../../src/primitives';
import { textElementStories } from './text-element-stories';

const meta = {
  title: 'Text/Strong',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { InContext, Overview, Playground } = textElementStories({
  name: 'Strong',
  element: Text.Strong,
  description: 'Text of strong importance, such as a warning inside a sentence. It draws in the bold weight, and screen readers may stress it.',
  text: 'Do not close the game',
  context: <Text.P><Text.Strong>Do not close the game</Text.Strong> while the save is written.</Text.P>,
});

export default meta;
export { InContext, Overview, Playground };
