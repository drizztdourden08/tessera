/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { Text } from '../../src/primitives';
import { textElementStories } from './text-element-stories';

const meta = {
  title: 'Text/BidiIsolate',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { InContext, Overview, Playground } = textElementStories({
  name: 'BidiIsolate',
  short: 'Bdi',
  element: Text.Bdi,
  description: 'Isolates text whose direction is unknown, such as a player name that may be written right to left, so it cannot reorder the sentence around it.',
  text: 'مريم',
  context: <Text.P>Item sent by <Text.Bdi>مريم</Text.Bdi>: 3 bombs.</Text.P>,
});

export default meta;
export { InContext, Overview, Playground };
