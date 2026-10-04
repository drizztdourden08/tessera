/* @layer stories @kind story */
import type { ReactNode } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { AnimatedMascot, BRAND_FAMILY, ChosenMascot, MASCOT_CLIPS, Mascot } from '../../src/brand';
import type { AnimatedMascotBrand, BrandApp, BrandMarkSize, ChosenMascotProps, MascotClip, MascotPose } from '../../src/brand';
import { Span, Stack, Text } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { MASCOT_BRANDS, MASCOT_VARIANT_IDS } from './_samples/mascot-brands.constants';
import { IconFileRows } from './_samples/IconFileRows';
import { MascotAnimations } from './_samples/MascotAnimations';
import { MascotBreakdown } from './_samples/MascotBreakdown';
import { VariantGroups } from './_samples/VariantGroups';

type MascotArgs = {
  animation: MascotClip | 'none';
  speed: number;
  loop: boolean;
  playing: boolean;
  brand: BrandApp;
  variant: string;
  scale: number;
  lookX: number;
  lookY: number;
  limbLeft: number;
  limbRight: number;
};

const SIZES: readonly BrandMarkSize[] = ['sm', 'md', 'lg', 'xl'];

const POSES: Readonly<Record<string, MascotPose>> = {
  'At rest': {},
  'Looks left': { look: [-2, 0] },
  'Looks right': { look: [2, 0] },
  'Looks up': { look: [0, -1] },
  'Arms raised': { podAngles: { left: 25, right: -25 }, handAngles: { left: 45, right: -45 } },
  'Waving': { look: [1, 0], podAngles: { right: -75 }, handAngles: { right: -70 } },
};

const ARG_TYPES: PlaygroundArgTypes<MascotArgs> = {
  brand: { group: 'Content', control: 'select', options: [...MASCOT_BRANDS] },
  variant: { group: 'Appearance', control: 'select', options: [...MASCOT_VARIANT_IDS], description: 'A variant id from the brand\'s mascot data. An unknown one draws the mascot itself.' },
  scale: { group: 'Appearance', control: 'number', description: 'Screen pixels per art pixel. Whole numbers keep every pixel square.' },
  lookX: { group: 'State', control: 'range', min: -2, max: 2, step: 1, description: 'Where the eyes look across, from -2 to 2 art pixels.' },
  lookY: { group: 'State', control: 'range', min: -1, max: 1, step: 1, description: 'Where the eyes look up or down, from -1 to 1 art pixels.' },
  limbLeft: { group: 'State', control: 'number', description: 'The turn in degrees of Sentri\'s left pod, around the point where it meets the body, or of Flint\'s left hand, around its shoulder. Pelago\'s upper left islet swings round the island by half that turn.' },
  limbRight: { group: 'State', control: 'number', description: 'The turn in degrees of Sentri\'s right pod, Flint\'s right hand or Pelago\'s upper right islet.' },
  animation: { group: 'Motion', control: 'select', options: ['none', ...MASCOT_CLIPS], description: 'The brand mascot\'s animation, drawn with AnimatedMascot; every mascot has the same ten. none draws the still Mascot with the variant and pose below.' },
  speed: { group: 'Motion', control: 'range', min: 0.25, max: 4, step: 0.25, description: 'Playback speed: 1 is normal, 0.5 half, 2 double.' },
  loop: { group: 'Motion', control: 'boolean', description: 'Plays the animation again and again. Off plays it once; turn playing off and on to see it again.' },
  playing: { group: 'Motion', control: 'boolean', description: 'Off pauses the animation where it is.' },
};

