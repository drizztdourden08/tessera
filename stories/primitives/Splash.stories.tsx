/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { BrandMark } from '../../src/brand';
import { Splash } from '../../src/primitives';
import type { SplashBar } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { LiveSplash } from './_samples/LiveSplash';
import { SPLASH_MARK, SPLASH_SAMPLES, SPLASH_STATES, SPLASH_TITLE, SPLASH_VERSION } from './_samples/splash-states.constants';
import type { SplashState } from './_samples/splash-states.type';
import { SplashMarks } from './_samples/SplashMarks';
import { SplashPair } from './_samples/SplashPair';

type SplashArgs = {
  state: SplashState;
  progress: number;
  indeterminate: boolean;
  bar: SplashBar;
  mark: 'image' | 'BrandMark' | 'none';
  version: string;
};

const MARKS = { image: SPLASH_MARK, BrandMark: <BrandMark app="archipelia" size="lg" />, none: undefined } as const;

const noop = () => undefined;

const ARGS: Partial<SplashArgs> = { state: 'starting', progress: 0.42, indeterminate: false, bar: 'edge', mark: 'image', version: SPLASH_VERSION };

const ARG_TYPES: PlaygroundArgTypes<SplashArgs> = {
  state: { group: 'Content', control: 'select', options: SPLASH_STATES, description: 'The status, detail and actions of one of the sample states.' },
  mark: { group: 'Content', control: 'select', options: ['image', 'BrandMark', 'none'], description: 'An image URL, a node such as BrandMark, or no mark.' },
  version: { group: 'Content', control: 'text' },
  progress: { group: 'Appearance', control: 'range', min: 0, max: 1, step: 0.01, description: 'How full the bar is, from 0 to 1.' },
  indeterminate: { group: 'Appearance', control: 'boolean', description: 'A sweep for work with no known end, in place of the fill.' },
  bar: { group: 'Appearance', control: 'select', options: ['edge', 'inline'], description: 'Along the bottom of the window, or under the status in the column.' },
};

const meta = {
  title: 'Primitives · Feedback/Splash',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<SplashArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => {
    const sample = SPLASH_SAMPLES[args.state];
    return (
      <LiveSplash label="Splash playground">
        <Splash
          title={SPLASH_TITLE}
          mark={MARKS[args.mark]}
          status={sample.status}
          detail={sample.detail}
          failed={sample.failed}
          progress={args.indeterminate ? 'indeterminate' : args.progress}
          bar={args.bar}
          actions={sample.actions.map((action) => ({ ...action, onSelect: noop }))}
          version={args.version || undefined}
        />
      </LiveSplash>
    );
  },
} satisfies PlaygroundStory<SplashArgs>;

const Starting = {
  name: 'Starting, beside the static page',
  render: () => <SplashPair state="starting" />,
} satisfies StoryLiteStoryDefinition<SplashArgs>;

const Failed = {
  name: 'Failed, beside the static page',
  render: () => <SplashPair state="failed" />,
} satisfies StoryLiteStoryDefinition<SplashArgs>;

const Update = {
  name: 'Update, beside the static page',
  render: () => <SplashPair state="update" />,
} satisfies StoryLiteStoryDefinition<SplashArgs>;

const Reconnecting = {
  name: 'Reconnecting, beside the static page',
  render: () => <SplashPair state="reconnecting" />,
} satisfies StoryLiteStoryDefinition<SplashArgs>;

const Marks = {
  name: 'Each brand mark, on its gradient',
  render: () => <SplashMarks />,
} satisfies StoryLiteStoryDefinition<SplashArgs>;

const CODE = `import { Splash } from '@drizztdourden08/tessera';
import { BrandMark } from '@drizztdourden08/tessera/brand';

<Splash
  title="Archipelia"
  mark={<BrandMark app="archipelia" size="lg" />}
  status={failure ? \`\${failure.label} failed\` : progress.label}
  detail={failure?.message}
  failed={failure !== null}
  progress={progress.fraction}
  actions={failure ? [
    { label: 'Retry', primary: true, onSelect: retry },
    { label: 'Report a bug', onSelect: report },
  ] : []}
  version="v0.4.2"
/>`;

const Overview = overviewStory({
  component: 'Splash',
  description: 'The splash of the static page as a React part, for a start, an update or a reconnect once the app has loaded.',
  points: [
    'It draws the `ts-` classes of `splash.css`, so it matches the [Static splash](#/story/setup-staticsplash--overview) page.',
    'It sits on the dark gradient of the palette; a test holds its text, borders and bar at WCAG AA.',
    '`mark` takes an image URL or a node; a [Logo] or BrandMark in it takes its dark ground colours by itself.',
    '`progress` fills the bar from 0 to 1, or sweeps with `indeterminate`; `bar` puts it on the edge or inline.',
    '`status` is one line, `detail` the text under it; `failed` turns them red and focuses the primary action.',
    'It covers the window; set `inert` on a mounted app behind it.',
  ],
  instead: '[ProgressBar] or [Spinner] for work inside a page the user can still use.',
  playground: Playground,
  variants: [Starting, Failed, Update, Reconnecting, Marks],
  code: CODE,
});

export default meta;
export { Failed, Marks, Overview, Playground, Reconnecting, Starting, Update };
