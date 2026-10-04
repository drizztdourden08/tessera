/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { Text } from '../../src/primitives';
import { textElementStories } from './text-element-stories';

const meta = {
  title: 'Core · Text/Preformatted',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { InContext, Overview, Playground } = textElementStories({
  name: 'Preformatted',
  element: Text.Pre,
  description: 'A block whose spaces and line breaks stay as written, in the mono face on a sunken panel.',
  points: [
    '`Text.Pre`, or `Pre` imported on its own, draws a `<pre>`.',
    'It scrolls sideways when a line runs long.',
    'It has no highlighting, line numbers or copy button.',
  ],
  instead: '[CodeBlock] for highlighted code with a copy button.',
  text: 'item      player  location',
  context: <Text.Pre>{'Hookshot   Tavi   Swamp Palace\nLamp       Wren   Link\'s House'}</Text.Pre>,
});

export default meta;
export { InContext, Overview, Playground };
