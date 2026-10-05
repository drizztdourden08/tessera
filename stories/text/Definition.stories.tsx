/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { Text } from '../../src/primitives';
import { textElementStories } from './text-element-stories';

const meta = {
  title: 'Core · Text/Definition',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { InContext, Overview, Playground } = textElementStories({
  name: 'Definition',
  element: Text.Dfn,
  description: 'The term being defined, at the point where it is defined.',
  points: [
    '`Text.Dfn`, or `Dfn` imported on its own, draws a `<dfn>`.',
    'Pair it with the definition in the same sentence.',
    'Mark a term once, where it is defined, not every time it appears.',
  ],
  instead: '[FactsPanel] with `layout="terms"` for a list of terms with their definitions.',
  text: 'check',
  context: <Text.P>A <Text.Dfn>check</Text.Dfn> is any place that holds an item for the randomizer to shuffle.</Text.P>,
});

export default meta;
export { InContext, Overview, Playground };
