/* @layer stories @kind story */
import type { StoryLiteArgTypes, StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Badge, Box, Card, Flex, Stack, Text } from '../../src/primitives';
import { BRAND_APPS, BRAND_FAMILY, BrandMark, BrandWordmark, brandGradientCss } from '../../src/brand';
import type { BrandApp, BrandMarkSize, BrandMarkVariant } from '../../src/brand';
import { overviewStory } from '../_template/overview-story';
import { axis, VariantGrid } from '../_template/VariantGrid';
import './BrandMark.stories.css';

type BrandMarkArgs = {
  app: BrandApp;
  size: BrandMarkSize;
  variant: BrandMarkVariant;
  tile: boolean;
};

const SIZES: readonly BrandMarkSize[] = ['sm', 'md', 'lg', 'xl'];

const ARGS: Partial<BrandMarkArgs> = { app: 'rotp', size: 'xl', variant: 'mark', tile: false };

const ARG_TYPES: StoryLiteArgTypes<BrandMarkArgs> = {
  app: { control: 'select', options: [...BRAND_APPS] },
  size: { control: 'select', options: [...SIZES] },
  variant: { control: 'select', options: ['mark', 'mascot'] },
  tile: { control: 'boolean' },
};

const meta = {
  title: 'Brand/BrandMark',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<BrandMarkArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <BrandMark app={args.app} size={args.size} variant={args.variant} tile={args.tile} />,
} satisfies StoryLiteStoryDefinition<BrandMarkArgs>;

const COLUMNS = [...SIZES, 'tile', 'mascot'] as const;

const AllVariants = {
  name: 'All variants',
  render: () => (
    <VariantGrid
      rows={axis(BRAND_APPS)}
      columns={axis(COLUMNS)}
      cell={(app, column) => (
        <BrandMark
          app={app}
          size={column === 'tile' || column === 'mascot' ? 'lg' : column}
          variant={column === 'mascot' ? 'mascot' : 'mark'}
          tile={column === 'tile'}
          title=""
        />
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<BrandMarkArgs>;

const usage = (app: BrandApp): string => {
  const { mascot } = BRAND_FAMILY[app];
  return [
    `import { BrandMark, BrandWordmark } from '@drizztdourden08/tessera/brand';`,
    `<BrandMark app="${app}" />`,
    mascot ? `<BrandMark app="${app}" variant="mascot" />` : '',
    `<BrandWordmark app="${app}" />`,
  ].filter(Boolean).join('  ');
};

const Family = {
  name: 'Family',
  render: () => (
    <Box className="brand-family">
      {BRAND_APPS.map((app) => {
        const brand = BRAND_FAMILY[app];
        return (
          <Card key={app} className="brand-family__card">
            <Flex gap="lg" align="center" wrap>
              <BrandMark app={app} size="xl" tile title="" />
              <BrandMark app={app} size="lg" title="" />
              <BrandMark app={app} size="md" title="" />
              <BrandMark app={app} size="sm" title="" />
              {brand.mascot && (
                <Flex gap="lg" align="center" className="brand-family__mascot">
                  <BrandMark app={app} variant="mascot" size="xl" title={`${brand.name} mascot`} />
                  <BrandMark app={app} variant="mascot" size="lg" title="" />
                  <BrandMark app={app} variant="mascot" size="md" title="" />
                </Flex>
              )}
            </Flex>
            <BrandWordmark app={app} size="md" />
            <Stack gap="xs">
              <Flex gap="sm" align="center" wrap>
                <Text variant="title">{brand.name}</Text>
                <Badge variant="neutral">{brand.kind}</Badge>
              </Flex>
              <Text>{brand.summary}</Text>
              <Text variant="caption">{usage(app)}</Text>
            </Stack>
          </Card>
        );
      })}
    </Box>
  ),
} satisfies StoryLiteStoryDefinition;

const Gradients = {
  name: 'Gradients',
  render: () => (
    <Box className="brand-gradients">
      {BRAND_APPS.map((app) => (
        <Card key={app} className="brand-gradients__card">
          <Box className={`brand-gradient brand-gradient--${app}`}>
            <BrandMark app={app} size="xl" title="" />
          </Box>
          <Stack gap="xs">
            <Text variant="title">{BRAND_FAMILY[app].name}</Text>
            <Text variant="caption">{`--brand-${app}-gradient`}</Text>
            <Text variant="caption">{brandGradientCss(BRAND_FAMILY[app].gradient)}</Text>
          </Stack>
        </Card>
      ))}
    </Box>
  ),
} satisfies StoryLiteStoryDefinition;

const Overview = overviewStory({
  component: 'BrandMark',
  description: 'The mark of one app or package in the family, drawn inline from path data so it stays sharp at any size. Reach for it wherever an app names itself: a title bar, an about screen, a list of projects. It comes in four sizes, can sit on its app-icon tile, and draws the app\'s mascot when asked, falling back to the mark for an app without one.',
  playground: Playground,
  variants: [AllVariants],
});

export default meta;
export { AllVariants, Family, Gradients, Overview, Playground };
