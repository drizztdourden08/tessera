/* @layer stories @kind story */
import type { StoryLiteArgTypes, StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { BRAND_APPS, Logo } from '../../src/brand';
import type { BrandApp, BrandMarkSize, LogoDirection } from '../../src/brand';
import { overviewStory } from '../_template/overview-story';
import { labelledList } from './labelled-list';

type CombinedArgs = {
  brand: BrandApp;
  direction: LogoDirection;
  size: BrandMarkSize;
};

const ARG_TYPES: StoryLiteArgTypes<CombinedArgs> = {
  brand: { control: 'select', options: [...BRAND_APPS] },
  direction: { control: 'select', options: ['inline', 'stacked'] },
  size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'], description: 'The mark size; the wordmark follows it.' },
};

const meta = {
  title: 'Brand/Combined',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<CombinedArgs>;

const Playground = {
  name: 'Playground',
  args: { brand: 'archipelia', direction: 'inline', size: 'lg' },
  argTypes: ARG_TYPES,
  render: (args) => <Logo.Combined brand={args.brand} direction={args.direction} size={args.size} />,
} satisfies StoryLiteStoryDefinition<CombinedArgs>;

const Inline = {
  name: 'Inline',
  render: () => labelledList(BRAND_APPS, (brand) => <Logo.Combined brand={brand} size="lg" />),
} satisfies StoryLiteStoryDefinition<CombinedArgs>;

const Stacked = {
  name: 'Stacked',
  render: () => labelledList(BRAND_APPS, (brand) => <Logo.Combined brand={brand} direction="stacked" size="xl" />),
} satisfies StoryLiteStoryDefinition<CombinedArgs>;

const Overview = overviewStory({
  component: 'Combined',
  description: 'An app\'s mark and wordmark together: Logo.Combined. Inline sets the name beside the mark, for a header or a title bar with room to spare. Stacked sets it under the mark, for a splash or an about page. The pair reads as one image named after the brand. It takes brand (tessera by default), a size for the mark that the wordmark follows, and the mark\'s variant, where app-icon draws the app icon.',
  playground: Playground,
  variants: [Inline, Stacked],
  code: `import { Logo } from '@drizztdourden08/tessera';

<Logo.Combined brand="rotp" />
<Logo.Combined brand="rotp" direction="stacked" size="xl" />`,
});

export default meta;
export { Inline, Overview, Playground, Stacked };
