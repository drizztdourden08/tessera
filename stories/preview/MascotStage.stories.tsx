/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { overviewStory } from '../_template/overview-story';
import { STAGE_STORIES } from './_samples/stage-stories';

const meta = {
  title: 'Preview · For approval/Mascot stage',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<Record<string, never>>;

const { Stage, Director, Dialogue, Follow, Tour, Tuning, Flips, Speed, Reduced, Stress, SideBySide, Crowd } = STAGE_STORIES;

const Overview = overviewStory({
  component: 'Mascot stage',
  code: false,
  description: 'A prototype for approval, in the gallery only: the mascots walk, turn and change clips on a stage, without a jump.',
  points: [
    'Nothing here is in the package until you approve it. The clips are the approved ones, unchanged.',
    'Each mascot stands at a spot and faces left or right; letters and the laptop stay readable.',
    'A new clip cuts in with a short cross-fade; queued clips wait; walks brake to a stop on the spot.',
    'Symbols such as the question mark and the z letters fade in and out with the clips.',
    'A mascot can be hidden and shown again; it keeps its place and costs nothing while hidden.',
    'On its own, a mascot picks small things to do, wanders, looks around and naps after a quiet spell.',
  ],
  variants: [Stage, Director, Dialogue, Follow, Tour, Tuning, Flips, Speed, Reduced, Stress, SideBySide, Crowd],
});

export default meta;
export { Crowd, Dialogue, Director, Flips, Follow, Overview, Reduced, SideBySide, Speed, Stage, Stress, Tour, Tuning };
