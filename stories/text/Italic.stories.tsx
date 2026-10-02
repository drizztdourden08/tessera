/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { Text } from '../../src/primitives';
import { textElementStories } from './text-element-stories';

const meta = {
  title: 'Core · Text/Italic',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { InContext, Overview, Playground } = textElementStories({
  name: 'Italic',
  element: Text.I,
  description: 'Text in an alternate voice: a title, a foreign phrase, a thought. It draws in the true italic of Inter. Use Emphasis when the stress changes the meaning.',
  text: 'ice palace below',
  context: <Text.P>The sign reads <Text.I>ice palace below</Text.I> in faded letters.</Text.P>,
});

export default meta;
export { InContext, Overview, Playground };
