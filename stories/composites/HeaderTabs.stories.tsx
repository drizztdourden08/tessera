/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { HeaderTabs, WindowHeader } from '../../src/composites';
import type { HeaderTabItem } from '../../src/composites';
import { Box, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import { navItemStates } from './_samples/nav-states';
import { SESSION_TABS } from './_samples/nav';

type HeaderTabsArgs = {
  ariaLabel: string;
  withBadges: boolean;
};

const VIEWS: readonly HeaderTabItem[] = [
  { id: 'list', label: 'List' },
  { id: 'grid', label: 'Grid' },
  { id: 'timeline', label: 'Timeline' },
];

const TabsDemo = (props: HeaderTabsArgs & { items: readonly HeaderTabItem[] }) => {
  const { ariaLabel, withBadges, items } = props;
  const [active, setActive] = useState(items[0]?.id ?? '');
  const shown = withBadges ? items : items.map(({ id, label }) => ({ id, label }));
  return (
    <Box className="story-column">
      <HeaderTabs items={shown} activeId={active} onSelect={setActive} ariaLabel={ariaLabel} />
      <Text className="story-label">Active: {active}</Text>
    </Box>
  );
};

const InHeaderDemo = (props: HeaderTabsArgs) => {
  const { ariaLabel, withBadges } = props;
  const [active, setActive] = useState('players');
  const items = withBadges ? SESSION_TABS : SESSION_TABS.map(({ id, label }) => ({ id, label }));
  return (
    <WindowHeader
      title="Friday async"
      subtitle="eu-west-2"
      extra={<HeaderTabs items={items} activeId={active} onSelect={setActive} ariaLabel={ariaLabel} />}
    />
  );
};

const ARGS: Partial<HeaderTabsArgs> = { ariaLabel: 'Session sections', withBadges: true };

const ARG_TYPES: StoryLiteArgTypes<HeaderTabsArgs> = {
    ariaLabel: { control: 'text' },
    withBadges: { control: 'boolean' },
  };

const meta = {
  title: 'Composites · Navigation/HeaderTabs',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<HeaderTabsArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <TabsDemo {...args} items={SESSION_TABS} />,
} satisfies StoryLiteStoryDefinition<HeaderTabsArgs>;

const ViewSwitch = {
  name: 'View switch',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <TabsDemo {...args} ariaLabel="Item log view" items={VIEWS} />,
} satisfies StoryLiteStoryDefinition<HeaderTabsArgs>;

const InWindowHeader = {
  name: 'In a window header',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <InHeaderDemo {...args} />,
} satisfies StoryLiteStoryDefinition<HeaderTabsArgs>;

const STATE_TABS: readonly HeaderTabItem[] = [{ id: 'players', label: 'Players', badge: 8 }];

const renderState = (props: StateProps) => (
  <HeaderTabs items={STATE_TABS} activeId={props.selected === true ? 'players' : ''} onSelect={() => undefined} ariaLabel="Session sections" />
);

const CODE = `import { HeaderTabs } from '@drizztdourden08/tessera';

const [active, setActive] = useState('players');

<HeaderTabs
  items={[
    { id: 'players', label: 'Players', badge: 8 },
    { id: 'items', label: 'Items' },
  ]}
  activeId={active}
  onSelect={setActive}
  ariaLabel="Session sections"
/>`;

const Overview = overviewStory({
  component: 'HeaderTabs',
  description: 'The strip of pill tabs a page header carries beside its title, with the active pill in gold. Reach for it to jump between the sections of a page or to switch between views of the same data. Each tab can carry a count badge, and the strip wraps onto more lines when the header is narrow. It holds no state: the host passes the active id and handles the pick.',
  playground: Playground,
  variants: [ViewSwitch, InWindowHeader],
  states: {
    render: renderState,
    list: navItemStates('.header-tabs__tab'),
  },
  code: CODE,
});

export default meta;
export { InWindowHeader, Overview, Playground, ViewSwitch };
