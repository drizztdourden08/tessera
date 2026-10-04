/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { Text } from '../../src/primitives';
import { textElementStories } from './text-element-stories';

const meta = {
  title: 'Core · Text/Strong',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { InContext, Overview, Playground } = textElementStories({
  name: 'Strong',
  element: Text.Strong,
  description: 'Text of strong importance, such as a warning inside a sentence, drawn in the bold weight.',
  points: [
    '`Text.Strong`, or `Strong` imported on its own, draws a `<strong>`.',
    'Screen readers may stress it.',
    '`tone` takes `primary` or a status tone: `success`, `warning`, `danger` or `info`.',
  ],
  instead: '[Bold] to draw attention without adding importance.',
  text: 'Do not close the game',
  context: <Text.P><Text.Strong>Do not close the game</Text.Strong> while the save is written.</Text.P>,
});

export default meta;
export { InContext, Overview, Playground };
