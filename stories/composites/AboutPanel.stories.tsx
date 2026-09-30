/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { AboutPanel } from '../../src/composites';
import type { AboutPanelRow } from '../../src/composites';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { brandLogoUri } from './_samples/brand-logo';

type AboutArgs = {
  title: string;
  version: string;
  withLogo: boolean;
  withCopy: boolean;
  collecting: boolean;
  withLegal: boolean;
};

const LOGO = brandLogoUri('brock');

const ROWS: readonly AboutPanelRow[] = [
  { label: 'Runtime', value: 'Electron 38.1.0' },
  { label: 'Engine', value: 'Chromium 140.0.7339.80' },
  { label: 'Platform', value: 'windows' },
];

const LEGAL = 'An open-source project. Names and marks belong to their owners.';

const copyInto = (): boolean => true;

const copyTextOf = (args: AboutArgs): string | null | undefined => {
  if (!args.withCopy) return undefined;
  return args.collecting ? null : `${args.title} ${args.version}`;
};

const draw = (args: AboutArgs) => (
  <AboutPanel
    title={args.title}
    logo={args.withLogo ? LOGO : undefined}
    rows={[{ label: 'Version', value: args.version }, ...ROWS]}
    copyText={copyTextOf(args)}
    onCopy={copyInto}
    legal={args.withLegal ? LEGAL : undefined}
  />
);

const ARGS: Partial<AboutArgs> = {
  title: 'Brock Demo', version: '1.4.0', withLogo: true, withCopy: true, collecting: false, withLegal: true,
};

const ARG_TYPES: StoryLiteArgTypes<AboutArgs> = {
  title: { control: 'text' },
  version: { control: 'text' },
  withLogo: { control: 'boolean' },
  withCopy: { control: 'boolean' },
  collecting: { control: 'boolean', description: 'The debug text is still being gathered, so the button waits.' },
  withLegal: { control: 'boolean' },
};

const meta = {
  title: 'Composites · Content/AboutPanel',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<AboutArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => draw(args),
} satisfies StoryLiteStoryDefinition<AboutArgs>;

const Full = {
  name: 'Logo, facts, copy and legal',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => draw(args),
} satisfies StoryLiteStoryDefinition<AboutArgs>;

const FactsOnly = {
  name: 'Facts only',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => draw({ ...args, withLogo: false, withCopy: false, withLegal: false }),
} satisfies StoryLiteStoryDefinition<AboutArgs>;

const renderState = (props: StateProps) => draw({ ...(ARGS as AboutArgs), withLegal: false, collecting: props.collecting === true });

const CODE = `import { AboutPanel } from '@drizztdourden08/tessera';

<AboutPanel
  title="Brock Demo"
  logo={logoSrc}
  rows={[
    { label: 'Version', value: '1.4.0' },
    { label: 'Runtime', value: 'Electron 38.1.0' },
  ]}
  copyText={debugText}
  onCopy={writeClipboard}
  legal="An open-source project. Names and marks belong to their owners."
/>`;

const Overview = overviewStory({
  component: 'AboutPanel',
  description: 'The body of an About screen: the app logo and name, a column of facts such as the version, runtime and platform as StatRows on a sunken fill, a button that copies the debug text, and a line of legal text. copyText set to null shows the button waiting while the text is gathered, and left out hides it. onCopy replaces the browser clipboard, for a desktop host that writes it itself.',
  playground: Playground,
  variants: [Full, FactsOnly],
  states: {
    render: renderState,
    list: [STATE.idle, { name: 'Collecting the debug text', props: { collecting: true } }],
  },
  code: CODE,
});

export default meta;
export { FactsOnly, Full, Overview, Playground };
