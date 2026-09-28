/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { Text } from '../../src/primitives';
import { textElementStories } from './text-element-stories';

const meta = {
  title: 'Text/Quote',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { InContext, Overview, Playground } = textElementStories({
  name: 'Quote',
  short: 'Q',
  element: Text.Q,
  description: 'A short quotation inside a sentence. The browser adds the quote marks for the page language, and cite can point at the source.',
  text: 'take this',
  attributes: { cite: 'https://archipelago.gg' },
  context: <Text.P>The old man said <Text.Q>take this</Text.Q> and handed over a sword.</Text.P>,
});

export default meta;
export { InContext, Overview, Playground };
