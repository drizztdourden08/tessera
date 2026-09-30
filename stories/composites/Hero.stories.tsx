/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Hero } from '../../src/composites';
import type { HeroFactRow } from '../../src/composites';
import { overviewStory } from '../_template/overview-story';
import { brandLogoUri } from './_samples/brand-logo';
import { HeroLastSave, HeroPlay, HeroProgress, HeroScene, HeroTools } from './_samples/HeroSamples';
import './Hero.stories.css';

type HeroArgs = {
  eyebrow: string;
  title: string;
  withBackdrop: boolean;
  withArt: boolean;
  withTools: boolean;
  withFacts: boolean;
  withAside: boolean;
  withPanel: boolean;
};

const ART = { src: brandLogoUri('rotp'), alt: '', pixelated: true };

const FACTS: readonly HeroFactRow[] = [
  [
    { label: 'Game', value: 'A Link to the Past (USA).sfc', title: 'D:/roms/A Link to the Past (USA).sfc' },
    { label: 'Last played', value: '2 hours ago' },
    { label: 'Created', value: 'Sep 12' },
  ],
  [
    { label: 'Seed', value: 'K7Q2-M9XA', mono: true },
    { label: 'Server', value: 'mw.harbor.local:38281', mono: true },
    { label: 'Slot', value: 'Link' },
  ],
];

const draw = (args: HeroArgs) => (
  <Hero
    eyebrow={args.eyebrow || undefined}
    title={args.title}
    backdrop={args.withBackdrop ? <HeroScene /> : undefined}
    art={args.withArt ? ART : null}
    tools={args.withTools ? <HeroTools /> : undefined}
    actions={<HeroPlay />}
    facts={args.withFacts ? FACTS : undefined}
    aside={args.withAside ? <HeroLastSave /> : undefined}
    panel={args.withPanel ? <HeroProgress /> : undefined}
  />
);

const ARGS: Partial<HeroArgs> = {
  eyebrow: 'Mode', title: 'Randomizer', withBackdrop: true, withArt: true, withTools: true, withFacts: true, withAside: true, withPanel: true,
};

const ARG_TYPES: StoryLiteArgTypes<HeroArgs> = {
  eyebrow: { control: 'text' },
  title: { control: 'text' },
  withBackdrop: { control: 'boolean', description: 'A scene behind everything; the host picks it.' },
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

const CODE = `import { Hero } from '@drizztdourden08/tessera';

<Hero
  eyebrow="Mode"
  title="Randomizer"
  backdrop={<SceneBackdrop />}
  art={{ src: heroArt, pixelated: true }}
  tools={<><Button size="sm" variant="secondary">Folder</Button><Button size="sm" variant="secondary">Import</Button></>}
  actions={<Button variant="primary">Play</Button>}
  facts={[profileFacts, runFacts]}
  aside={<LastSaveTile save={lastSave} />}
  panel={<SaveProgress files={files} />}
/>`;

const Overview = overviewStory({
  component: 'Hero',
  description: 'The top of a home screen: a scene the host hands in as the backdrop, an art piece beside the intro, and the details floating over both. The intro holds an eyebrow, the title and the actions under it; tools sit along the top right. Facts run along the bottom on frosted glass, one row per list with a hairline between rows, a long value cut short with its full text in a tooltip. An aside tile sits right of the intro and a panel right of the facts, both on the same glass; the host fills them. A shade darkens the left and bottom edges so text reads on any backdrop.',
  playground: Playground,
  variants: [Profile, FactsOnly, TitleOnly],
  code: CODE,
});

export default meta;
export { FactsOnly, Overview, Playground, Profile, TitleOnly };
