/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { BRAND_APPS, BRAND_FAMILY, BrandMark, brandGradientCss } from '../../src/brand';
import { Box, Card, Stack, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import './Gradients.stories.css';

const meta = {
  title: 'Colours/Gradients',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

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
  component: 'Gradients',
  description: 'Each brand has one gradient, drawn behind its mark on a splash window or a hero panel, and chosen so its own mark reads on it. The token --brand-<app>-gradient holds it for CSS, and brandGradientCss() builds the same linear-gradient() from the brand data. It belongs to the brand, so it stays the same whichever look is picked in the toolbar.',
  variants: [Gradients],
  code: `import { BRAND_FAMILY, brandGradientCss } from '@drizztdourden08/tessera';

<Box style={{ background: 'var(--brand-rotp-gradient)' }} />
<Box style={{ background: brandGradientCss(BRAND_FAMILY.rotp.gradient) }} />`,
});

export default meta;
export { Gradients, Overview };
