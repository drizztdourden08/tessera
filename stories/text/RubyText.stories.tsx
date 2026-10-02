/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { Text } from '../../src/primitives';
import { textElementStories } from './text-element-stories';

const meta = {
  title: 'Core · Text/RubyText',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { InContext, Overview, Playground } = textElementStories({
  name: 'RubyText',
  element: Text.Rt,
  description: 'The reading drawn above the base text inside a Ruby, one size step smaller and dimmed.',
  text: 'ゆうしゃ',
  context: <Text.P>The <Text.Ruby>剣<Text.Rt>けん</Text.Rt></Text.Ruby> waits in the grove.</Text.P>,
});

export default meta;
export { InContext, Overview, Playground };
