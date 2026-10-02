/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Box, Card, Flex, Stack, Tag, Text } from '../../src/primitives';
import { BRAND_APPS, BRAND_FAMILY, BrandMark, BrandWordmark, Mascot } from '../../src/brand';
import type { BrandApp } from '../../src/brand';
import { overviewStory } from '../_template/overview-story';
import './Brand.stories.css';

const meta = {
  title: 'Core · Brand/Brand',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const usage = (app: BrandApp): string => {
  const { mascot } = BRAND_FAMILY[app];
  return [
    `import { BrandMark, BrandWordmark, Mascot } from '@drizztdourden08/tessera/brand';`,
    `<BrandMark app="${app}" />`,
    mascot ? `<Mascot brand="${app}" />` : '',
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
              <BrandMark app={app} size="xl" variant="app-icon" title="" />
              <BrandMark app={app} size="lg" title="" />
              <BrandMark app={app} size="md" title="" />
              <BrandMark app={app} size="sm" title="" />
              {brand.mascot && (
                <Flex gap="lg" align="center" className="brand-family__mascot">
                  <Mascot brand={app} size="xl" title={`${brand.mascot.name}, the ${brand.name} mascot`} />
                  <Mascot brand={app} size="lg" title="" />
                  <Mascot brand={app} size="md" title="" />
                </Flex>
              )}
            </Flex>
            <BrandWordmark app={app} size="md" />
            <Stack gap="xs">
              <Flex gap="sm" align="center" wrap>
                <Text variant="title">{brand.name}</Text>
                <Tag>{brand.kind}</Tag>
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
  description: 'Every app and package in the family on one page: its mark at each size and as its app icon, its mascot where it has one, its wordmark, what it is and how to import it. The Logo, WordMark, Combined and Mascot pages show each part on its own, and the Gradients page under Colours shows each brand gradient.',
  variants: [Family],
});

export default meta;
export { Family, Overview };
