/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { Text } from '../../src/primitives';
import { textElementStories } from './text-element-stories';

const meta = {
  title: 'Text/Sample',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { InContext, Overview, Playground } = textElementStories({
  name: 'Sample',
  short: 'Samp',
  element: Text.Samp,
  description: 'Output from a program quoted in a sentence: a message, a log line, a status.',
  text: 'Connected to room 38281',
  context: <Text.P>The client answered <Text.Samp>Connected to room 38281</Text.Samp>.</Text.P>,
});

export default meta;
export { InContext, Overview, Playground };
