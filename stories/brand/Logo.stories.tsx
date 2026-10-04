/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { BRAND_APPS, BRAND_FAMILY, Logo } from '../../src/brand';
import type { BrandApp, BrandMarkSize, BrandMarkVariant, BrandRim, IconArtFiles, LogoProps } from '../../src/brand';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { IconFileRows } from './_samples/IconFileRows';
import { RimGrid } from './_samples/RimGrid';
import { RIMS } from './_samples/RimGrid.constants';

type LogoArgs = {
  brand: BrandApp;
  size: BrandMarkSize;
  variant: BrandMarkVariant;
  rim: BrandRim;
};

const SIZES: readonly BrandMarkSize[] = ['sm', 'md', 'lg', 'xl'];

const APPS_WITH_ICONS = BRAND_APPS.filter((app) => BRAND_FAMILY[app].appIcon !== null);

const isBrandFile = (app: BrandApp, files: IconArtFiles): boolean =>
  files.kind === 'icon' || (files.kind === 'mark' && BRAND_FAMILY[app].appIcon === null);

const ARG_TYPES: PlaygroundArgTypes<LogoArgs> = {
  brand: { group: 'Content', control: 'select', options: [...BRAND_APPS] },
  size: { group: 'Appearance', control: 'select', options: [...SIZES] },
  variant: { group: 'Appearance', control: 'select', options: ['mark', 'app-icon'], description: 'The app icon as the brand data describes it: straight or on its tile. A brand with no app icon draws its mark.' },
  rim: { group: 'Appearance', control: 'select', options: [...RIMS], description: 'A thin outline in the rim colour that follows the silhouette, so a dark mark reads on a dark surface and a light one on a light surface.' },
};

const meta = {
  title: 'Core · Brand/Logo',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<LogoArgs>;

const Playground = {
  name: 'Playground',
  args: { brand: 'rotp', size: 'xl', variant: 'mark', rim: 'none' },
  argTypes: ARG_TYPES,
  render: (args) => <Logo brand={args.brand} size={args.size} variant={args.variant} rim={args.rim} />,
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

const AppIcon = {
  name: 'App icon',
  render: () => sizeGrid(APPS_WITH_ICONS, { variant: 'app-icon' }),
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
  render: () => <IconFileRows pick={isBrandFile} rims={['light', 'dark']} />,
} satisfies StoryLiteStoryDefinition<LogoArgs>;

const Overview = overviewStory({
  component: 'Logo',
  description: 'An app\'s mark alone, sharp at any size, for a title bar, a tab or a list of projects.',
  points: [
    '`size` takes `sm`, `md`, `lg` or `xl`; `variant="app-icon"` draws the app icon from the brand data.',
    'Tessera has no app icon, because it is not an app.',
    '`rim="light"` or `"dark"` outlines the silhouette, so a dark mark reads on a dark title bar.',
    '`pnpm icons` writes every mark and app icon as PNG files from 16 to 512 and a Windows `.ico`.',
    'It writes them again with each rim, under `brand/light-rim` and `brand/dark-rim`, always without a tile.',
  ],
  instead: '[Combined] for the mark with the app name.',
  playground: Playground,
  variants: [Sizes, AppIcon, Rims, IconFiles, RimFiles],
});

export default meta;
export { AppIcon, IconFiles, Overview, Playground, RimFiles, Rims, Sizes };
