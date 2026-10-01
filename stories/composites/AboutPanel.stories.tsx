/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { AboutPanel } from '../../src/composites';
import type { AboutPanelRow } from '../../src/composites';
import type { BrandApp } from '../../src/brand';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { brandLogoUri } from './_samples/brand-logo';

type AboutArgs = {
  title: string;
  brand: BrandApp | 'none';
  heading: 'wordmark' | 'title';
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

const copyTextOf = (args: AboutArgs): string | null | undefined => {
  if (!args.withCopy) return undefined;
  return args.collecting ? null : `${args.title} ${args.version}`;
};

const draw = (args: AboutArgs) => (
  <AboutPanel
    title={args.title}
    brand={args.brand === 'none' ? undefined : args.brand}
    heading={args.heading}
    logo={args.withLogo ? LOGO : undefined}
    rows={[{ label: 'Version', value: args.version }, ...ROWS]}
    copyText={copyTextOf(args)}
    legal={args.withLegal ? LEGAL : undefined}
  />
);

const ARGS: Partial<AboutArgs> = {
  title: 'Brock Demo', brand: 'brock', heading: 'wordmark', version: '1.4.0', withLogo: true, withCopy: true, collecting: false, withLegal: true,
};

const ARG_TYPES: StoryLiteArgTypes<AboutArgs> = {
  title: { control: 'text', description: 'The app name: the heading text, or the accessible name of the wordmark.' },
  brand: {
    control: 'select',
    options: ['none', 'tessera', 'brock', 'archipelia', 'rotp'],
    description: 'Draws the icon and wordmark of this Tessera brand in place of the logo image and the title text.',
  },
  heading: {
    control: 'select',
    options: ['wordmark', 'title'],
    description: 'With a brand: draw its wordmark, or keep the mark and show the title text, for an app named differently from its brand.',
  },
  version: { control: 'text' },
  withLogo: { control: 'boolean', description: 'An image logo, drawn only when brand is none.' },
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
  name: 'Logo, wordmark, facts, copy and legal',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => draw(args),
} satisfies StoryLiteStoryDefinition<AboutArgs>;

const PlainTitle = {
  name: 'Image logo and title text, for an app that is not a Tessera brand',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => draw({ ...args, brand: 'none' }),
} satisfies StoryLiteStoryDefinition<AboutArgs>;

const FactsOnly = {
  name: 'Facts only',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => draw({ ...args, brand: 'none', withLogo: false, withCopy: false, withLegal: false }),
} satisfies StoryLiteStoryDefinition<AboutArgs>;

const renderState = (props: StateProps) => draw({ ...(ARGS as AboutArgs), withLegal: false, collecting: props.collecting === true });

const CODE = `import { AboutPanel } from '@drizztdourden08/tessera';

<AboutPanel
  title="Brock Demo"
  brand="brock"
  rows={[
    { label: 'Version', value: '1.4.0' },
    { label: 'Runtime', value: 'Electron 38.1.0' },
  ]}
  copyText={debugText}
  legal="An open-source project. Names and marks belong to their owners."
/>`;

const Overview = overviewStory({
  component: 'AboutPanel',
  description: 'The body of an About screen: the app logo and name, a column of facts such as the version, runtime and platform as StatRows on a sunken fill, a button that copies the debug text, and a line of legal text. brand draws the app icon and the wordmark of that Tessera brand, with title as the accessible name of the wordmark. An app that is not a Tessera brand leaves brand out: logo then shows an image and title shows as text. copyText set to null shows the button waiting while the text is gathered, and left out hides it. The button writes through the app clipboard writer that TesseraProvider names, the browser clipboard by default.',
  playground: Playground,
  variants: [Full, PlainTitle, FactsOnly],
  states: {
    render: renderState,
    list: [STATE.idle, { name: 'Collecting the debug text', props: { collecting: true } }],
  },
  code: CODE,
});

export default meta;
export { FactsOnly, Full, Overview, PlainTitle, Playground };
