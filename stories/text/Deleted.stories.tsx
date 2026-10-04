/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { Text } from '../../src/primitives';
import { textElementStories } from './text-element-stories';

const meta = {
  title: 'Core · Text/Deleted',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { InContext, Overview, Playground } = textElementStories({
  name: 'Deleted',
  element: Text.Del,
  description: 'Text removed in an edit, struck through in the danger colour, as in a diff.',
  points: [
    '`Text.Del`, or `Del` imported on its own, draws a `<del>`.',
    '`cite` and `dateTime` say where and when the change happened.',
    'Pair it with [Inserted] to show a change.',
  ],
  instead: '[Strikethrough] for text that is out of date but was not edited.',
  text: 'all dungeons',
  attributes: { dateTime: '2026-09-28' },
  context: <Text.P>Goal: <Text.Del dateTime="2026-09-28">all dungeons</Text.Del> <Text.Ins dateTime="2026-09-28">Ganon only</Text.Ins></Text.P>,
});

export default meta;
export { InContext, Overview, Playground };
