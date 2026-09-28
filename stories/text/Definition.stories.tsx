/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { Text } from '../../src/primitives';
import { textElementStories } from './text-element-stories';

const meta = {
  title: 'Text/Definition',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { InContext, Overview, Playground } = textElementStories({
  name: 'Definition',
  short: 'Dfn',
  element: Text.Dfn,
  description: 'The term being defined, at the point where it is defined. Pair it with the definition in the same sentence.',
  text: 'check',
  context: <Text.P>A <Text.Dfn>check</Text.Dfn> is any place that holds an item for the randomizer to shuffle.</Text.P>,
});

export default meta;
export { InContext, Overview, Playground };
