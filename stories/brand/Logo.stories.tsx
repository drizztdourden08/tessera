/* @layer stories @kind story */
import type { StoryLiteArgTypes, StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { BRAND_APPS, BRAND_FAMILY, Logo } from '../../src/brand';
import type { BrandApp, BrandMarkSize, BrandMarkVariant, IconArtFiles, LogoProps } from '../../src/brand';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { IconFileRows } from './_samples/IconFileRows';

type LogoArgs = {
  brand: BrandApp;
  size: BrandMarkSize;
  variant: BrandMarkVariant;
};

const SIZES: readonly BrandMarkSize[] = ['sm', 'md', 'lg', 'xl'];

const APPS_WITH_ICONS = BRAND_APPS.filter((app) => BRAND_FAMILY[app].appIcon !== null);

const isBrandFile = (app: BrandApp, files: IconArtFiles): boolean =>
  files.kind === 'icon' || (files.kind === 'mark' && BRAND_FAMILY[app].appIcon === null);

const ARG_TYPES: StoryLiteArgTypes<LogoArgs> = {
  brand: { control: 'select', options: [...BRAND_APPS] },
  size: { control: 'select', options: [...SIZES] },
  variant: { control: 'select', options: ['mark', 'app-icon'], description: 'The app icon as the brand data describes it: straight or on its tile. A brand with no app icon draws its mark.' },
};

const meta = {
  title: 'Brand/Logo',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<LogoArgs>;

const Playground = {
  name: 'Playground',
  args: { brand: 'rotp', size: 'xl', variant: 'mark' },
  argTypes: ARG_TYPES,
  render: (args) => <Logo brand={args.brand} size={args.size} variant={args.variant} />,
} satisfies StoryLiteStoryDefinition<LogoArgs>;

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

const Overview = overviewStory({
  component: 'Logo',
  description: 'An app\'s mark alone, drawn inline from path data so it stays sharp at any size. Use it where there is room for a mark but not a name: a title bar, a tab, a list of projects. It comes in four sizes, and variant="app-icon" draws the app icon the brand data describes: Relic of the Past and Brock use the mark straight, Archipelia sits on its tile, and Tessera has none because it is not an app. `pnpm icons` turns every mark, app icon and mascot into the files an app ships: a PNG at each size from 16 to 512, crisp whole pixels where pixel art fits, and a Windows .ico from 16 to 256. Tessera gets a mark.ico, the gallery favicon. Icon files shows each brand\'s own files as generated, every size and the .ico in one row that scrolls sideways. Mascots and their files have their own page.',
  playground: Playground,
  variants: [Sizes, AppIcon, IconFiles],
});

export default meta;
export { AppIcon, IconFiles, Overview, Playground, Sizes };
