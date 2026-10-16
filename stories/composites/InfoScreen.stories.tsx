/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Logo } from '../../src/brand';
import { InfoScreen } from '../../src/composites';
import { H2, Span } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { AboutBody } from './_samples/AboutBody';
import { CreditsBody } from './_samples/CreditsBody';
import { ScreenDemo } from './_samples/ScreenDemo';
import './InfoScreen.stories.css';

type InfoArgs = {
  page: 'about' | 'credits';
  withFooter: boolean;
};

const LEGAL = 'A fan project, not made or approved by the owners of the games it tracks. Names and marks belong to their owners.';

const lead = (name: string, line: string) => (
  <>
    <Logo brand="rotp" variant="app-icon" size="xl" title="" />
    <H2>{name}</H2>
    <Span tone="muted">{line}</Span>
  </>
);

const ABOUT_LEAD = lead('Relic of the Past', 'Tracks your randomizer runs, from the first seed to the last boss.');
const CREDITS_LEAD = lead('Thank you', 'Made by a small team, with help from these people and projects.');

const InfoDemo = (props: InfoArgs & { phone?: boolean }) => {
  const { page, withFooter, phone } = props;
  const [hidden, setHidden] = useState(false);
  const about = page === 'about';
  return (
    <ScreenDemo hidden={hidden} onReopen={() => setHidden(false)} note="The close button hides the screen" phone={phone}>
      <InfoScreen
        title={about ? 'About' : 'Credits'}
        hidden={hidden}
        onClose={() => setHidden(true)}
        lead={about ? ABOUT_LEAD : CREDITS_LEAD}
        footer={withFooter ? LEGAL : undefined}
      >
        {about ? <AboutBody /> : <CreditsBody />}
      </InfoScreen>
    </ScreenDemo>
  );
};

const ARGS: Partial<InfoArgs> = { page: 'about', withFooter: true };

const ARG_TYPES: PlaygroundArgTypes<InfoArgs> = {
  page: { group: 'Content', control: 'select', options: ['about', 'credits'] },
  withFooter: { group: 'Content', control: 'boolean' },
};

const meta = {
  title: 'Composites · Screens/InfoScreen',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<InfoArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <InfoDemo {...args} />,
} satisfies PlaygroundStory<InfoArgs>;

const Credits = {
  name: 'Credits',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: () => <InfoDemo page="credits" withFooter={false} />,
} satisfies PlaygroundStory<InfoArgs>;

const Narrow = {
  name: 'In a narrow box',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <InfoDemo {...args} phone />,
} satisfies PlaygroundStory<InfoArgs>;

const CODE = `import { FactsPanel, H2, InfoScreen, Logo } from '@drizztdourden08/tessera';

<InfoScreen
  title="About"
  onClose={close}
  lead={<><Logo brand="rotp" variant="app-icon" size="xl" title="" /><H2>Relic of the Past</H2></>}
  footer={LEGAL}
>
  <FactsPanel label="This build" groups={[[{ label: 'Version', value: '0.9.2', mono: true }]]} />
</InfoScreen>`;

const Overview = overviewStory({
  component: 'InfoScreen',
  description: 'A screen the user reads, such as About, credits, a licence or a welcome: a small dialog sized to its content.',
  points: [
    'The card fits its content, centred, at most 512 px wide; it scrolls only when the window is too short for it.',
    'No page header: the window title bar holds the title and the close button, and the column scrolls under it.',
    '`lead` sits centred at the top, for a logo or the app name; `footer` closes the column with legal lines.',
    'The children are the sections. An About screen puts the build facts in a [FactsPanel].',
    'Credits list one card per line; a long list scrolls inside the dialog.',
    'Under 560 px wide the card fills the box and the column takes its width; only the column scrolls.',
  ],
  instead: '[WorkspaceScreen] for settings and pages with a side list, or [UtilityScreen] for a task with a status.',
  playground: Playground,
  variants: [Credits, Narrow],
  code: CODE,
});

export default meta;
export { Credits, Narrow, Overview, Playground };
