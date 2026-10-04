/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { BRAND_APPS, Logo } from '../../src/brand';
import type { BrandApp, BrandMarkSize, BrandRim, LogoDirection } from '../../src/brand';
import { overviewStory } from '../_template/overview-story';
import { RimGrid } from './_samples/RimGrid';
import { RIMS } from './_samples/RimGrid.constants';
import { VariantGrid } from './_samples/VariantGrid';

type CombinedArgs = {
  brand: BrandApp;
  direction: LogoDirection;
  size: BrandMarkSize;
  rim: BrandRim;
};

const ARG_TYPES: PlaygroundArgTypes<CombinedArgs> = {
  brand: { group: 'Content', control: 'select', options: [...BRAND_APPS] },
  size: { group: 'Appearance', control: 'select', options: ['sm', 'md', 'lg', 'xl'], description: 'The mark size; the wordmark follows it.' },
  rim: { group: 'Appearance', control: 'select', options: [...RIMS], description: 'A thin outline in the rim colour that follows the silhouette, so a dark mark reads on a dark surface and a light one on a light surface.' },
  direction: { group: 'Layout', control: 'select', options: ['inline', 'stacked'] },
};

const meta = {
  title: 'Core · Brand/Combined',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<CombinedArgs>;

const Playground = {
  name: 'Playground',
  args: { brand: 'archipelia', direction: 'inline', size: 'lg', rim: 'none' },
  argTypes: ARG_TYPES,
  render: (args) => <Logo.Combined brand={args.brand} direction={args.direction} size={args.size} rim={args.rim} />,
} satisfies PlaygroundStory<CombinedArgs>;

const Inline = {
  name: 'Inline',
  render: () => <VariantGrid min="xl" items={BRAND_APPS.map((brand) => ({ key: brand, label: brand, node: <Logo.Combined brand={brand} size="lg" /> }))} />,
} satisfies StoryLiteStoryDefinition<CombinedArgs>;

const Stacked = {
  name: 'Stacked',
  render: () => <VariantGrid min="xl" items={BRAND_APPS.map((brand) => ({ key: brand, label: brand, node: <Logo.Combined brand={brand} direction="stacked" size="xl" /> }))} />,
} satisfies StoryLiteStoryDefinition<CombinedArgs>;

const Rims = {
  name: 'Rims',
  render: () => <RimGrid min="md" draw={(brand, rim) => <Logo.Combined brand={brand} size="md" rim={rim} />} />,
} satisfies StoryLiteStoryDefinition<CombinedArgs>;

const Overview = overviewStory({
  component: 'Combined',
  description: 'An app\'s mark and wordmark together: Logo.Combined. Inline sets the name beside the mark, for a header or a title bar with room to spare. Stacked sets it under the mark, for a splash or an about page. The pair reads as one image named after the brand. It takes brand (tessera by default), a size for the mark that the wordmark follows, and the mark\'s variant, where app-icon draws the app icon. A rim outlines both the mark and the name.',
  playground: Playground,
  variants: [Inline, Stacked, Rims],
  code: `import { Logo } from '@drizztdourden08/tessera';

<Logo.Combined brand="rotp" />
<Logo.Combined brand="rotp" direction="stacked" size="xl" />
<Logo.Combined brand="brock" rim="light" />`,
});

export default meta;
export { Inline, Overview, Playground, Rims, Stacked };
