/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { BRAND_APPS } from '../../src/brand';
import type { BrandApp } from '../../src/brand';
import { Hero } from '../../src/composites';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { brandLogoUri } from './_samples/brand-logo';
import { PROFILE_FACTS } from './_samples/data-facts';
import { HeroLastSave, HeroPlay, HeroProgress, HeroTools } from './_samples/HeroSamples';
import './Hero.stories.css';

type HeroArgs = {
  brand: BrandApp;
  eyebrow: string;
  title: string;
  withArt: boolean;
  withTools: boolean;
  withFacts: boolean;
  withAside: boolean;
  withPanel: boolean;
};

const ART = { src: brandLogoUri('rotp'), alt: '', pixelated: true };

const draw = (args: HeroArgs) => (
  <Hero
    brand={args.brand}
    eyebrow={args.eyebrow || undefined}
    title={args.title}
    art={args.withArt ? ART : null}
    tools={args.withTools ? <HeroTools /> : undefined}
    actions={<HeroPlay />}
    facts={args.withFacts ? PROFILE_FACTS : undefined}
    aside={args.withAside ? <HeroLastSave /> : undefined}
    panel={args.withPanel ? <HeroProgress /> : undefined}
  />
);

const ARGS: Partial<HeroArgs> = {
  brand: 'rotp', eyebrow: 'Mode', title: 'Randomizer', withArt: true, withTools: true, withFacts: true, withAside: true, withPanel: true,
};

const ARG_TYPES: StoryLiteArgTypes<HeroArgs> = {
  brand: { control: 'select', options: [...BRAND_APPS], description: 'The brand whose backdrop draws behind everything.' },
  eyebrow: { control: 'text' },
  title: { control: 'text' },
  withArt: { control: 'boolean', description: 'A piece of art beside the intro, drawn at whole pixels.' },
  withTools: { control: 'boolean', description: 'Buttons along the top right.' },
  withFacts: { control: 'boolean', description: 'Rows of facts on glass along the bottom.' },
  withAside: { control: 'boolean', description: 'A glass tile on the right of the intro.' },
  withPanel: { control: 'boolean', description: 'A glass panel beside the facts.' },
};

const meta = {
  title: 'Composites · Screens/Hero',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<HeroArgs>;

const story = (name: string, patch: Partial<HeroArgs>) => ({
  name,
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => draw({ ...args, ...patch }),
} satisfies StoryLiteStoryDefinition<HeroArgs>);

const Playground = story('Playground', {});
const Profile = story('Profile overview', {});
const FactsOnly = story('Facts, no art or side tiles', { withArt: false, withAside: false, withPanel: false });
const TitleOnly = story('Title and action', { withTools: false, withFacts: false, withAside: false, withPanel: false });

const Brands = {
  name: 'Brand backdrops',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Demonstrator
      rows={axis(BRAND_APPS)}
      align="stretch"
      cell={(brand) => draw({ ...args, brand, withArt: false, withAside: false, withPanel: false })}
    />
  ),
} satisfies StoryLiteStoryDefinition<HeroArgs>;

const CODE = `import { Hero } from '@drizztdourden08/tessera';

<Hero
  brand="rotp"
  eyebrow="Mode"
  title="Randomizer"
  art={{ src: heroArt, pixelated: true }}
  tools={<><Button size="sm" variant="secondary">Folder</Button><Button size="sm" variant="secondary">Import</Button></>}
  actions={<Button variant="primary">Play</Button>}
  facts={[profileFacts, runFacts]}
  aside={<LastSaveTile save={lastSave} />}
  panel={<SaveProgress files={files} />}
/>`;

const Overview = overviewStory({
  component: 'Hero',
  description: 'The top of a home screen: the backdrop of its brand (--brand-<app>-backdrop, picked by brand, tessera by default) behind everything, an art piece beside the intro, and the details floating over both. The intro holds an eyebrow, the title and the actions under it; tools sit along the top right. Facts run along the bottom in a FactsPanel on frosted glass, one row per group with a hairline between groups, a long value cut short with its full text in a tooltip. An aside tile sits right of the intro and a panel right of the facts, both on the same glass; the host fills them. A shade darkens the left and bottom edges so text reads on any backdrop. A host with its own scene, such as a screenshot, passes it as backdrop and it covers the gradient.',
  playground: Playground,
  variants: [Profile, FactsOnly, TitleOnly, Brands],
  code: CODE,
});

export default meta;
export { Brands, FactsOnly, Overview, Playground, Profile, TitleOnly };
