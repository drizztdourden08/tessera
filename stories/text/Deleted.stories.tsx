/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { Text } from '../../src/primitives';
import { textElementStories } from './text-element-stories';

const meta = {
  title: 'Text/Deleted',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { InContext, Overview, Playground } = textElementStories({
  name: 'Deleted',
  short: 'Del',
  element: Text.Del,
  description: 'Text removed in an edit, dimmed and struck through. It takes cite and dateTime to say where and when the change happened, and pairs with Inserted.',
  text: 'all dungeons',
  attributes: { dateTime: '2026-09-28' },
  context: <Text.P>Goal: <Text.Del dateTime="2026-09-28">all dungeons</Text.Del> <Text.Ins dateTime="2026-09-28">Ganon only</Text.Ins></Text.P>,
});

export default meta;
export { InContext, Overview, Playground };
