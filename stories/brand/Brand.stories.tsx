/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Box, Card, Flex, Stack, Tag, Text } from '../../src/primitives';
import { BRAND_APPS, BRAND_FAMILY, BrandMark, BrandWordmark } from '../../src/brand';
import type { BrandApp } from '../../src/brand';
import { overviewStory } from '../_template/overview-story';
import { BrandMascotRow } from './_samples/BrandMascotRow';
import { FamilyMascots } from './_samples/FamilyMascots';
import { MascotTabbed } from './_samples/MascotTabbed';
import { RimGrid } from './_samples/RimGrid';
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
              <FamilyMascots app={app} />
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

const Mascots = {
  name: 'Mascots',
  render: () => <MascotTabbed tabs draw={(app) => <BrandMascotRow app={app} />} />,
} satisfies StoryLiteStoryDefinition;

const Rims = {
  name: 'Rims',
  render: () => <RimGrid draw={(app, rim) => <BrandMark app={app} size="xl" rim={rim} title="" />} />,
} satisfies StoryLiteStoryDefinition;

const Overview = overviewStory({
  component: 'Brand',
  description: 'Every app and package in the family on one page: its mark at each size, its app icon, its mascot and its wordmark.',
  points: [
    'Each row says what the app is, with its mascot small beside its marks and the import line for its parts.',
    'Mascots shows one mascot at a time: the tabs pick it, and the [Mascot] page shares the pick.',
    '[Logo], [WordMark], [Combined] and [Mascot] show each part on its own, with a playground.',
    'Rims shows every mark with no rim, a light rim and a dark rim, on a dark and a light ground.',
    'Each brand\'s gradient is on the [Gradients] page under Colours.',
  ],
  variants: [Family, Mascots, Rims],
});

export default meta;
export { Family, Mascots, Overview, Rims };
