/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { BRAND_APPS, BRAND_FAMILY, Logo } from '../../src/brand';
import type { BrandApp, BrandMarkFit, BrandMarkSize, BrandMarkVariant, BrandRim, IconArtFiles, LogoProps } from '../../src/brand';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { FillBoxes } from './_samples/FillBoxes';
import { IconFileRows } from './_samples/IconFileRows';
import { MarkOnGround } from './_samples/MarkOnGround';
import { RimGrid } from './_samples/RimGrid';
import { RIMS } from './_samples/RimGrid.constants';

type LogoArgs = {
  brand: BrandApp;
  size: BrandMarkSize;
  fit: BrandMarkFit;
  variant: BrandMarkVariant;
  rim: BrandRim;
};

const SIZES: readonly BrandMarkSize[] = ['sm', 'md', 'lg', 'xl'];

const ALL_SIZES: readonly BrandMarkSize[] = [...SIZES, 'xxl'];

const HEIGHT_SIZES: readonly BrandMarkSize[] = ['h26', 'h39'];

const PLAYGROUND_SIZES: readonly BrandMarkSize[] = [...ALL_SIZES, ...HEIGHT_SIZES, 'fill'];

const VARIANTS: readonly BrandMarkVariant[] = ['mark', 'app-icon'];

const APPS_WITH_ICONS = BRAND_APPS.filter((app) => BRAND_FAMILY[app].appIcon !== null);

const isBrandFile = (app: BrandApp, files: IconArtFiles): boolean =>
  files.kind === 'icon' || (files.kind === 'mark' && BRAND_FAMILY[app].appIcon === null);

const ARG_TYPES: PlaygroundArgTypes<LogoArgs> = {
  brand: { group: 'Content', control: 'select', options: [...BRAND_APPS] },
  size: { group: 'Appearance', control: 'select', options: [...PLAYGROUND_SIZES], description: '`fill` makes the mark fill the width of its parent and stay square. `h26` and `h39` are 26 and 39 px tall.' },
  fit: { group: 'Appearance', control: 'select', options: ['square', 'height'], description: '`height` makes `size` the height and the width follows the mark, so a wide mark is not shrunk into a square.' },
  variant: { group: 'Appearance', control: 'select', options: ['mark', 'app-icon'], description: 'The app icon as the brand data describes it: straight or on its tile. A brand with no app icon draws its mark.' },
  rim: { group: 'Appearance', control: 'select', options: [...RIMS], description: 'A thin light outline that follows the silhouette, so a dark mark reads on a dark surface.' },
};

const meta = {
  title: 'Core · Brand/Logo',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<LogoArgs>;

const Playground = {
  name: 'Playground',
  args: { brand: 'rotp', size: 'xl', fit: 'square', variant: 'mark', rim: 'none' },
  argTypes: ARG_TYPES,
  render: (args) => <Logo brand={args.brand} size={args.size} fit={args.fit} variant={args.variant} rim={args.rim} />,
} satisfies PlaygroundStory<LogoArgs>;

const sizeGrid = (apps: readonly BrandApp[], extra: Partial<LogoProps>) => (
  <Demonstrator
    rows={axis(apps)}
    columns={axis(SIZES)}
    cell={(brand, size) => <Logo brand={brand} size={size} title="" {...extra} />}
  />
);

const Sizes = {
  name: 'Sizes',
  render: () => sizeGrid(BRAND_APPS, {}),
} satisfies StoryLiteStoryDefinition<LogoArgs>;

const ExtraLarge = {
  name: 'Extra large',
  render: () => (
    <Demonstrator
      rows={axis(VARIANTS)}
      columns={axis(ALL_SIZES)}
      cell={(variant, size) => <Logo brand="archipelia" size={size} variant={variant} title="" />}
    />
  ),
} satisfies StoryLiteStoryDefinition<LogoArgs>;

const HeightFit = {
  name: 'Height fit',
  render: () => (
    <Demonstrator
      rows={axis(['argus', 'archipelia'] as const)}
      columns={axis(HEIGHT_SIZES)}
      cell={(brand, size) => <Logo brand={brand} size={size} fit="height" title="" />}
    />
  ),
} satisfies StoryLiteStoryDefinition<LogoArgs>;

const Fill = {
  name: 'Fill',
  render: () => <FillBoxes draw={() => <Logo brand="archipelia" size="fill" rim="light" title="" />} />,
} satisfies StoryLiteStoryDefinition<LogoArgs>;

const AppIcon = {
  name: 'App icon',
  render: () => sizeGrid(APPS_WITH_ICONS, { variant: 'app-icon' }),
} satisfies StoryLiteStoryDefinition<LogoArgs>;

const OnGradients = {
  name: 'On the dark gradient',
  render: () => (
    <Demonstrator
      rows={axis(BRAND_APPS)}
      cell={(brand) => <MarkOnGround brand={brand} />}
    />
  ),
} satisfies StoryLiteStoryDefinition<LogoArgs>;

const IconFiles = {
  name: 'Icon files',
  render: () => <IconFileRows pick={isBrandFile} />,
} satisfies StoryLiteStoryDefinition<LogoArgs>;

const SMALL_SIZES: readonly BrandMarkSize[] = ['sm', 'md', 'lg'];

const Rims = {
  name: 'Rims',
  render: () => <RimGrid draw={(brand, rim) => SMALL_SIZES.map((size) => <Logo key={size} brand={brand} size={size} rim={rim} title="" />)} />,
} satisfies StoryLiteStoryDefinition<LogoArgs>;

const RimFiles = {
  name: 'Rimmed icon files',
  render: () => <IconFileRows pick={isBrandFile} rims={['light']} />,
} satisfies StoryLiteStoryDefinition<LogoArgs>;

const Overview = overviewStory({
  component: 'Logo',
  description: 'An app\'s mark alone, sharp at any size, for a title bar, a tab or a list of projects.',
  points: [
    '`size` takes `sm` to `xxl`, or `fill` to follow the parent width; `variant="app-icon"` draws the app icon.',
    'Tessera has no app icon, because it is not an app.',
    '`rim="light"` outlines the silhouette, so a dark mark reads on a dark title bar.',
    '`fit="height"` makes `size` the height, so a wide mark keeps its shape; `h26` and `h39` are 26 and 39 px.',
    '`pnpm icons` writes every mark and app icon as PNG files and a Windows `.ico`, also with a light rim.',
    'Inside Splash each mark takes its dark look by itself; `brand/dark-ground` holds its files.',
  ],
  instead: '[Combined] for the mark with the app name.',
  playground: Playground,
  variants: [Sizes, ExtraLarge, HeightFit, Fill, AppIcon, Rims, OnGradients, IconFiles, RimFiles],
});

export default meta;
export { AppIcon, ExtraLarge, Fill, HeightFit, IconFiles, OnGradients, Overview, Playground, RimFiles, Rims, Sizes };
