/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { Text } from '../../src/primitives';
import { textElementStories } from './text-element-stories';

const meta = {
  title: 'Text/Span',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { InContext, Overview, Playground } = textElementStories({
  name: 'Span',
  element: Text.Span,
  description: 'A plain inline run of text with no meaning of its own, for styling or typesetting a few words inside a sentence.',
  text: 'moved on',
  context: <Text.P>The seed <Text.Span weight={650}>moved on</Text.Span> at 21:04.</Text.P>,
});

export default meta;
export { InContext, Overview, Playground };
