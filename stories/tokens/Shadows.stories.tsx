/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { scaleStories } from './scale-stories';
import { SHADOWS } from './token-lists';

const meta = {
  title: 'Tokens/Shadows',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { Overview, Values } = scaleStories({
  name: 'Shadows',
  description: 'Elevation, from a card resting on the page to a dropdown and an overlay floating above it. Each row casts its shadow on a sample surface, with the value the page resolves.',
  specimen: 'shadow',
  tokens: SHADOWS,
});

export default meta;
export { Overview, Values };
