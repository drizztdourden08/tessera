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
  points: [
    '`Text.Sub`, or `Sub` imported on its own, draws a `<sub>`.',
    'Use it where the position carries meaning, such as the 2 in H2O.',
    'For looks alone, the `subscript` feature of [Text] draws the font\'s own figures.',
  ],
  text: '2',
  context: <Text.P>Room x<Text.Sub>2</Text.Sub> connects to room x<Text.Sub>3</Text.Sub>.</Text.P>,
});

export default meta;
export { InContext, Overview, Playground };
