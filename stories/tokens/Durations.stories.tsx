/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { scaleStories } from './scale-stories';
import { DURATIONS } from './token-lists';

const meta = {
  title: 'Core · Tokens/Durations',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { Overview, Values } = scaleStories({
  name: 'Durations',
  description: 'How long motion lasts, from a quick state change to a drawer sliding in.',
  points: [
    '`--duration-fast`, `--duration-normal` and `--duration-slow` time most changes.',
    '`--duration-drawer` times a drawer, and the rest time the slow loops of the brand art.',
    'Point at a track to play it.',
  ],
  instead: '[Transitions] for a duration and an easing paired.',
  specimen: 'duration',
  tokens: DURATIONS,
});

export default meta;
export { Overview, Values };
