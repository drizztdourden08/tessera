/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { Text } from '../../src/primitives';
import { textElementStories } from './text-element-stories';

const meta = {
  title: 'Text/Code',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { InContext, Overview, Playground } = textElementStories({
  name: 'Code',
  short: 'Code',
  element: Text.Code,
  description: 'A short fragment of code inside a sentence, in the mono face on a sunken tint. Use Preformatted, or the CodeBlock composite, for more than a line.',
  text: 'hints: true',
  context: <Text.P>Set <Text.Code>hints: true</Text.Code> in the preset.</Text.P>,
});

export default meta;
export { InContext, Overview, Playground };
