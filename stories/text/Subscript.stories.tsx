/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { Text } from '../../src/primitives';
import { textElementStories } from './text-element-stories';

const meta = {
  title: 'Core · Text/Subscript',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { InContext, Overview, Playground } = textElementStories({
  name: 'Subscript',
  element: Text.Sub,
  description: 'Text set below the baseline at a smaller size, for formulas and indices.',
  text: '2',
  context: <Text.P>Room x<Text.Sub>2</Text.Sub> connects to room x<Text.Sub>3</Text.Sub>.</Text.P>,
});

export default meta;
export { InContext, Overview, Playground };
