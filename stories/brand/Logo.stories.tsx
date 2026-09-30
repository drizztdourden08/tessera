/* @layer stories @kind story */
import type { StoryLiteArgTypes, StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { BRAND_APPS, Logo } from '../../src/brand';
import type { BrandApp, BrandMarkSize, BrandMarkVariant, LogoProps } from '../../src/brand';
import { overviewStory } from '../_template/overview-story';
import { axis, VariantGrid } from '../_template/VariantGrid';

type LogoArgs = {
  brand: BrandApp;
  size: BrandMarkSize;
  variant: BrandMarkVariant;
  tile: boolean;
};

const SIZES: readonly BrandMarkSize[] = ['sm', 'md', 'lg', 'xl'];

const ARG_TYPES: StoryLiteArgTypes<LogoArgs> = {
  brand: { control: 'select', options: [...BRAND_APPS] },
  size: { control: 'select', options: [...SIZES] },
  variant: { control: 'select', options: ['mark', 'mascot'], description: 'The mascot, where the app has one.' },
  tile: { control: 'boolean', description: 'Draws the mark on its app-icon tile.' },
};

const meta = {
  title: 'Brand/Logo',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<LogoArgs>;

const Playground = {
  name: 'Playground',
  args: { brand: 'rotp', size: 'xl', variant: 'mark', tile: false },
  argTypes: ARG_TYPES,
  render: (args) => <Logo brand={args.brand} size={args.size} variant={args.variant} tile={args.tile} />,
} satisfies StoryLiteStoryDefinition<LogoArgs>;

const sizeGrid = (extra: Partial<LogoProps>) => (
  <VariantGrid
    rows={axis(BRAND_APPS)}
    columns={axis(SIZES)}
    cell={(brand, size) => <Logo brand={brand} size={size} title="" {...extra} />}
  />
);

const Sizes = {
  name: 'Sizes',
  render: () => sizeGrid({}),
} satisfies StoryLiteStoryDefinition<LogoArgs>;

const AppIcon = {
  name: 'App icon',
  render: () => sizeGrid({ tile: true }),
} satisfies StoryLiteStoryDefinition<LogoArgs>;

const Mascot = {
  name: 'Mascot',
  render: () => sizeGrid({ variant: 'mascot' }),
} satisfies StoryLiteStoryDefinition<LogoArgs>;

const Overview = overviewStory({
  component: 'Logo',
  description: 'An app\'s mark alone, drawn inline from path data so it stays sharp at any size. Use it where there is room for a mark but not a name: a title bar, a tab, a list of projects. It comes in four sizes, can sit on its app-icon tile, and draws the app\'s mascot when asked, falling back to the mark for an app without one. It takes brand (tessera by default).',
  playground: Playground,
  variants: [Sizes, AppIcon, Mascot],
});

export default meta;
export { AppIcon, Mascot, Overview, Playground, Sizes };
