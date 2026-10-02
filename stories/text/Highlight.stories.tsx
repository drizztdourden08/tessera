/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { Text } from '../../src/primitives';
import { textElementStories } from './text-element-stories';

const meta = {
  title: 'Core · Text/Highlight',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { InContext, Overview, Playground } = textElementStories({
  name: 'Highlight',
  element: Text.Mark,
  description: 'Text marked for reference, like a search match, on a clear tint of the primary colour with an underline in the same ink.',
  text: 'Hook',
  context: <Text.P>Results for hook: the <Text.Mark>Hook</Text.Mark>shot sits in the swamp palace.</Text.P>,
});

export default meta;
export { InContext, Overview, Playground };
