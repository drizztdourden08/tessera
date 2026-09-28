/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { Text } from '../../src/primitives';
import { textElementStories } from './text-element-stories';

const meta = {
  title: 'Text/Underline',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { InContext, Overview, Playground } = textElementStories({
  name: 'Underline',
  short: 'U',
  element: Text.U,
  description: 'An annotation with no spoken meaning, such as a word marked as misspelt. Avoid it for plain emphasis, where it reads like a link.',
  text: 'Hyrlue',
  context: <Text.P>Seed name <Text.U>Hyrlue</Text.U> has a typo.</Text.P>,
});

export default meta;
export { InContext, Overview, Playground };
