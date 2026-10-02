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
  description: 'Forces the direction of its text with dir, left to right or right to left, whatever the characters are.',
  text: 'Hookshot',
  attributes: { dir: 'rtl' },
  context: <Text.P>Mirrored: <Text.Bdo dir="rtl">Hookshot</Text.Bdo></Text.P>,
});

export default meta;
export { InContext, Overview, Playground };
