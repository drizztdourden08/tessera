/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { scaleStories } from './scale-stories';
import { TRANSITIONS } from './token-lists';

const meta = {
  title: 'Core · Tokens/Transitions',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { Overview, Values } = scaleStories({
  name: 'Transitions',
  description: 'A duration and an easing paired, ready for the transition property: fast for hover and focus, normal for parts that open and close. Point at a track to play it.',
  specimen: 'transition',
  tokens: TRANSITIONS,
});

export default meta;
export { Overview, Values };
