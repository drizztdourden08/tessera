/* @layer stories @kind story */
import type { StoryLiteArgTypes, StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { BRAND_APPS, Logo } from '../../src/brand';
import type { BrandApp, LogoWordmarkProps } from '../../src/brand';
import { Flex } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';

type WordmarkSize = NonNullable<LogoWordmarkProps['size']>;

type WordMarkArgs = {
  brand: BrandApp;
  size: WordmarkSize;
};

const SIZES: readonly WordmarkSize[] = ['sm', 'md', 'lg'];

const ARG_TYPES: StoryLiteArgTypes<WordMarkArgs> = {
  brand: { control: 'select', options: [...BRAND_APPS] },
  size: { control: 'select', options: [...SIZES] },
};

const meta = {
  title: 'Brand/WordMark',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<WordMarkArgs>;

const Playground = {
  name: 'Playground',
  args: { brand: 'rotp', size: 'md' },
  argTypes: ARG_TYPES,
  render: (args) => <Logo.Wordmark brand={args.brand} size={args.size} />,
} satisfies StoryLiteStoryDefinition<WordMarkArgs>;

const Wordmarks = {
  name: 'Wordmarks',
  render: () => <Demonstrator rows={axis(BRAND_APPS)} cell={(brand) => <Logo.Wordmark brand={brand} size="md" />} />,
} satisfies StoryLiteStoryDefinition<WordMarkArgs>;

const Sizes = {
  name: 'Sizes',
  render: () => (
    <Demonstrator
      rows={axis(SIZES)}
      cell={(size) => (
        <Flex gap="lg" align="center" wrap>
          {BRAND_APPS.map((brand) => <Logo.Wordmark key={brand} brand={brand} size={size} title="" />)}
        </Flex>
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<WordMarkArgs>;

const Overview = overviewStory({
  component: 'WordMark',
  description: 'An app\'s name set in the pixel alphabet, in the brand\'s own colours: Logo.Wordmark. Use it where the name should read as the brand, beside a mark or alone in a header. Uppercase letters draw at capital size and lowercase smaller, so each name keeps the shape of its artwork. It takes brand (tessera by default) and a size, and names itself after the brand for screen readers.',
  playground: Playground,
  variants: [Wordmarks, Sizes],
  code: `import { Logo } from '@drizztdourden08/tessera';

<Logo.Wordmark brand="rotp" />
<Logo.Wordmark brand="rotp" size="lg" />`,
});

export default meta;
export { Overview, Playground, Sizes, Wordmarks };
