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
  description: 'Text in an alternate voice, such as a title, a foreign phrase or a thought, in the true italic of Inter.',
  points: [
    '`Text.I`, or `I` imported on its own, draws an `<i>`.',
    'It carries no stress, so screen readers read it as plain text.',
    'It takes the native attributes of its tag, such as `lang` for a foreign phrase.',
  ],
  instead: '[text/Emphasis] when the stress changes the meaning.',
  text: 'ice palace below',
  context: <Text.P>The sign reads <Text.I>ice palace below</Text.I> in faded letters.</Text.P>,
});

export default meta;
export { InContext, Overview, Playground };
