/* @layer stories @kind story */
import { useMemo, useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { SectionNav } from '../../src/composites';
import type { SectionNavConfig, SectionNavItem, SectionNavVariant } from '../../src/composites';
import { Box, Icon, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { navItemStates } from './_samples/nav-states';
import { NAV_ICONS } from './_samples/nav';
import type { NavIcon } from './_samples/nav';
import './SectionNav.stories.css';

type SectionNavArgs = {
  variant: SectionNavVariant;
  collapsed: boolean;
  defaultOpen: boolean;
  withSearch: boolean;
  withHome: boolean;
  searchPlaceholder: string;
};

const item = (id: string, label: string, icon: NavIcon): SectionNavItem => ({
  id, label, icon: <Icon name={NAV_ICONS[icon]} size={18} />,
});

const HOME = item('home', 'Home', 'home');

const GROUPS: SectionNavConfig['groups'] = [
  { id: 'play', label: 'Play', items: [item('sessions', 'Sessions', 'sessions'), item('players', 'Players', 'players')] },
  { id: 'library', label: 'Library', items: [item('presets', 'Game presets', 'presets'), item('logs', 'Item logs', 'logs')] },
  { id: 'system', label: 'System', items: [item('servers', 'Servers', 'servers'), item('settings', 'Settings', 'settings')] },
];

const ALL_ITEMS = [HOME, ...GROUPS.flatMap((g) => g.items)];

const NavDemo = (props: SectionNavArgs) => {
  const { variant, collapsed, defaultOpen, withSearch, withHome, searchPlaceholder } = props;
  const [active, setActive] = useState('sessions');
  const [query, setQuery] = useState('');
  const config = useMemo<SectionNavConfig>(() => ({ home: withHome ? HOME : undefined, groups: GROUPS }), [withHome]);
  const q = query.trim().toLowerCase();
  const matches = ALL_ITEMS.filter((i) => i.label.toLowerCase().includes(q));
  const current = ALL_ITEMS.find((i) => i.id === active);
  return (
    <Box className="story-frame section-nav-story__frame">
      <SectionNav
        key={String(defaultOpen)}
        variant={variant}
        collapsed={collapsed}
        config={config}
        activeId={active}
        onSelect={setActive}
        defaultOpen={defaultOpen}
        search={withSearch ? { value: query, onChange: setQuery, placeholder: searchPlaceholder } : undefined}
      />
      <Box className="section-nav-story__pane">
        {q
          ? <Text className="story-label">{matches.length} matches: {matches.map((m) => m.label).join(', ') || 'none'}</Text>
          : <Text variant="title">{current?.label ?? active}</Text>}
        <Text>The chevron on the nav edge opens it to show group and item labels.</Text>
      </Box>
    </Box>
  );
};

const ARGS: Partial<SectionNavArgs> = { variant: 'panel', collapsed: false, defaultOpen: false, withSearch: true, withHome: true, searchPlaceholder: 'Search sessions and presets' };

const ARG_TYPES: StoryLiteArgTypes<SectionNavArgs> = {
    variant: { control: 'select', options: ['panel', 'rail'] },
    collapsed: { control: 'boolean' },
    defaultOpen: { control: 'boolean' },
    withSearch: { control: 'boolean' },
    withHome: { control: 'boolean' },
    searchPlaceholder: { control: 'text' },
  };

const meta = {
  title: 'Composites · Navigation/SectionNav',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<SectionNavArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <NavDemo {...args} />,
} satisfies StoryLiteStoryDefinition<SectionNavArgs>;

const OpenWithSearch = {
  name: 'Open with search',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <NavDemo {...args} defaultOpen withSearch />,
} satisfies StoryLiteStoryDefinition<SectionNavArgs>;

const GroupsOnly = {
  name: 'Groups only',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <NavDemo {...args} withSearch={false} withHome={false} />,
} satisfies StoryLiteStoryDefinition<SectionNavArgs>;

const RAIL_GROUPS: SectionNavConfig['groups'] = [
  { id: 'main', items: [HOME, item('sessions', 'Sessions', 'sessions')] },
  ...GROUPS.slice(1).map((group) => ({ ...group, items: group.items.map((entry) => ({ ...entry, disabled: entry.id === 'logs' })) })),
];

const RailDemo = (props: SectionNavArgs) => {
  const { collapsed } = props;
  const [active, setActive] = useState('home');
  const current = ALL_ITEMS.find((i) => i.id === active);
  return (
    <Box className="story-frame section-nav-story__frame section-nav-story__frame--rail">
      <SectionNav variant="rail" collapsed={collapsed} ariaLabel="Screens" config={{ groups: RAIL_GROUPS }} activeId={active} onSelect={setActive} />
      <Box className="section-nav-story__pane">
        <Text variant="title">{current?.label ?? active}</Text>
        <Text>The rail sits flush on the window edge. The host sets collapsed to narrow it to icons; Item logs is disabled.</Text>
      </Box>
    </Box>
  );
};

const Rail = {
  name: 'Rail',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <RailDemo {...args} />,
} satisfies StoryLiteStoryDefinition<SectionNavArgs>;

const RailCollapsed = {
  name: 'Rail, collapsed',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <RailDemo {...args} collapsed />,
} satisfies StoryLiteStoryDefinition<SectionNavArgs>;

const STATE_ITEMS = [item('sessions', 'Sessions', 'sessions')];

const renderState = (props: StateProps) => (
  <SectionNav
    config={{ groups: [{ id: 'play', label: 'Play', items: STATE_ITEMS.map((entry) => ({ ...entry, disabled: props.disabled === true })) }] }}
    activeId={props.selected === true ? 'sessions' : ''}
    onSelect={() => undefined}
    defaultOpen={props.open === true}
  />
);

const CODE = `import { SectionNav } from '@drizztdourden08/tessera';

const [active, setActive] = useState('sessions');
const [query, setQuery] = useState('');

<SectionNav
  config={{ home: HOME, groups: GROUPS }}
  activeId={active}
  onSelect={setActive}
  search={{ value: query, onChange: setQuery, placeholder: 'Search sessions' }}
/>`;

const Overview = overviewStory({
  component: 'SectionNav',
  description: 'The side nav of a window with several sections: a column of gold line icons, collapsed by default, which a chevron on its edge opens to show group and item labels. Reach for it for the top-level sections of a window, such as a data manager. It can pin a Home item above the groups and hold a search field that grows when the nav opens; the host owns the query and shows the results. On narrow screens the open panel floats over the content, so the page does not reflow. The rail variant is the app-level screen list: it sits flush on the window edge on the surface fill, shows its labels unless the host collapses it, draws no toggle, and can hold disabled items and a group with no label.',
  playground: Playground,
  variants: [OpenWithSearch, GroupsOnly, Rail, RailCollapsed],
  states: {
    render: renderState,
    list: [
      ...navItemStates('.section-nav__item'),
      STATE.open,
      STATE.disabled,
    ],
  },
  code: CODE,
});

export default meta;
export { GroupsOnly, OpenWithSearch, Overview, Playground, Rail, RailCollapsed };
