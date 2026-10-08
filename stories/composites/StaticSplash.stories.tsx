/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Flex } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { FAILED, PARTS, STARTING } from './_samples/splash-pages.constants';
import { SplashFrame } from './_samples/SplashFrame';

type SplashArgs = {
  page: 'starting' | 'failed' | 'parts';
  palette: 'tessera' | 'archipelia' | 'brock' | 'rotp';
};

const PAGES = { starting: STARTING, failed: FAILED, parts: PARTS } as const;

const ARGS: Partial<SplashArgs> = { page: 'failed', palette: 'archipelia' };

const ARG_TYPES: PlaygroundArgTypes<SplashArgs> = {
  page: { group: 'Content', control: 'select', options: ['starting', 'failed', 'parts'], description: 'The page drawn in the frame.' },
  palette: { group: 'Appearance', control: 'select', options: ['tessera', 'archipelia', 'brock', 'rotp'], description: 'The data-palette on the root of the page.' },
};

const meta = {
  title: 'Composites · Feedback/Static splash',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<SplashArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <SplashFrame body={PAGES[args.page]} palette={args.palette === 'tessera' ? undefined : args.palette} label="Static splash page" />
  ),
} satisfies PlaygroundStory<SplashArgs>;

const Starting = {
  name: 'Starting',
  render: () => <SplashFrame body={STARTING} palette="archipelia" label="Splash page while the app starts" />,
} satisfies StoryLiteStoryDefinition<SplashArgs>;

const Failed = {
  name: 'Failed',
  render: () => <SplashFrame body={FAILED} palette="archipelia" label="Splash page after a failed start" />,
} satisfies StoryLiteStoryDefinition<SplashArgs>;

const Parts = {
  name: 'Every class, in each palette',
  render: () => (
    <Flex direction="column" gap="md">
      <SplashFrame body={PARTS} label="Splash classes in the Tessera palette" />
      <SplashFrame body={PARTS} palette="archipelia" label="Splash classes in the Archipelia palette" />
      <SplashFrame body={PARTS} palette="brock" label="Splash classes in the Brock palette" />
      <SplashFrame body={PARTS} palette="rotp" label="Splash classes in the RotP palette" />
    </Flex>
  ),
} satisfies StoryLiteStoryDefinition<SplashArgs>;

const CODE = `<link rel="stylesheet" href="node_modules/@drizztdourden08/tessera/splash-tokens.css" />
<link rel="stylesheet" href="node_modules/@drizztdourden08/tessera/splash.css" />

<body class="ts-splash">
  <main class="ts-stage">
    <img class="ts-mark" src="node_modules/@drizztdourden08/tessera/brand/dark-ground/archipelia.svg" alt="" />
    <h1 class="ts-title">Archipelia</h1>
    <p class="ts-status" aria-live="polite">Loading the engine</p>
    <div class="ts-actions" hidden>
      <button class="ts-button ts-button--primary" type="button">Retry</button>
      <button class="ts-button" type="button">Quit</button>
    </div>
  </main>
  <span class="ts-version">0.4.2</span>
  <div class="ts-progress ts-progress--edge" style="--value: 0.62" role="progressbar"></div>
</body>`;

const Overview = overviewStory({
  component: 'Static splash',
  description: 'Plain CSS classes for a splash page in static HTML that shows before the app bundle loads, in the look of the app.',
  points: [
    'Load `splash-tokens.css`, then `splash.css`; no React and no bundle, so the page draws at once.',
    '`ts-splash` paints the dark gradient behind a `ts-stage`; take its `ts-mark` image from `brand/dark-ground/`.',
    'A page may set `--look-dark-from`, `--look-dark-to` and `--look-angle`, with stops that keep text at AA.',
    '`ts-button` is the secondary [Button] look, `ts-button--primary` the primary one.',
    '`ts-progress` fills to `--value`, 0 to 1, or sweeps with `ts-progress--indeterminate`; `--edge` runs at the bottom.',
    '`ts-status--danger` and `ts-progress--danger` mark a failure, `ts-detail` its text, `ts-error` the raw error.',
  ],
  instead: '[Splash] draws the same page from React once the bundle has loaded, to show it again or take over.',
  playground: Playground,
  variants: [Starting, Failed, Parts],
  code: CODE,
});

export default meta;
export { Failed, Overview, Parts, Playground, Starting };
