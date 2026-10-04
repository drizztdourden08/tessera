/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { Text } from '../../src/primitives';
import { textElementStories } from './text-element-stories';

const meta = {
  title: 'Core · Text/RubyParenthesis',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { InContext, Overview, Playground } = textElementStories({
  name: 'RubyParenthesis',
  element: Text.Rp,
  description: 'Fallback brackets around a reading, shown only where the browser cannot draw ruby.',
  points: [
    '`Text.Rp`, or `Rp` imported on its own, draws a `<rp>`.',
    'Put one before and one after the [RubyText], inside the [Ruby].',
    'Browsers that draw ruby hide it.',
  ],
  text: '(',
  context: <Text.P>Take the <Text.Ruby>盾<Text.Rp>(</Text.Rp><Text.Rt>たて</Text.Rt><Text.Rp>)</Text.Rp></Text.Ruby> from the shop.</Text.P>,
});

export default meta;
export { InContext, Overview, Playground };
