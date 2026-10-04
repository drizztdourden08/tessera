/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { Text } from '../../src/primitives';
import { textElementStories } from './text-element-stories';

const meta = {
  title: 'Core · Text/BidiIsolate',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { InContext, Overview, Playground } = textElementStories({
  name: 'BidiIsolate',
  element: Text.Bdi,
  description: 'Isolates text whose direction is unknown, such as a player name written right to left, so it cannot reorder the sentence.',
  points: [
    '`Text.Bdi`, or `Bdi` imported on its own, draws a `<bdi>`.',
    'Wrap any name or value that comes from people or from data.',
    'The browser works out the direction of the text inside.',
  ],
  instead: '[BidiOverride] to force a direction.',
  text: 'مريم',
  context: <Text.P>Item sent by <Text.Bdi>مريم</Text.Bdi>: 3 bombs.</Text.P>,
});

export default meta;
export { InContext, Overview, Playground };
