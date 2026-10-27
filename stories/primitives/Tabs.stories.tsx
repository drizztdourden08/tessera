/* @layer stories @kind story */
import { useState } from 'react';
import type { ReactNode } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Box, Icon, Tabs, Text } from '../../src/primitives';
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
  { id: 'general', label: 'General', icon: <Icon name="settings" /> },
  { id: 'video', label: 'Video', icon: <Icon name="monitor" /> },
  { id: 'audio', label: 'Audio', icon: <Icon name="volume-2" /> },
  { id: 'controls', label: 'Controls', icon: <Icon name="gamepad-2" /> },
  { id: 'saves', label: 'Saves', icon: <Icon name="save" /> },
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

const StatefulTabs = (props: { tabs: TabItem[]; iconOnly?: boolean; size?: 'md' | 'lg' }) => {
  const { tabs, iconOnly, size } = props;
  const [active, setActive] = useState(tabs[0]?.id ?? '');
  const current = tabs.find((tab) => tab.id === active);
  return (
    <Box className="story-column">
      <Tabs tabs={tabs} activeTab={active} onTabChange={setActive} iconOnly={iconOnly} size={size} />
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

const LOCKED_TABS: TabItem[] = [
  { id: 'general', label: 'General', icon: <Icon name="settings" /> },
  { id: 'controls', label: 'Controls', icon: <Icon name="gamepad-2" />, disabled: true, disabledReason: 'Connect a controller to set its buttons.' },
  { id: 'cheats', label: 'Cheats', icon: <Icon name="wrench" />, disabled: true, disabledReason: 'Cheats open once a game is running.' },
  { id: 'saves', label: 'Saves', icon: <Icon name="save" /> },
];

const Disabled = {
  name: 'Disabled, with a reason',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">Click Controls or Cheats, then move away, press Esc or click elsewhere: the reason closes</Text>
      <StatefulTabs tabs={LOCKED_TABS} />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<TabsArgs>;

const TONED_TABS: TabItem[] = [
  { id: 'all', label: 'All', badge: 24, badgeTone: 'neutral' },
  { id: 'running', label: 'Running', badge: 3, badgeTone: 'info' },
  { id: 'done', label: 'Done', badge: 18, badgeTone: 'success' },
  { id: 'warnings', label: 'Warnings', badge: 2, badgeTone: 'warn' },
  { id: 'failed', label: 'Failed', badge: 1, badgeTone: 'danger' },
  { id: 'plain', label: 'Plain', badge: 5 },
];

const Tones = {
  name: 'Badge tones',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">badgeTone colours the count like the Badge primitive; the last tab has none and keeps the default.</Text>
      <StatefulTabs tabs={TONED_TABS} />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<TabsArgs>;

const TITLED_TABS: TabItem[] = [
  { id: 'running', label: 'Running', badge: 3, badgeTone: 'info', badgeTitle: '3 jobs running' },
  { id: 'warnings', label: 'Warnings', badge: 2, badgeTone: 'warn', badgeTitle: '2 jobs need a look' },
  { id: 'failed', label: 'Failed', badge: 1, badgeTone: 'danger', badgeTitle: '1 job failed in the last hour' },
  { id: 'plain', label: 'Plain', badge: 5 },
];

const Titled = {
  name: 'Badge titles',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">badgeTitle explains the count in a Tooltip on hover and focus, and is read out as the tab description; Plain has none.</Text>
      <StatefulTabs tabs={TITLED_TABS} />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<TabsArgs>;

const Sizes = {
  name: 'Sizes',
  render: () => (
    <Demonstrator
      rows={axis(['md', 'lg'] as const)}
      align="stretch"
      cell={(size) => <StatefulTabs tabs={withBadges(SETTINGS_TABS)} size={size} />}
    />
  ),
} satisfies StoryLiteStoryDefinition<TabsArgs>;

const Layouts = {
  name: 'Layouts',
  render: () => (
    <Demonstrator rows={axis(Object.keys(LAYOUTS))} align="stretch" cell={(layout) => LAYOUTS[layout]} />
  ),
} satisfies StoryLiteStoryDefinition<TabsArgs>;

const STATE_TAB: TabItem = { id: 'audio', label: 'Audio', icon: <Icon name="volume-2" />, badge: 2 };

const ignoreTabChange = (): void => undefined;

const renderState = (props: StateProps) => (
  <Tabs
    tabs={[{ ...STATE_TAB, disabled: props.disabled === true, disabledReason: 'Plug in headphones first.' }]}
    activeTab={props.selected === true ? STATE_TAB.id : ''}
    onTabChange={ignoreTabChange}
  />
);

const Overview = overviewStory({
  component: 'Tabs',
  description: 'A row of tabs that switches between the views of one screen, such as the sections of a settings page.',
  points: [
    'Each tab has a label, an optional icon and count `badge`; `badgeTone` tints it, `badgeTitle` explains it.',
    '`iconOnly` hides the labels and keeps each as the title; `size="lg"` makes the tabs 40 px tall.',
    'When the tabs run out of room the strip scrolls sideways, with an arrow at each edge that has more.',
    'The arrow keys, [[Home]] and [[End]] move the selection.',
    '`disabled` greys a tab out and the arrows skip it; `disabledReason` shows on hover and focus and is read out.',
    'The reason closes on pointer leave, blur, [[Esc]] or a click elsewhere; a click never pins it open.',
  ],
  instead: '[SegmentedControl] for a choice that sets a value instead of switching views.',
  playground: Playground,
  variants: [Layouts, Sizes, Tones, Titled, Disabled],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      { ...STATE.hover, target: '.tabs__tab' },
      { ...STATE.focus, target: '.tabs__tab' },
      STATE.selected,
      STATE.disabled,
    ],
  },
  code: `import { useState } from 'react';
import { Tabs } from '@drizztdourden08/tessera';

const TABS = [
  { id: 'general', label: 'General' },
  { id: 'video', label: 'Video' },
  { id: 'saves', label: 'Saves', badge: 12 },
  { id: 'cheats', label: 'Cheats', disabled: true, disabledReason: 'Cheats open once a game is running.' },
];

const [active, setActive] = useState('general');

<Tabs tabs={TABS} activeTab={active} onTabChange={setActive} />`,
});

export default meta;
export { Disabled, Layouts, Overview, Playground, Sizes, Titled, Tones };
