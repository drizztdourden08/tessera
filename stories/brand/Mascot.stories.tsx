/* @layer stories @kind story */
import type { ReactNode } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { BRAND_FAMILY, MASCOT_CLIPS, Mascot } from '../../src/brand';
import type { AnimatedMascotBrand, BrandMarkSize } from '../../src/brand';
import { Stack, Text } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { MASCOT_VARIANT_IDS } from './_samples/mascot-brands.constants';
import { MASCOT_POSES } from './_samples/mascot-poses.constants';
import { IconFileRows } from './_samples/IconFileRows';
import { MascotAnimations } from './_samples/MascotAnimations';
import { MascotBreakdown } from './_samples/MascotBreakdown';
import { MascotPicks } from './_samples/MascotPicks';
import { MascotStates } from './_samples/MascotStates';
import { MascotPlayground } from './_samples/MascotPlayground';
import type { MascotPlaygroundArgs } from './_samples/MascotPlayground.type';
import { MascotTabbed } from './_samples/MascotTabbed';
import { MascotTabs } from './_samples/MascotTabs';
import { VariantGroups } from './_samples/VariantGroups';
import { StageTabs } from './_samples/stage/StageTabs';

type Draw = (brand: AnimatedMascotBrand) => ReactNode;

const SIZES: readonly BrandMarkSize[] = ['sm', 'md', 'lg', 'xl'];

const ARG_TYPES: PlaygroundArgTypes<MascotPlaygroundArgs> = {
  variant: { group: 'Appearance', control: 'select', options: MASCOT_VARIANT_IDS, description: 'mascot draws the mascot of the tab above. hookshop is a Sentri variant; on the others it draws the plain mascot.' },
  scale: { group: 'Appearance', control: 'number', description: 'Screen pixels per art pixel. Whole numbers keep every pixel square.' },
  lookX: { group: 'State', control: 'range', min: -2, max: 2, step: 1, description: 'Where the eyes look across, from -2 to 2 art pixels.' },
  lookY: { group: 'State', control: 'range', min: -1, max: 1, step: 1, description: 'Where the eyes look up or down, from -1 to 1 art pixels.' },
  limbLeft: { group: 'State', control: 'number', description: 'The turn in degrees of Sentri\'s left pod, around the point where it meets the body, or of Flint\'s left hand, around its shoulder. Pelago\'s upper left islet swings round the island by half that turn.' },
  limbRight: { group: 'State', control: 'number', description: 'The turn in degrees of Sentri\'s right pod, Flint\'s right hand or Pelago\'s upper right islet.' },
  animation: { group: 'Motion', control: 'select', options: ['none', ...MASCOT_CLIPS], description: 'The mascot\'s animation, drawn with AnimatedMascot; every mascot has the same 29. none draws the still Mascot with the variant and pose below.' },
  speed: { group: 'Motion', control: 'range', min: 0.25, max: 4, step: 0.25, description: 'Playback speed: 1 is normal, 0.5 half, 2 double.' },
  loop: { group: 'Motion', control: 'boolean', description: 'Plays the animation again and again. Off plays it once, then the mascot goes back to idle; turn loop on and off to see it again.' },
  face: { group: 'Motion', control: 'select', options: ['right', 'left'], description: 'The way the mascot faces. It turns round on the spot; letters, the laptop and the other symbols stay readable.' },
  playing: { group: 'Motion', control: 'boolean', description: 'Off pauses the animation where it is.' },
};

