/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { Text } from '../../src/primitives';
import { textElementStories } from './text-element-stories';

const meta = {
  title: 'Core · Text/Ruby',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { InContext, Overview, Playground } = textElementStories({
  name: 'Ruby',
  element: Text.Ruby,
  description: 'Base text with a small reading above it, as in East Asian pronunciation guides.',
  points: [
    '`Text.Ruby`, or `Ruby` imported on its own, draws a `<ruby>`.',
    'Put the base text first, then the reading in a [RubyText].',
    'Wrap fallback brackets in [RubyParenthesis] for browsers that cannot draw ruby.',
  ],
  text: '勇者',
  context: <Text.P><Text.Ruby>勇者<Text.Rp>(</Text.Rp><Text.Rt>ゆうしゃ</Text.Rt><Text.Rp>)</Text.Rp></Text.Ruby> means hero.</Text.P>,
});

export default meta;
export { InContext, Overview, Playground };
