/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { scaleStories } from './scale-stories';
import { Z_INDEX } from './token-lists';

const meta = {
  title: 'Tokens/Z-index',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { Overview, Values } = scaleStories({
  name: 'Z-index',
  description: 'The stacking layers, lowest to highest: the page, sticky chrome, panels, floating parts, dialogs, popovers, toasts and tooltips. A component takes its layer from here, never a raw number.',
  specimen: 'z',
  tokens: Z_INDEX,
});

export default meta;
export { Overview, Values };
