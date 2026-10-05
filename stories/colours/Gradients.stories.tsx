/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { BRAND_APPS, BRAND_FAMILY, BrandMark, brandGradientCss } from '../../src/brand';
import type { BrandApp } from '../../src/brand';
import { Box, Card, Stack, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import './Gradients.stories.css';

type GradientArgs = {
  brand: BrandApp;
};

const ARG_TYPES: PlaygroundArgTypes<GradientArgs> = {
  brand: { group: 'Content', control: 'select', options: [...BRAND_APPS], description: 'The brand whose gradient, backdrop and palette pairs are drawn.' },
};

const meta = {
  title: 'Core · Colours/Gradients',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<GradientArgs>;

const GradientCard = ({ app }: { app: BrandApp }) => (
  <Card className="brand-gradients__card">
    <Box className={`brand-gradient brand-gradient--${app}`}>
      <BrandMark app={app} size="xl" title="" />
    </Box>
    <Stack gap="xs">
      <Text variant="title">{BRAND_FAMILY[app].name}</Text>
      <Text variant="caption">{`--brand-${app}-gradient`}</Text>
      <Text variant="caption">{brandGradientCss(BRAND_FAMILY[app].gradient)}</Text>
    </Stack>
  </Card>
);

const BackdropCard = ({ app }: { app: BrandApp }) => {
  const { glows, stops } = BRAND_FAMILY[app].backdrop;
  return (
    <Card className="brand-gradients__card">
      <Box className={`brand-backdrop brand-backdrop--${app}`} />
      <Stack gap="xs">
        <Text variant="title">{BRAND_FAMILY[app].name}</Text>
        <Text variant="caption">{`--brand-${app}-backdrop`}</Text>
        <Text variant="caption">{`${glows.length} glows over ${stops.join(' to ')}`}</Text>
      </Stack>
    </Card>
  );
};

const PaletteGradientCard = ({ app }: { app: BrandApp }) => (
  <Card className="brand-gradients__card">
    <Box className="palette-gradient" data-palette={app === 'tessera' ? undefined : app}>
      <Box className="palette-gradient__ground palette-gradient__ground--light">
        <BrandMark app={app} size="xl" ground="light" title="" />
      </Box>
      <Box className="palette-gradient__ground palette-gradient__ground--dark">
        <BrandMark app={app} size="xl" ground="dark" title="" />
      </Box>
    </Box>
    <Stack gap="xs">
      <Text variant="title">{`${BRAND_FAMILY[app].name} palette`}</Text>
      <Text variant="caption">Light: --c-gradient-light-from, -to</Text>
      <Text variant="caption">Dark: --c-gradient-dark-from, -to</Text>
    </Stack>
  </Card>
);

const Playground = {
  name: 'Playground',
  args: { brand: 'rotp' },
  argTypes: ARG_TYPES,
  render: (args) => (
    <Box className="brand-gradients brand-gradients--pair">
      <GradientCard app={args.brand} />
      <BackdropCard app={args.brand} />
      <PaletteGradientCard app={args.brand} />
    </Box>
  ),
} satisfies PlaygroundStory<GradientArgs>;

const Gradients = {
  name: 'Gradients',
  render: () => (
    <Box className="brand-gradients">
      {BRAND_APPS.map((app) => <GradientCard key={app} app={app} />)}
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<GradientArgs>;

const PalettePairs = {
  name: 'Palette pairs',
  render: () => (
    <Box className="brand-gradients">
      {BRAND_APPS.map((app) => <PaletteGradientCard key={app} app={app} />)}
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<GradientArgs>;

const Backdrops = {
  name: 'Backdrops',
  render: () => (
    <Box className="brand-gradients brand-gradients--wide">
      {BRAND_APPS.map((app) => <BackdropCard key={app} app={app} />)}
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<GradientArgs>;

const Overview = overviewStory({
  component: 'Gradients',
  description: 'Each brand\'s gradient behind its mark and its backdrop of soft glows behind a home screen, and each palette\'s light and dark gradient pairs.',
  points: [
    '`--brand-<app>-gradient` holds the gradient behind the mark; `brandGradientCss()` builds it from brand data.',
    '`--brand-<app>-backdrop` holds the backdrop, and `backdropGradientCss()` builds it from the brand data.',
    'Both belong to the brand and stay the same in every palette; a [Hero] picks its backdrop with `brand`.',
    'Each palette sets a light pair, `--c-gradient-light-from` and `-to`, and a dark pair, `--c-gradient-dark-*`.',
    'The [Splash] paints the dark pair; the light pair is for a bright ground of the app\'s own.',
    'Every gradient here is plain, with no white glow in its centre.',
  ],
  playground: Playground,
  variants: [Gradients, PalettePairs, Backdrops],
  code: `import { BRAND_FAMILY, Hero, backdropGradientCss, brandGradientCss } from '@drizztdourden08/tessera';

<Box style={{ background: 'var(--brand-rotp-gradient)' }} />
<Box style={{ background: brandGradientCss(BRAND_FAMILY.rotp.gradient) }} />
<Box style={{ background: 'var(--brand-rotp-backdrop)' }} />
<Box style={{ background: backdropGradientCss(BRAND_FAMILY.rotp.backdrop) }} />
<Box style={{ background: 'linear-gradient(160deg, var(--c-gradient-light-from), var(--c-gradient-light-to))' }} />
<Hero brand="rotp" title="Randomizer" />`,
});

export default meta;
export { Backdrops, Gradients, Overview, PalettePairs, Playground };
