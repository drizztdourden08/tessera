/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { Text } from '../../src/primitives';
import { textElementStories } from './text-element-stories';

const meta = {
  title: 'Core · Text/Emphasis',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { InContext, Overview, Playground } = textElementStories({
  name: 'Emphasis',
  element: Text.Em,
  description: 'Stress emphasis that changes how a sentence reads aloud, drawn in italic. Import it as Em; Text.Emphasis and Text.Em both work. The standalone name Emphasis is the weight animation on its own page, Emphasis animation.',
  text: 'lamp',
  context: <Text.P>You need the <Text.Em>lamp</Text.Em> before the sewers, not after.</Text.P>,
});

export default meta;
export { InContext, Overview, Playground };
