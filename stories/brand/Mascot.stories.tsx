/* @layer stories @kind story */
import type { StoryLiteArgTypes, StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { BRAND_FAMILY, Mascot } from '../../src/brand';
import type { BrandApp, BrandMarkSize, MascotPose } from '../../src/brand';
import { Stack, Text } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { MASCOT_BRANDS, MASCOT_VARIANT_IDS } from './_samples/mascot-brands.constants';
import { MascotBreakdown } from './_samples/MascotBreakdown';

type MascotArgs = {
  brand: BrandApp;
  variant: string;
  scale: number;
  lookX: number;
  lookY: number;
  podLeft: number;
  podRight: number;
};

const SIZES: readonly BrandMarkSize[] = ['sm', 'md', 'lg', 'xl'];

const POSES: Readonly<Record<string, MascotPose>> = {
  'At rest': {},
  'Looks left': { look: [-2, 0] },
  'Looks right': { look: [2, 0] },
  'Looks up': { look: [0, -1] },
  'Pods raised': { podAngles: { left: 25, right: -25 } },
};

const ARG_TYPES: StoryLiteArgTypes<MascotArgs> = {
  brand: { control: 'select', options: [...MASCOT_BRANDS] },
  variant: { control: 'select', options: [...MASCOT_VARIANT_IDS], description: 'A variant id from the brand\'s mascot data. An unknown one draws the mascot itself.' },
  scale: { control: 'number', description: 'Screen pixels per art pixel. Whole numbers keep every pixel square.' },
  lookX: { control: 'number', description: 'Where the eyes look across, from -2 to 2 art pixels.' },
  lookY: { control: 'number', description: 'Where the eyes look up or down, from -1 to 1 art pixels.' },
  podLeft: { control: 'number', description: 'The left pod\'s turn in degrees, around the point where it meets the body.' },
  podRight: { control: 'number', description: 'The right pod\'s turn in degrees.' },
};

const meta = {
  title: 'Brand/Mascot',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<MascotArgs>;

const Playground = {
  name: 'Playground',
  args: { brand: 'rotp', variant: 'sentri', scale: 5, lookX: 0, lookY: 0, podLeft: 0, podRight: 0 },
  argTypes: ARG_TYPES,
  render: (args) => (
    <Mascot
      brand={args.brand}
      variant={args.variant}
      scale={args.scale}
      pose={{ look: [args.lookX, args.lookY], podAngles: { left: args.podLeft, right: args.podRight } }}
    />
  ),
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
    <Demonstrator
      rows={axis(MASCOT_BRANDS)}
      columns={axis(Object.keys(POSES))}
      cell={(brand, pose) => <Mascot brand={brand} pose={POSES[pose]} scale={3} title="" />}
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

const Overview = overviewStory({
  component: 'Mascot',
  description: 'An app\'s mascot, built in code from its separate SVG pieces: a composition function places, turns and clips each piece, and Mascot draws the result inline. The mascot comes from the brand data, so any app can add one; Relic of the Past is the only one with a mascot so far: Sentri, a gold pyramid with a visor, eyes and pods. Its variants are Sentri at rest and the Hookshop highlight, where Sentri pulls a shop bag in with its hookshot. A pose moves the eyes and turns the pods without new art. Use size for the mark sizes, or scale for whole screen pixels per art pixel. Breakdown shows every piece alone and the assembly step by step.',
  playground: Playground,
  variants: [Variants, Sizes, Poses],
  code: `import { Mascot } from '@drizztdourden08/tessera/brand';

<Mascot brand="rotp" size="lg" />
<Mascot brand="rotp" variant="hookshop" scale={4} />
<Mascot brand="rotp" pose={{ look: [2, 0], podAngles: { left: 25 } }} />`,
});

export default meta;
export { Breakdown, Overview };
