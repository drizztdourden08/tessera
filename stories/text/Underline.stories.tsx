/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { Text } from '../../src/primitives';
import { textElementStories } from './text-element-stories';

const meta = {
  title: 'Core · Text/Underline',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { InContext, Overview, Playground } = textElementStories({
  name: 'Underline',
  element: Text.U,
  description: 'An annotation with no spoken meaning, such as a word marked as misspelt.',
  points: [
    '`Text.U`, or `U` imported on its own, draws an `<u>`.',
    '**Avoid it for plain emphasis:** an underline reads like a link.',
    'Screen readers read it as plain text.',
  ],
  instead: '[text/Emphasis] for stress, or [Link] for a link.',
  text: 'Hyrlue',
  context: <Text.P>Seed name <Text.U>Hyrlue</Text.U> has a typo.</Text.P>,
});

export default meta;
export { InContext, Overview, Playground };
