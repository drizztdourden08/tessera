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
  description: 'The curves motion follows.',
  points: [
    '`--ease-standard` suits most changes.',
    '`--ease-emphasized` suits a part entering the screen: it starts fast and settles slowly.',
    'Point at a track to play it.',
  ],
  instead: '[Transitions] for a duration and an easing paired.',
  specimen: 'easing',
  tokens: EASINGS,
});

export default meta;
export { Overview, Values };
