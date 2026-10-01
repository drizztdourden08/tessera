/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { BACKDROP_GRADIENT, BRAND_APPS, BRAND_FAMILY, BrandMark, backdropGradientCss, brandGradientCss } from '../../src/brand';
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
      <Card className="brand-gradients__card">
        <Box className="brand-gradient brand-gradient--backdrop" />
        <Stack gap="xs">
          <Text variant="title">Backdrop</Text>
          <Text variant="caption">--brand-backdrop-gradient</Text>
          <Text variant="caption">{backdropGradientCss(BACKDROP_GRADIENT)}</Text>
        </Stack>
      </Card>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition;

const Overview = overviewStory({
  component: 'Gradients',
  description: 'Each brand has one gradient, drawn behind its mark on a splash window or a hero panel, and chosen so its own mark reads on it. The token --brand-<app>-gradient holds it for CSS, and brandGradientCss() builds the same linear-gradient() from the brand data. It belongs to the brand, so it stays the same whichever look is picked in the toolbar. The backdrop is the one gradient every app shares, behind a Hero and any other home screen scene: a glow of the primary colour at the top right and of the secondary at the bottom left, over the surface fading to the background. It is built from the colour roles, so each app\'s palette paints its own version; pick a look in the toolbar to see it change. --brand-backdrop-gradient holds it, and backdropGradientCss(BACKDROP_GRADIENT) builds it from the data.',
  variants: [Gradients],
  code: `import { BRAND_FAMILY, brandGradientCss } from '@drizztdourden08/tessera';

<Box style={{ background: 'var(--brand-rotp-gradient)' }} />
<Box style={{ background: brandGradientCss(BRAND_FAMILY.rotp.gradient) }} />
<Box style={{ background: 'var(--brand-backdrop-gradient)' }} />`,
});

export default meta;
export { Gradients, Overview };
