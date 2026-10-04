/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { Text } from '../../src/primitives';
import { textElementStories } from './text-element-stories';

const meta = {
  title: 'Core · Text/Inserted',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { InContext, Overview, Playground } = textElementStories({
  name: 'Inserted',
  element: Text.Ins,
  description: 'Text added in an edit, underlined in the success colour, as in a diff.',
  points: [
    '`Text.Ins`, or `Ins` imported on its own, draws an `<ins>`.',
    '`cite` and `dateTime` say where and when the change happened.',
    'Pair it with [Deleted] to show a change.',
  ],
  text: 'Ganon only',
  attributes: { dateTime: '2026-09-28' },
  context: <Text.P>Hints are <Text.Ins dateTime="2026-09-28">on for every player</Text.Ins> since the last update.</Text.P>,
});

export default meta;
export { InContext, Overview, Playground };
