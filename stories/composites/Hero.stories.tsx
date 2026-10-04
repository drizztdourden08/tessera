/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { BRAND_APPS } from '../../src/brand';
import type { BrandApp } from '../../src/brand';
import { Hero } from '../../src/composites';
import type { HeroShade } from '../../src/composites';
import { Box } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { PROFILE_FACTS } from './_samples/data-facts';
import { HERO_ART_KEYS, HERO_ARTS, HERO_BACKDROP_KEYS, HERO_BACKDROPS } from './_samples/hero-backdrops';
import type { HeroArtKey, HeroBackdropKey } from './_samples/hero-backdrops';
import { HeroLastSave, HeroPlay, HeroProgress, HeroTools } from './_samples/HeroSamples';
import './Hero.stories.css';

type HeroArgs = {
  brand: BrandApp;
  backdrop: HeroBackdropKey;
  shade: HeroShade;
  art: HeroArtKey;
  eyebrow: string;
  title: string;
  withTools: boolean;
  withFacts: boolean;
  withAside: boolean;
  withPanel: boolean;
};

const SHADES = ['fade', 'scrim', 'none'] as const satisfies readonly HeroShade[];

const draw = (args: HeroArgs) => (
  <Hero
    brand={args.brand}
    backdrop={HERO_BACKDROPS[args.backdrop]}
    shade={args.shade}
    eyebrow={args.eyebrow || undefined}
    title={args.title}
    art={HERO_ARTS[args.art]}
    tools={args.withTools ? <HeroTools /> : undefined}
    actions={<HeroPlay />}
    facts={args.withFacts ? PROFILE_FACTS : undefined}
    aside={args.withAside ? <HeroLastSave /> : undefined}
    panel={args.withPanel ? <HeroProgress /> : undefined}
  />
);

const ARGS: Partial<HeroArgs> = {
  brand: 'rotp', backdrop: 'brand', shade: 'fade', art: 'image', eyebrow: 'Mode', title: 'Randomizer',
  withTools: true, withFacts: true, withAside: true, withPanel: true,
};

const ARG_TYPES: PlaygroundArgTypes<HeroArgs> = {
  eyebrow: { group: 'Content', control: 'text' },
  title: { group: 'Content', control: 'text' },
  art: { group: 'Content', control: 'select', options: HERO_ART_KEYS, description: 'Art beside the intro: an image by URL, any node, or none.' },
  withTools: { group: 'Content', control: 'boolean', description: 'Buttons along the top right.' },
  withFacts: { group: 'Content', control: 'boolean', description: 'Rows of facts on glass along the bottom.' },
  withAside: { group: 'Content', control: 'boolean', description: 'A glass tile on the right of the intro.' },
  withPanel: { group: 'Content', control: 'boolean', description: 'A glass panel beside the facts.' },
  backdrop: { group: 'Appearance', control: 'select', options: HERO_BACKDROP_KEYS, description: 'What fills the hero behind everything.' },
  shade: { group: 'Appearance', control: 'select', options: SHADES, description: 'The dark fade that keeps the text readable over the backdrop.' },
  brand: { group: 'Appearance', control: 'select', options: [...BRAND_APPS], description: 'The brand whose gradient draws when there is no backdrop.' },
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
const SceneArt = story('A live scene and node art', { backdrop: 'scene', art: 'node' });
const FactsOnly = story('Facts, no art or side tiles', { art: 'none', withAside: false, withPanel: false });
const TitleOnly = story('Title and action', { withTools: false, withFacts: false, withAside: false, withPanel: false });

const Narrow = {
  name: 'In a narrow column',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <Box className="hero-story__narrow">{draw({ ...args, backdrop: 'scene' })}</Box>,
} satisfies PlaygroundStory<HeroArgs>;

const lean = (args: HeroArgs): HeroArgs => ({ ...args, withAside: false, withPanel: false });

const Backdrops = {
  name: 'Backdrops',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Demonstrator
      rows={axis(HERO_BACKDROP_KEYS)}
      align="stretch"
      className="hero-story__rows"
      cell={(backdrop) => draw({ ...lean(args), backdrop })}
    />
  ),
} satisfies PlaygroundStory<HeroArgs>;

const Shades = {
  name: 'Shades over a busy backdrop',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Demonstrator
      rows={axis(SHADES)}
      align="stretch"
      className="hero-story__rows"
      cell={(shade) => draw({ ...lean(args), backdrop: 'svg', shade })}
    />
  ),
} satisfies PlaygroundStory<HeroArgs>;

const Brands = {
  name: 'Brand backdrops',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Demonstrator
      rows={axis(BRAND_APPS)}
      align="stretch"
      className="hero-story__rows"
      cell={(brand) => draw({ ...lean(args), brand, backdrop: 'brand', art: 'none' })}
    />
  ),
} satisfies PlaygroundStory<HeroArgs>;

const CODE = `import { Hero } from '@drizztdourden08/tessera';

<Hero
  brand="rotp"
  backdrop={{ kind: 'node', node: <SceneBackdrop /> }}
  shade="fade"
  eyebrow="Mode"
  title="Randomizer"
  art={{ kind: 'image', src: heroArt, pixelated: true }}
  tools={<><Button size="sm" variant="secondary">Folder</Button><Button size="sm" variant="secondary">Import</Button></>}
  actions={<Button variant="primary">Play</Button>}
  facts={[profileFacts, runFacts]}
  aside={<LastSaveTile save={lastSave} />}
  panel={<SaveProgress files={files} />}
/>

// Other backdrops
backdrop={{ kind: 'image', src: nightPng, fit: 'cover', position: 'center bottom', pixelated: true }}
backdrop={{ kind: 'image', src: patternSvg, fit: 'tile', tileSize: '48px' }}
backdrop={{ kind: 'color', color: '--c-tag-violet-dim' }}
backdrop={null}`;

const Overview = overviewStory({
  component: 'Hero',
  description: 'The top of a home screen: a backdrop and art, the title and its actions, with details on glass over them.',
  points: [
    '`backdrop` takes a live scene `node`, an `image` URL that covers, contains or tiles, or a `color`.',
    'Leave `backdrop` out for the brand gradient, or pass `null` for a plain hero.',
    '`art` is an `image` URL or any `node`, in its own column beside the intro, never cropped.',
    '`shade` keeps the text readable: `fade` by default, `scrim` for a busy backdrop, or `none`.',
    '`tools` sit top right, `facts` along the bottom in a [FactsPanel], `aside` and `panel` on the right.',
    'Under 720 px wide it stacks: the intro over the art, then the aside, facts and panel at full width.',
  ],
  playground: Playground,
  variants: [Profile, Backdrops, SceneArt, Shades, Narrow, FactsOnly, TitleOnly, Brands],
  code: CODE,
});

export default meta;
export { Backdrops, Brands, FactsOnly, Narrow, Overview, Playground, Profile, SceneArt, Shades, TitleOnly };
