/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { Text } from '../../src/primitives';
import { textElementStories } from './text-element-stories';

const meta = {
  title: 'Core · Text/Sample',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { InContext, Overview, Playground } = textElementStories({
  name: 'Sample',
  element: Text.Samp,
  description: 'Output from a program quoted in a sentence: a message, a log line, a status.',
  points: [
    '`Text.Samp`, or `Samp` imported on its own, draws a `<samp>`.',
    '`tone` takes a status tone, such as `danger` for an error message.',
    'It quotes what a program printed; code someone writes goes in [Code].',
  ],
  text: 'Connected to room 38281',
  context: <Text.P>The client answered <Text.Samp>Connected to room 38281</Text.Samp>.</Text.P>,
});

export default meta;
export { InContext, Overview, Playground };
