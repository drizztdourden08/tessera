/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { Text } from '../../src/primitives';
import { textElementStories } from './text-element-stories';

const meta = {
  title: 'Text/Preformatted',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { InContext, Overview, Playground } = textElementStories({
  name: 'Preformatted',
  element: Text.Pre,
  description: 'A block whose spaces and line breaks stay as written, in the mono face on a sunken panel. It scrolls sideways when a line runs long.',
  text: 'item      player  location',
  context: <Text.Pre>{'Hookshot   Tavi   Swamp Palace\nLamp       Wren   Link\'s House'}</Text.Pre>,
});

export default meta;
export { InContext, Overview, Playground };
