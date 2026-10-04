/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { overviewStory } from '../_template/overview-story';
import { StageCrowd } from './_samples/StageCrowd';
import { StageLab } from './_samples/StageLab';
import { StageSideBySide } from './_samples/StageSideBySide';

type StageArgs = Record<string, never>;

const meta = {
  title: 'Core · Brand/Mascot stage',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<StageArgs>;

const Stage = {
  name: 'Stage',
  render: () => <StageLab />,
} satisfies StoryLiteStoryDefinition<StageArgs>;

const SideBySide = {
  name: 'Side by side',
  render: () => <StageSideBySide />,
} satisfies StoryLiteStoryDefinition<StageArgs>;

const Crowd = {
  name: 'Crowd',
  render: () => <StageCrowd />,
} satisfies StoryLiteStoryDefinition<StageArgs>;

const Overview = overviewStory({
  component: 'MascotStage',
  description: 'Spike: a strip of fixed height and any width where the mascots live, walk, turn and move between clips with cross-fades, even mid-clip.',
  points: [
    'Each mascot stands at an x (its foot centre, in stage pixels) and faces left or right; facing left mirrors the rig and keeps letters and the laptop upright.',
    '`play` cuts in at once with a short cross-fade; `queue` waits; `moveTo` walks with the move clip, braking to a stop on the spot.',
    'Extras (question marks, z letters, the laptop) fade in and out with the clips, or by hand with `effect` and `effects`.',
    'Autonomous mode picks small behaviours by weight with cooldowns, wanders, scans and naps after a long quiet spell.',
    'The clips are the approved data, played by a sampler that draws exactly what the browser drew before.',
  ],
  variants: [Stage, SideBySide, Crowd],
  code: `import { MascotStage } from '@drizztdourden08/tessera/brand';

const stage = useRef<MascotStageHandle>(null);

<MascotStage ref={stage} height={160} cast={[{ id: 'sentri', brand: 'rotp', x: 120, autonomy: true }]} />

stage.current?.actor('sentri')?.play('spin');
stage.current?.actor('sentri')?.play('alert-exclaim'); // cuts in mid-spin with a blend
stage.current?.actor('sentri')?.moveTo(400, { clip: 'move-wobble' });
stage.current?.actor('sentri')?.queue([{ play: 'working', at: 60, face: 'right', loop: 3 }, { moveTo: 120 }]);`,
});

export default meta;
export { Crowd, Overview, SideBySide, Stage };
