/* @layer stories @kind story */
import { useState } from 'react';
import type { ReactNode } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Box, Glyph, Tabs, Text } from '../../src/primitives';
import type { TabItem } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';

type TabsArgs = {
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

const ARGS: Partial<TabsArgs> = { iconOnly: false, withBadges: true };

const ARG_TYPES: PlaygroundArgTypes<TabsArgs> = {
    withBadges: { group: 'Content', control: 'boolean' },
    iconOnly: { group: 'Appearance', control: 'boolean', description: 'Hides labels; each label becomes the tab title.' },
  };

const meta = {
  title: 'Primitives · Navigation/Tabs',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<TabsArgs>;

const StatefulTabs = (props: { tabs: TabItem[]; iconOnly?: boolean }) => {
  const { tabs, iconOnly } = props;
  const [active, setActive] = useState(tabs[0]?.id ?? '');
  const current = tabs.find((tab) => tab.id === active);
  return (
    <Box className="story-column">
      <Tabs tabs={tabs} activeTab={active} onTabChange={setActive} iconOnly={iconOnly} />
      <Text className="story-label">Active: {current?.label}</Text>
    </Box>
  );
};

const PlaygroundDemo = (props: TabsArgs) => {
  const { iconOnly, withBadges: showBadges } = props;
  return <StatefulTabs tabs={showBadges ? withBadges(SETTINGS_TABS) : SETTINGS_TABS} iconOnly={iconOnly} />;
};

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <PlaygroundDemo {...args} />,
} satisfies PlaygroundStory<TabsArgs>;

const LAYOUTS: Readonly<Record<string, ReactNode>> = {
  'labels only': <StatefulTabs tabs={SETTINGS_TABS.map(({ id, label }) => ({ id, label }))} />,
  'icons, labels and badges': <StatefulTabs tabs={withBadges(SETTINGS_TABS)} />,
  'icon only, labels move to the title': <StatefulTabs tabs={SETTINGS_TABS} iconOnly />,
  'overflowing, scroll or use the pagers and arrow keys': <StatefulTabs tabs={DUNGEON_TABS} />,
};

const Layouts = {
  name: 'Layouts',
  render: () => (
    <Demonstrator rows={axis(Object.keys(LAYOUTS))} align="stretch" cell={(layout) => LAYOUTS[layout]} />
  ),
} satisfies StoryLiteStoryDefinition<TabsArgs>;

const STATE_TAB: TabItem = { id: 'audio', label: 'Audio', icon: <Glyph name="volume" />, badge: 2 };

const ignoreTabChange = (): void => undefined;

const renderState = (props: StateProps) => (
  <Tabs tabs={[STATE_TAB]} activeTab={props.selected === true ? STATE_TAB.id : ''} onTabChange={ignoreTabChange} />
);

const Overview = overviewStory({
  component: 'Tabs',
  description: 'A row of tabs that switches between the views of one screen, such as the sections of a settings page. Each tab has a label and can carry an icon and a count badge. iconOnly hides the labels and keeps each one as the tab title. When the tabs run out of room the strip scrolls sideways. A left arrow shows once the strip has scrolled away from the start and a right arrow while more tabs wait to the right; each sits over a faded edge and takes no room. The arrow keys, Home and End move the selection. A hovered tab brightens its label, the focused tab draws a ring inside its edges and the selected tab is underlined in the primary colour.',
  playground: Playground,
  variants: [Layouts],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      { ...STATE.hover, target: '.tabs__tab' },
      { ...STATE.focus, target: '.tabs__tab' },
      STATE.selected,
    ],
  },
  code: `import { useState } from 'react';
import { Tabs } from '@drizztdourden08/tessera';

const TABS = [
  { id: 'general', label: 'General' },
  { id: 'video', label: 'Video' },
  { id: 'saves', label: 'Saves', badge: 12 },
];

const [active, setActive] = useState('general');

<Tabs tabs={TABS} activeTab={active} onTabChange={setActive} />`,
});

export default meta;
export { Layouts, Overview, Playground };