const meta = {
  title: 'Core · Brand/Mascot',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<MascotPlaygroundArgs>;

const section = (name: string, draw: Draw, tabs = false): StoryLiteStoryDefinition<MascotPlaygroundArgs> => ({
  name,
  render: () => <MascotTabbed draw={draw} tabs={tabs} />,
});

const Playground = {
  name: 'Playground',
  args: { animation: 'idle', speed: 1, loop: true, face: 'right', playing: true, variant: 'mascot', scale: 5, lookX: 0, lookY: 0, limbLeft: 0, limbRight: 0 },
  argTypes: ARG_TYPES,
  render: (args) => <MascotPlayground {...args} />,
} satisfies PlaygroundStory<MascotPlaygroundArgs>;

const drawVariants: Draw = (brand) => (
  <Demonstrator
    rows={BRAND_FAMILY[brand].mascot?.variants.map((v) => ({ key: v.id, label: v.name })) ?? []}
    cell={(variant) => (
      <Stack gap="sm">
        <Mascot brand={brand} variant={variant} scale={4} />
        <Text variant="caption">{BRAND_FAMILY[brand].mascot?.variants.find((v) => v.id === variant)?.summary}</Text>
      </Stack>
    )}
  />
);

const drawSizes: Draw = (brand) => (
  <Demonstrator rows={[{ key: brand, label: brand }]} columns={axis(SIZES)} cell={(_row, size) => <Mascot brand={brand} size={size} title="" />} />
);

const drawPoses: Draw = (brand) => (
  <VariantGroups
    groups={[{
      key: brand,
      label: brand,
      items: Object.entries(MASCOT_POSES).map(([label, pose]) => ({ key: label, label, node: <Mascot brand={brand} pose={pose} scale={3} title="" /> })),
    }]}
  />
);

const drawBreakdown: Draw = (brand) => <MascotBreakdown brand={brand} />;

const drawPicks: Draw = (brand) => <MascotPicks brand={brand} />;

const drawIconFiles: Draw = (brand) => <IconFileRows pick={(app, files) => app === brand && files.kind === 'mascot'} />;

const PICKED = 'Picked by brand or palette';

const Breakdown = section('Breakdown', drawBreakdown, true);

const Chosen = section(PICKED, drawPicks, true);

const IconFiles = section('Icon files', drawIconFiles, true);

const Stage = {
  name: 'Stage',
  render: () => <StageTabs />,
} satisfies StoryLiteStoryDefinition<MascotPlaygroundArgs>;

const Overview = overviewStory({
  component: 'Mascot',
  description: 'An app\'s mascot, drawn in code from its own SVG pieces: still with `Mascot`, moving with `AnimatedMascot`.',
  points: [
    'Three so far: Sentri for Relic of the Past, Flint for Brock and Pelago for Archipelia.',
    'The tabs at the top pick the mascot for every section below; the gallery remembers the pick.',
    '`pose` moves the eyes and turns the limbs: Sentri\'s pods, Flint\'s hands or Pelago\'s upper islets.',
    'All three play the same 29 clips; change `animation` at any time and the mascot blends into the new one.',
    '`MascotStage` puts several on a stage where they walk, turn and act; the Stage page shows it.',
    '`scale` or `size` sets its size; `brand="auto"` picks the mascot of the nearest `data-palette`.',
  ],
  instead: '[Logo] for the app\'s mark, or [Brand] for the whole family on one page.',
  switcher: <MascotTabs />,
  playground: Playground,
  variants: [
    section('Animations', (brand) => <MascotAnimations brand={brand} />),
    section('States', (brand) => <MascotStates brand={brand} />),
    section('Variants', drawVariants),
    section('Sizes', drawSizes),
    section('Poses', drawPoses),
    section(PICKED, drawPicks),
    section('Icon files', drawIconFiles),
  ],
  code: `import { AnimatedMascot, Mascot, MascotStage } from '@drizztdourden08/tessera/brand';

<Mascot brand="rotp" size="lg" />
<Mascot brand="rotp" variant="hookshop" scale={4} />
<Mascot brand="rotp" pose={{ look: [2, 0], podAngles: { left: 25 } }} />

<AnimatedMascot brand="rotp" animation="idle" scale={4} />
<AnimatedMascot brand="rotp" animation={state} face="left" onFinish={() => setState('idle')} />
<AnimatedMascot brand="rotp" animation="jump" speed={0.5} playing={!paused} />
<AnimatedMascot brand="brock" animation="point" scale={4} />
<Mascot brand="brock" pose={{ handAngles: { right: -70 } }} />
<AnimatedMascot brand="archipelia" animation="link" scale={4} />

<AnimatedMascot brand="auto" animation="scan" />

<MascotStage cast={[{ id: 'sentri', brand: 'rotp' }, { id: 'flint', brand: 'brock', autonomy: true }]} ref={stage} />
stage.current?.actor('sentri')?.moveTo(120).then(() => stage.current?.actor('sentri')?.play('wave'));`,
});

export default meta;
export { Breakdown, Chosen, IconFiles, Overview, Stage };
