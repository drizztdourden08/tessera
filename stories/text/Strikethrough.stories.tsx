/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { Text } from '../../src/primitives';
import { textElementStories } from './text-element-stories';

const meta = {
  title: 'Text/Strikethrough',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { InContext, Overview, Playground } = textElementStories({
  name: 'Strikethrough',
  short: 'S',
  element: Text.S,
  description: 'Text that is no longer accurate or relevant, left visible on purpose, like a finished task or an old setting. Use Deleted for a record of an edit.',
  text: 'off',
  context: <Text.P>Hints: <Text.S>off</Text.S> on.</Text.P>,
});

export default meta;
export { InContext, Overview, Playground };
