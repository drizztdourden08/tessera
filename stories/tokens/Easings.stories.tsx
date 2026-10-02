/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { scaleStories } from './scale-stories';
import { EASINGS } from './token-lists';

const meta = {
  title: 'Core · Tokens/Easings',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { Overview, Values } = scaleStories({
  name: 'Easings',
  description: 'The curves motion follows: standard for most changes, emphasized for a part entering the screen. Point at a track to play it.',
  specimen: 'easing',
  tokens: EASINGS,
});

export default meta;
export { Overview, Values };
