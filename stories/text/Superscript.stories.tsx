/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { Text } from '../../src/primitives';
import { textElementStories } from './text-element-stories';

const meta = {
  title: 'Core · Text/Superscript',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { InContext, Overview, Playground } = textElementStories({
  name: 'Superscript',
  element: Text.Sup,
  description: 'Text raised above the baseline at a smaller size, for exponents, ordinals and note marks.',
  text: 'rd',
  context: <Text.P>The 3<Text.Sup>rd</Text.Sup> heart piece, 2<Text.Sup>10</Text.Sup> checks later.</Text.P>,
});

export default meta;
export { InContext, Overview, Playground };
