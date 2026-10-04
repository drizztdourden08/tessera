/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { scaleStories } from './scale-stories';
import { Z_INDEX } from './token-lists';

const meta = {
  title: 'Core · Tokens/Z-index',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { Overview, Values } = scaleStories({
  name: 'Z-index',
  description: 'The stacking layers, lowest to highest, from the page to tooltips.',
  points: [
    'Sticky chrome, panels, floating parts, dialogs, popovers, toasts and tooltips each have a layer.',
    'A component takes its layer from here, such as `--z-modal`, never a raw number.',
    '`--z-top` is the highest layer, above every other part.',
  ],
  specimen: 'z',
  tokens: Z_INDEX,
});

export default meta;
export { Overview, Values };
