/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { BRAND_APPS } from '../../src/brand';
import type { BrandApp } from '../../src/brand';
import { Hero } from '../../src/composites';
import { Box } from '../../src/primitives';
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

const ARG_TYPES: PlaygroundArgTypes<HeroArgs> = {
  eyebrow: { group: 'Content', control: 'text' },
  title: { group: 'Content', control: 'text' },
  withArt: { group: 'Content', control: 'boolean', description: 'A piece of art beside the intro, drawn at whole pixels.' },
  withTools: { group: 'Content', control: 'boolean', description: 'Buttons along the top right.' },
  withFacts: { group: 'Content', control: 'boolean', description: 'Rows of facts on glass along the bottom.' },
  withAside: { group: 'Content', control: 'boolean', description: 'A glass tile on the right of the intro.' },
  withPanel: { group: 'Content', control: 'boolean', description: 'A glass panel beside the facts.' },
  brand: { group: 'Appearance', control: 'select', options: [...BRAND_APPS], description: 'The brand whose backdrop draws behind everything.' },
};

const meta = {
  title: 'Composites · Content/Hero',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<HeroArgs>;

const story = (name: string, patch: Partial<HeroArgs>) => ({
  name,
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => draw({ ...args, ...patch }),
} satisfies PlaygroundStory<HeroArgs>);

const Playground = story('Playground', {});
const Profile = story('Profile overview', {});
const FactsOnly = story('Facts, no art or side tiles', { withArt: false, withAside: false, withPanel: false });
const TitleOnly = story('Title and action', { withTools: false, withFacts: false, withAside: false, withPanel: false });

const Narrow = {
  name: 'In a narrow column',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <Box className="hero-story__narrow">{draw(args)}</Box>,
} satisfies PlaygroundStory<HeroArgs>;

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
} satisfies PlaygroundStory<HeroArgs>;

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
  description: 'The top of a home screen: a brand backdrop and art, the title and its actions, with details on glass over them.',
  points: [
    '`tools` sit top right, `facts` along the bottom in a [FactsPanel], `aside` and `panel` on the right.',
    'The art has its own column beside the intro: the aside never covers it, and it shrinks to fit, never cropped.',
    'Its height is fixed for a given room, never by content; a short window shrinks it to `--hero-h-min`.',
    'Under 720 px wide it stacks: the intro over the art, then the aside, facts and panel at full width.',
    'A host with its own scene, such as a screenshot, passes it as `backdrop`.',
  ],
  playground: Playground,
  variants: [Profile, Narrow, FactsOnly, TitleOnly, Brands],
  code: CODE,
});

export default meta;
export { Brands, FactsOnly, Narrow, Overview, Playground, Profile, TitleOnly };
