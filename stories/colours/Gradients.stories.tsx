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
  brand: { group: 'Content', control: 'select', options: [...BRAND_APPS], description: 'The brand whose gradient and backdrop are drawn.' },
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

const Playground = {
  name: 'Playground',
  args: { brand: 'rotp' },
  argTypes: ARG_TYPES,
  render: (args) => (
    <Box className="brand-gradients brand-gradients--pair">
      <GradientCard app={args.brand} />
      <BackdropCard app={args.brand} />
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
  description: 'Each brand has two gradients of its own. The gradient is drawn behind its mark on a splash window, chosen so the mark reads on it: --brand-<app>-gradient holds it, and brandGradientCss() builds the same linear-gradient() from the brand data. The backdrop is the glow behind a Hero and any other home screen scene: several soft glows of the brand colours at different sizes and places, each fading out on an eased curve, over a dark ground tinted with the brand. --brand-<app>-backdrop holds it, and backdropGradientCss() builds it from BRAND_FAMILY[app].backdrop. Both belong to the brand, so they stay the same whichever look is picked in the toolbar; a Hero picks its backdrop with its brand prop.',
  playground: Playground,
  variants: [Gradients, Backdrops],
  code: `import { BRAND_FAMILY, Hero, backdropGradientCss, brandGradientCss } from '@drizztdourden08/tessera';

<Box style={{ background: 'var(--brand-rotp-gradient)' }} />
<Box style={{ background: brandGradientCss(BRAND_FAMILY.rotp.gradient) }} />
<Box style={{ background: 'var(--brand-rotp-backdrop)' }} />
<Box style={{ background: backdropGradientCss(BRAND_FAMILY.rotp.backdrop) }} />
<Hero brand="rotp" title="Randomizer" />`,
});

export default meta;
export { Backdrops, Gradients, Overview, Playground };
