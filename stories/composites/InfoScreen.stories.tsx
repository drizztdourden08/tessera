/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Logo } from '../../src/brand';
import { InfoScreen } from '../../src/composites';
import type { InfoScreenWidth } from '../../src/composites';
import { Span, Title } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { AboutBody } from './_samples/AboutBody';
import { CreditsBody } from './_samples/CreditsBody';
import { ScreenDemo } from './_samples/ScreenDemo';
import './InfoScreen.stories.css';

type InfoArgs = {
  page: 'about' | 'credits';
  width: InfoScreenWidth;
  withFooter: boolean;
};

const LEGAL = 'A fan project, not made or approved by the owners of the games it tracks. Names and marks belong to their owners.';

const lead = (line: string) => (
  <>
    <Logo brand="rotp" variant="app-icon" size="xl" title="" />
    <Title level={2} className="info-screen-story__lead-title">Relic of the Past</Title>
    <Span tone="muted">{line}</Span>
  </>
);

const ABOUT_LEAD = lead('Tracks your randomizer runs, from the first seed to the last boss.');
const CREDITS_LEAD = lead('Made by a small team, with help from these people and projects.');

const InfoDemo = (props: InfoArgs) => {
  const { page, width, withFooter } = props;
  const [hidden, setHidden] = useState(false);
  const about = page === 'about';
  return (
    <ScreenDemo hidden={hidden} onReopen={() => setHidden(false)} note="The close button hides the screen">
      <InfoScreen
        title={about ? 'About' : 'Credits'}
        width={width}
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

const ARGS: Partial<InfoArgs> = { page: 'about', width: 'readable', withFooter: true };

const ARG_TYPES: StoryLiteArgTypes<InfoArgs> = {
  page: { control: 'select', options: ['about', 'credits'] },
  width: { control: 'select', options: ['readable', 'wide'], description: 'readable keeps lines short; wide fits a grid of cards.' },
  withFooter: { control: 'boolean' },
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
} satisfies StoryLiteStoryDefinition<InfoArgs>;

const Credits = {
  name: 'Credits',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: () => <InfoDemo page="credits" width="wide" withFooter={false} />,
} satisfies StoryLiteStoryDefinition<InfoArgs>;

const CODE = `import { FactsPanel, InfoScreen, Logo, Title } from '@drizztdourden08/tessera';

<InfoScreen
  title="About"
  onClose={close}
  lead={<><Logo brand="rotp" variant="app-icon" size="xl" title="" /><Title level={2}>Relic of the Past</Title></>}
  footer={LEGAL}
>
  <FactsPanel label="This build" groups={[[{ label: 'Version', value: '0.9.2', mono: true }]]} />
</InfoScreen>`;

const Overview = overviewStory({
  component: 'InfoScreen',
  description: 'A screen the user reads: About, credits, a licence or a welcome. It is a ScreenWindow with wide margins and one centred column that scrolls. lead sits at the top of the column, centred, for a logo, a wordmark or a hero. The children are the sections, spaced well apart. footer closes the column with small dim text above a hairline, for legal text. width="readable" keeps lines short; width="wide" fits a grid of cards, as credits need. An About screen puts the logo and the name in lead and the build facts in a FactsPanel.',
  playground: Playground,
  points: [
    'Use it when the user reads and does not change anything.',
    'For settings and pages with a side list, use WorkspaceScreen. For a task with a status and actions, use UtilityScreen.',
    'The column keeps the same margins at every size, down to the tiny room where the card fills the layer.',
  ],
  variants: [Credits],
  code: CODE,
});

export default meta;
export { Credits, Overview, Playground };