const meta = {
  title: 'Core · Brand/Mascot',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<MascotArgs>;

const Playground = {
  name: 'Playground',
  args: { animation: 'idle', speed: 1, loop: true, playing: true, brand: 'rotp', variant: 'sentri', scale: 5, lookX: 0, lookY: 0, limbLeft: 0, limbRight: 0 },
  argTypes: ARG_TYPES,
  render: (args) => (args.animation === 'none' ? (
    <Mascot
      brand={args.brand}
      variant={args.variant}
      scale={args.scale}
      pose={{ look: [args.lookX, args.lookY], podAngles: { left: args.limbLeft, right: args.limbRight }, handAngles: { left: args.limbLeft, right: args.limbRight } }}
    />
  ) : (
    <AnimatedMascot brand={args.brand as AnimatedMascotBrand} animation={args.animation} speed={args.speed} loop={args.loop} playing={args.playing} scale={args.scale} />
  )),
} satisfies PlaygroundStory<MascotArgs>;

const Animations = {
  name: 'Animations',
  render: () => <MascotAnimations />,
} satisfies StoryLiteStoryDefinition<MascotArgs>;

const Variants = {
  name: 'Variants',
  render: () => (
    <Stack gap="xl">
      {MASCOT_BRANDS.map((brand) => (
        <Demonstrator
          key={brand}
          rows={BRAND_FAMILY[brand].mascot?.variants.map((v) => ({ key: v.id, label: v.name })) ?? []}
          cell={(variant) => (
            <Stack gap="sm">
              <Mascot brand={brand} variant={variant} scale={4} />
              <Text variant="caption">{BRAND_FAMILY[brand].mascot?.variants.find((v) => v.id === variant)?.summary}</Text>
            </Stack>
          )}
        />
      ))}
    </Stack>
  ),
} satisfies StoryLiteStoryDefinition<MascotArgs>;

const Sizes = {
  name: 'Sizes',
  render: () => (
    <Demonstrator rows={axis(MASCOT_BRANDS)} columns={axis(SIZES)} cell={(brand, size) => <Mascot brand={brand} size={size} title="" />} />
  ),
} satisfies StoryLiteStoryDefinition<MascotArgs>;

const Poses = {
  name: 'Poses',
  render: () => (
    <VariantGroups
      groups={MASCOT_BRANDS.map((brand) => ({
        key: brand,
        label: brand,
        items: Object.entries(POSES).map(([label, pose]) => ({ key: label, label, node: <Mascot brand={brand} pose={pose} scale={3} title="" /> })),
      }))}
    />
  ),
} satisfies StoryLiteStoryDefinition<MascotArgs>;

const Breakdown = {
  name: 'Breakdown',
  render: () => (
    <Stack gap="xl">
      {MASCOT_BRANDS.map((brand) => <MascotBreakdown key={brand} brand={brand} />)}
    </Stack>
  ),
} satisfies StoryLiteStoryDefinition<MascotArgs>;

const PICK_PALETTES = ['rotp', 'brock', 'archipelia'] as const satisfies readonly BrandApp[];

const PICKS: Readonly<Record<(typeof PICK_PALETTES)[number], ChosenMascotProps>> = {
  rotp: { mascot: 'sentri' },
  brock: { mascot: 'flint' },
  archipelia: { mascot: 'pelago' },
};

const PICK_WAYS = [
  { key: 'name', label: 'by name' },
  { key: 'brand', label: 'auto, by brand' },
  { key: 'palette', label: 'auto, inside data-palette' },
] as const;

type PickWay = (typeof PICK_WAYS)[number]['key'];

const pickCell = (palette: (typeof PICK_PALETTES)[number], way: PickWay): ReactNode => {
  if (way === 'name') return <ChosenMascot {...PICKS[palette]} animation="scan" scale={3} />;
  if (way === 'brand') return <ChosenMascot mascot="auto" brand={palette} animation="scan" scale={3} />;
  return <Span data-palette={palette}><ChosenMascot animation="wave" scale={3} /></Span>;
};

const Chosen = {
  name: 'Picked by name or palette',
  render: () => (
    <Demonstrator
      rows={PICK_PALETTES.map((palette) => ({ key: palette, label: `${palette}: ${PICKS[palette].mascot ?? ''}` }))}
      columns={PICK_WAYS}
      cell={pickCell}
    />
  ),
} satisfies StoryLiteStoryDefinition<MascotArgs>;

const IconFiles = {
  name: 'Icon files',
  render: () => <IconFileRows pick={(_app, files) => files.kind === 'mascot'} />,
} satisfies StoryLiteStoryDefinition<MascotArgs>;

const Overview = overviewStory({
  component: 'Mascot',
  description: 'An app\'s mascot, drawn in code from its own SVG pieces: still with `Mascot`, moving with `AnimatedMascot`.',
  points: [
    'Three so far: Sentri for Relic of the Past, Flint for Brock and Pelago for Archipelia.',
    '`pose` moves the eyes and turns the limbs: Sentri\'s pods, Flint\'s hands or Pelago\'s upper islets.',
    'Every mascot plays the same ten clips, from idle to link, so one clip name works for all three.',
    'Pelago is an island spirit: islets orbit it on threads of light, and `link` runs a spark around them.',
    '`scale` sets screen pixels per art unit and `size` uses the mark sizes; reduced motion shows it at rest.',
    '`ChosenMascot` picks one by name, or with `auto` by `brand` or `data-palette`; no match draws none.',
  ],
  instead: '[Logo] for the app\'s mark, or [Brand] for the whole family on one page.',
  playground: Playground,
  variants: [Animations, Variants, Sizes, Poses, Chosen, IconFiles],
  code: `import { AnimatedMascot, Mascot } from '@drizztdourden08/tessera/brand';

<Mascot brand="rotp" size="lg" />
<Mascot brand="rotp" variant="hookshop" scale={4} />
<Mascot brand="rotp" pose={{ look: [2, 0], podAngles: { left: 25 } }} />

<AnimatedMascot brand="rotp" animation="idle" scale={4} />
<AnimatedMascot brand="rotp" animation="jump" speed={0.5} playing={!paused} onFinish={backToIdle} />
<AnimatedMascot brand="brock" animation="point" scale={4} />
<Mascot brand="brock" pose={{ handAngles: { right: -70 } }} />
<AnimatedMascot brand="archipelia" animation="link" scale={4} />

<ChosenMascot mascot="auto" animation="scan" />`,
});

export default meta;
export { Breakdown, Chosen, IconFiles, Overview };
