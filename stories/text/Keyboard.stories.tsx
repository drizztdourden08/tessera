/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { Text } from '../../src/primitives';
import { textElementStories } from './text-element-stories';

const meta = {
  title: 'Text/Keyboard',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { InContext, Overview, Playground } = textElementStories({
  name: 'Keyboard',
  element: Text.Kbd,
  description: 'A key or a key combination the user presses, drawn as a keycap. Put one per key for a combination.',
  text: 'Ctrl',
  context: <Text.P>Press <Text.Kbd>Ctrl</Text.Kbd> + <Text.Kbd>S</Text.Kbd> to save the state.</Text.P>,
});

export default meta;
export { InContext, Overview, Playground };
