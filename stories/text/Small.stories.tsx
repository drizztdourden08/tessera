/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { Text } from '../../src/primitives';
import { textElementStories } from './text-element-stories';

const meta = {
  title: 'Core · Text/Small',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { InContext, Overview, Playground } = textElementStories({
  name: 'Small',
  element: Text.Small,
  description: 'Side comments and small print: a caveat, a licence line, a note beside a value. It draws one size step smaller.',
  text: 'generated 21:04',
  context: <Text.P>Seed 48213 <Text.Small>generated 21:04</Text.Small></Text.P>,
});

export default meta;
export { InContext, Overview, Playground };
