/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { HeaderAnchorNav, WindowHeader } from '../../src/composites';
import type { HeaderAnchorNavItem } from '../../src/composites';
import { Box, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import { navItemStates } from './_samples/nav-states';
import { SESSION_SECTIONS } from './_samples/nav';

type HeaderAnchorNavArgs = {
  ariaLabel: string;
  withBadges: boolean;
};

const withoutBadges = (items: readonly HeaderAnchorNavItem[]): HeaderAnchorNavItem[] => items.map(({ id, label }) => ({ id, label }));

const AnchorDemo = (props: HeaderAnchorNavArgs) => {
  const { ariaLabel, withBadges } = props;
  const [active, setActive] = useState('overview');
  return (
    <Box className="story-column">
      <HeaderAnchorNav items={withBadges ? SESSION_SECTIONS : withoutBadges(SESSION_SECTIONS)} activeId={active} onSelect={setActive} ariaLabel={ariaLabel} />
      <Text className="story-label">Current section: {active}</Text>
    </Box>
  );
};

const InHeaderDemo = (props: HeaderAnchorNavArgs) => {
  const { ariaLabel, withBadges } = props;
  const [active, setActive] = useState('players');
  return (
    <WindowHeader
      title="Friday async"
      subtitle="eu-west-2"
      extra={<HeaderAnchorNav items={withBadges ? SESSION_SECTIONS : withoutBadges(SESSION_SECTIONS)} activeId={active} onSelect={setActive} ariaLabel={ariaLabel} />}
    />
  );
};

const ARGS: Partial<HeaderAnchorNavArgs> = { ariaLabel: 'Session sections', withBadges: true };

const ARG_TYPES: PlaygroundArgTypes<HeaderAnchorNavArgs> = {
    ariaLabel: { group: 'Content', control: 'text' },
    withBadges: { group: 'Content', control: 'boolean' },
  };

const meta = {
  title: 'Composites · Navigation/HeaderAnchorNav',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<HeaderAnchorNavArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <AnchorDemo {...args} />,
} satisfies PlaygroundStory<HeaderAnchorNavArgs>;

const InWindowHeader = {
  name: 'In a window header',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <InHeaderDemo {...args} />,
} satisfies PlaygroundStory<HeaderAnchorNavArgs>;

const STATE_ITEMS: readonly HeaderAnchorNavItem[] = [{ id: 'players', label: 'Players', badge: 8 }];

const renderState = (props: StateProps) => (
  <HeaderAnchorNav items={STATE_ITEMS} activeId={props.selected === true ? 'players' : ''} onSelect={() => undefined} ariaLabel="Session sections" />
);

const CODE = `import { HeaderAnchorNav } from '@drizztdourden08/tessera';

const [active, setActive] = useState('players');

<HeaderAnchorNav
  items={[
    { id: 'players', label: 'Players', badge: 8 },
    { id: 'items', label: 'Items' },
  ]}
  activeId={active}
  onSelect={setActive}
  ariaLabel="Session sections"
/>`;

const Overview = overviewStory({
  component: 'HeaderAnchorNav',
  description: 'A row of pill links beside a page title, each one jumping to a section of the page, with the current one lit.',
  points: [
    'Use it when a long page has a few named sections, as [SettingsPage] does.',
    'Each item can carry a count in `badge`, and the row wraps when the header is narrow.',
    'It holds no state: pass `activeId`, scroll on `onSelect`, and move `activeId` as the page scrolls.',
    'It is a nav of buttons, not tabs: [[Tab]] moves from one button to the next.',
  ],
  instead: '[Tabs] when each section takes the place of the last instead of scrolling to it.',
  playground: Playground,
  variants: [InWindowHeader],
  states: {
    render: renderState,
    list: navItemStates('.header-anchor-nav__item'),
  },
  code: CODE,
});

export default meta;
export { InWindowHeader, Overview, Playground };
