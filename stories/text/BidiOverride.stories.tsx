/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { Text } from '../../src/primitives';
import { textElementStories } from './text-element-stories';

const meta = {
  title: 'Core · Text/BidiOverride',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { InContext, Overview, Playground } = textElementStories({
  name: 'BidiOverride',
  element: Text.Bdo,
  description: 'Forces the direction of its text, left to right or right to left, whatever the characters are.',
  points: [
    '`Text.Bdo`, or `Bdo` imported on its own, draws a `<bdo>`.',
    '`dir` takes `ltr` or `rtl`.',
    'It overrides the browser, so use it only when the text is known to be stored in the wrong order.',
  ],
  instead: '[BidiIsolate] when the direction is only unknown.',
  text: 'Hookshot',
  attributes: { dir: 'rtl' },
  context: <Text.P>Mirrored: <Text.Bdo dir="rtl">Hookshot</Text.Bdo></Text.P>,
});

export default meta;
export { InContext, Overview, Playground };
