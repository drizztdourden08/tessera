/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Badge, Box, Card, Flex, Stack, Text } from '../../src/primitives';
import { BRAND_APPS, BRAND_FAMILY, BrandMark, BrandWordmark } from '../../src/brand';
import type { BrandApp } from '../../src/brand';
import { overviewStory } from '../_template/overview-story';
import './Brand.stories.css';

const meta = {
  title: 'Brand/Brand',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

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

const Overview = overviewStory({
  component: 'Brand',
  description: 'Every app and package in the family on one page: its mark at each size and on its app-icon tile, its mascot where it has one, its wordmark, what it is and how to import it. The Logo, WordMark and Combined pages show each part on its own, and the Gradients page under Colours shows each brand gradient.',
  variants: [Family],
});

export default meta;
export { Family, Overview };
