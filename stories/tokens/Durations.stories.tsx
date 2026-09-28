/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { scaleStories } from './scale-stories';
import { DURATIONS } from './token-lists';

const meta = {
  title: 'Tokens/Durations',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { Overview, Values } = scaleStories({
  name: 'Durations',
  description: 'How long motion lasts, from a quick state change to a drawer sliding in and the slow loops of the brand art. Point at a track to play it.',
  specimen: 'duration',
  tokens: DURATIONS,
});

export default meta;
export { Overview, Values };
