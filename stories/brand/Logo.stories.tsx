/* @layer stories @kind story */
import type { ReactNode } from 'react';
import type { StoryLiteArgTypes, StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { BRAND_APPS, Logo } from '../../src/brand';
import type { BrandApp, BrandMarkSize, LogoDirection } from '../../src/brand';
import { Box, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';

type LogoPart = 'mark' | 'wordmark' | 'combined';

type LogoArgs = {
  brand: BrandApp;
  part: LogoPart;
  direction: LogoDirection;
  size: BrandMarkSize;
};

const ARG_TYPES: StoryLiteArgTypes<LogoArgs> = {
  brand: { control: 'select', options: [...BRAND_APPS] },
  part: { control: 'select', options: ['mark', 'wordmark', 'combined'], description: 'Logo, Logo.Wordmark or Logo.Combined.' },
  direction: { control: 'select', options: ['inline', 'stacked'], description: 'Logo.Combined only.' },
  size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
};

const meta = {
  title: 'Brand/Logo',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<LogoArgs>;

const renderPart = (args: LogoArgs) => {
  if (args.part === 'wordmark') return <Logo.Wordmark brand={args.brand} size={args.size === 'xl' ? 'lg' : 'md'} />;
  if (args.part === 'combined') return <Logo.Combined brand={args.brand} direction={args.direction} size={args.size} />;
  return <Logo brand={args.brand} size={args.size} />;
};

const Playground = {
  name: 'Playground',
  args: { brand: 'archipelia', part: 'combined', direction: 'inline', size: 'lg' },
  argTypes: ARG_TYPES,
  render: renderPart,
} satisfies StoryLiteStoryDefinition<LogoArgs>;

const byBrand = (render: (brand: BrandApp) => ReactNode) => (
  <Box className="story-list">
    {BRAND_APPS.map((brand) => (
      <Box key={brand} className="story-list__item">
        <Text className="story-label">{brand}</Text>
        {render(brand)}
      </Box>
    ))}
  </Box>
);

const Marks = {
  name: 'Marks',
  render: () => byBrand((brand) => <Logo brand={brand} size="lg" />),
} satisfies StoryLiteStoryDefinition<LogoArgs>;

const Wordmarks = {
  name: 'Wordmarks',
  render: () => byBrand((brand) => <Logo.Wordmark brand={brand} size="md" />),
} satisfies StoryLiteStoryDefinition<LogoArgs>;

const CombinedInline = {
  name: 'Combined, inline',
  render: () => byBrand((brand) => <Logo.Combined brand={brand} size="lg" />),
} satisfies StoryLiteStoryDefinition<LogoArgs>;

const CombinedStacked = {
  name: 'Combined, stacked',
  render: () => byBrand((brand) => <Logo.Combined brand={brand} direction="stacked" size="xl" />),
} satisfies StoryLiteStoryDefinition<LogoArgs>;

const Overview = overviewStory({
  component: 'Logo',
  description: 'An app\'s logo in the three shapes an app needs. Logo is the mark alone, for tight spots like a title bar. Logo.Wordmark is the name in the pixel alphabet. Logo.Combined puts the two together, inline for a header or stacked for a splash or an about page, and reads as one image named after the brand. Every part takes brand (tessera by default) and a size.',
  playground: Playground,
  variants: [Marks, Wordmarks, CombinedInline, CombinedStacked],
  code: `import { Logo } from '@drizztdourden08/tessera';

<Logo brand="rotp" />
<Logo.Wordmark brand="rotp" />
<Logo.Combined brand="rotp" direction="stacked" />`,
});

export default meta;
export { CombinedInline, CombinedStacked, Marks, Overview, Playground, Wordmarks };
