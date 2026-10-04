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
  description: 'Stress emphasis that changes how a sentence reads aloud, drawn in italic.',
  points: [
    'Import it as `Em`; `Text.Emphasis` and `Text.Em` work too. It draws an `<em>`.',
    '**The standalone `Emphasis` is another part:** the weight animation, on its own page.',
    'Use it when the stress changes the meaning of the sentence.',
  ],
  instead: '[Italic] for an alternate voice, or [primitives/Emphasis] for the weight animation.',
  text: 'lamp',
  context: <Text.P>You need the <Text.Em>lamp</Text.Em> before the sewers, not after.</Text.P>,
});

export default meta;
export { InContext, Overview, Playground };
