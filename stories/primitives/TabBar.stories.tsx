/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, Glyph, TabBar, Text } from '../../src/primitives';
import type { TabItem } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';

type TabBarArgs = {
  iconOnly: boolean;
  withBadges: boolean;
};

const SETTINGS_TABS: TabItem[] = [
  { id: 'general', label: 'General', icon: <Glyph name="gear" /> },
  { id: 'video', label: 'Video', icon: <Glyph name="monitor" /> },
  { id: 'audio', label: 'Audio', icon: <Glyph name="volume" /> },
  { id: 'controls', label: 'Controls', icon: <Glyph name="gamepad" /> },
  { id: 'saves', label: 'Saves', icon: <Glyph name="save" /> },
];

const BADGES: Record<string, number> = { controls: 2, saves: 12 };

const withBadges = (tabs: TabItem[]): TabItem[] =>
  tabs.map((tab) => (BADGES[tab.id] === undefined ? tab : { ...tab, badge: BADGES[tab.id] }));

const DUNGEON_TABS: TabItem[] = [
  'Hyrule Castle', 'Eastern Palace', 'Desert Palace', 'Tower of Hera', 'Castle Tower',
  'Palace of Darkness', 'Swamp Palace', 'Skull Woods', "Thieves' Town", 'Ice Palace',
  'Misery Mire', 'Turtle Rock', "Ganon's Tower",
].map((label, index) => ({ id: `dungeon-${index}`, label, badge: index === 1 ? 3 : undefined }));

const ARGS: Partial<TabBarArgs> = { iconOnly: false, withBadges: true };

const ARG_TYPES: StoryLiteArgTypes<TabBarArgs> = {
    iconOnly: { control: 'boolean', description: 'Hides labels; each label becomes the tab title.' },
    withBadges: { control: 'boolean' },
  };

const meta = {
  title: 'Primitives · Navigation/TabBar',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<TabBarArgs>;

const StatefulTabs = (props: { tabs: TabItem[]; iconOnly?: boolean }) => {
  const { tabs, iconOnly } = props;
  const [active, setActive] = useState(tabs[0]?.id ?? '');
  const current = tabs.find((tab) => tab.id === active);
  return (
    <Box className="story-column">
      <TabBar tabs={tabs} activeTab={active} onTabChange={setActive} iconOnly={iconOnly} />
      <Text className="story-label">Active: {current?.label}</Text>
    </Box>
  );
};

const PlaygroundDemo = (props: TabBarArgs) => {
  const { iconOnly, withBadges: showBadges } = props;
  return <StatefulTabs tabs={showBadges ? withBadges(SETTINGS_TABS) : SETTINGS_TABS} iconOnly={iconOnly} />;
};

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <PlaygroundDemo {...args} />,
} satisfies StoryLiteStoryDefinition<TabBarArgs>;

const Layouts = {
  name: 'Layouts',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">labels only</Text>
      <StatefulTabs tabs={SETTINGS_TABS.map(({ id, label }) => ({ id, label }))} />
      <Text className="story-label">icons, labels and badges</Text>
      <StatefulTabs tabs={withBadges(SETTINGS_TABS)} />
      <Text className="story-label">icon only, labels move to the title</Text>
      <StatefulTabs tabs={SETTINGS_TABS} iconOnly />
      <Text className="story-label">overflowing, scroll or use the pagers and arrow keys</Text>
      <StatefulTabs tabs={DUNGEON_TABS} />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<TabBarArgs>;

const STATE_TAB: TabItem = { id: 'audio', label: 'Audio', icon: <Glyph name="volume" />, badge: 2 };

const ignoreTabChange = (): void => undefined;

const renderState = (props: StateProps) => (
  <TabBar tabs={[STATE_TAB]} activeTab={props.selected === true ? STATE_TAB.id : ''} onTabChange={ignoreTabChange} />
);

const Overview = overviewStory({
  component: 'TabBar',
  description: 'A row of tabs that switches between the views of one screen, such as the sections of a settings page. Each tab has a label and can carry an icon and a count badge. iconOnly hides the labels and keeps each one as the tab title. When the tabs run out of room the strip scrolls sideways, with pager buttons at each end, and the arrow keys, Home and End move the selection. A hovered tab brightens its label, the focused tab draws a ring inside its edges and the selected tab is underlined in the primary colour.',
  playground: Playground,
  variants: [Layouts],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      { ...STATE.hover, target: '.tab-bar__tab' },
      { ...STATE.focus, target: '.tab-bar__tab' },
      STATE.selected,
    ],
  },
  code: `import { useState } from 'react';
import { TabBar } from '@drizztdourden08/tessera';

const TABS = [
  { id: 'general', label: 'General' },
  { id: 'video', label: 'Video' },
  { id: 'saves', label: 'Saves', badge: 12 },
];

const [active, setActive] = useState('general');

<TabBar tabs={TABS} activeTab={active} onTabChange={setActive} />`,
});

export default meta;
export { Layouts, Overview, Playground };
