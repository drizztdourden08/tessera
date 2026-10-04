/* @layer stories @kind story */
import { useMemo, useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { SideNav } from '../../src/composites';
import type { SideNavConfig, SideNavItem, SideNavVariant } from '../../src/composites';
import { Box, Icon, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { navItemStates } from './_samples/nav-states';
import { NAV_ICONS } from './_samples/nav';
import { SideNavLeads } from './_samples/SideNavLeads';
import { SideNavScroll } from './_samples/SideNavScroll';
import type { NavIcon } from './_samples/nav';
import './SideNav.stories.css';

type SideNavArgs = {
  variant: SideNavVariant;
  collapsed: boolean;
  defaultOpen: boolean;
  withSearch: boolean;
  withHome: boolean;
  searchPlaceholder: string;
};

const item = (id: string, label: string, icon: NavIcon): SideNavItem => ({
  id, label, icon: <Icon name={NAV_ICONS[icon]} size={18} />,
});

const HOME = item('home', 'Home', 'home');

const GROUPS: SideNavConfig['groups'] = [
  { id: 'play', label: 'Play', items: [item('sessions', 'Sessions', 'sessions'), item('players', 'Players', 'players')] },
  { id: 'library', label: 'Library', items: [item('presets', 'Game presets', 'presets'), item('logs', 'Item logs', 'logs')] },
  { id: 'system', label: 'System', items: [item('servers', 'Servers', 'servers'), item('settings', 'Settings', 'settings')] },
];

const ALL_ITEMS = [HOME, ...GROUPS.flatMap((g) => g.items)];

const NavDemo = (props: SideNavArgs) => {
  const { variant, collapsed, defaultOpen, withSearch, withHome, searchPlaceholder } = props;
  const [active, setActive] = useState('sessions');
  const [query, setQuery] = useState('');
  const config = useMemo<SideNavConfig>(() => ({ home: withHome ? HOME : undefined, groups: GROUPS }), [withHome]);
  const q = query.trim().toLowerCase();
  const matches = ALL_ITEMS.filter((i) => i.label.toLowerCase().includes(q));
  const current = ALL_ITEMS.find((i) => i.id === active);
  return (
    <Box className="story-frame side-nav-story__frame">
      <SideNav
        key={String(defaultOpen)}
        variant={variant}
        collapsed={collapsed}
        config={config}
        activeId={active}
        onSelect={setActive}
        defaultOpen={defaultOpen}
        search={withSearch ? { value: query, onChange: setQuery, placeholder: searchPlaceholder } : undefined}
      />
      <Box className="side-nav-story__pane">
        {q
          ? <Text className="story-label">{matches.length} matches: {matches.map((m) => m.label).join(', ') || 'none'}</Text>
          : <Text variant="title">{current?.label ?? active}</Text>}
        <Text>The chevron on the nav edge opens it to show group and item labels.</Text>
      </Box>
    </Box>
  );
};

const ARGS: Partial<SideNavArgs> = { variant: 'panel', collapsed: false, defaultOpen: false, withSearch: true, withHome: true, searchPlaceholder: 'Search sessions and presets' };

const ARG_TYPES: PlaygroundArgTypes<SideNavArgs> = {
    withSearch: { group: 'Content', control: 'boolean' },
    withHome: { group: 'Content', control: 'boolean' },
    searchPlaceholder: { group: 'Content', control: 'text' },
    variant: { group: 'Appearance', control: 'select', options: ['panel', 'rail'] },
    collapsed: { group: 'State', control: 'boolean' },
    defaultOpen: { group: 'State', control: 'boolean' },
  };

const meta = {
  title: 'Composites · Navigation/SideNav',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<SideNavArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <NavDemo {...args} />,
} satisfies PlaygroundStory<SideNavArgs>;

const OpenWithSearch = {
  name: 'Open with search',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <NavDemo {...args} defaultOpen withSearch />,
} satisfies PlaygroundStory<SideNavArgs>;

const GroupsOnly = {
  name: 'Groups only',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <NavDemo {...args} withSearch={false} withHome={false} />,
} satisfies PlaygroundStory<SideNavArgs>;

const FirstRows = {
  name: 'Chevron beside the first row',
  render: () => <SideNavLeads />,
} satisfies StoryLiteStoryDefinition<SideNavArgs>;

const ManyItems = {
  name: 'Many items, scrolling',
  render: () => <SideNavScroll />,
} satisfies StoryLiteStoryDefinition<SideNavArgs>;

const RAIL_GROUPS: SideNavConfig['groups'] = [
  { id: 'main', items: [HOME, item('sessions', 'Sessions', 'sessions')] },
  ...GROUPS.slice(1).map((group) => ({ ...group, items: group.items.map((entry) => ({ ...entry, disabled: entry.id === 'logs' })) })),
];

const RailDemo = (props: SideNavArgs) => {
  const { collapsed } = props;
  const [active, setActive] = useState('home');
  const current = ALL_ITEMS.find((i) => i.id === active);
  return (
    <Box className="story-frame side-nav-story__frame side-nav-story__frame--rail">
      <SideNav variant="rail" collapsed={collapsed} ariaLabel="Screens" config={{ groups: RAIL_GROUPS }} activeId={active} onSelect={setActive} />
      <Box className="side-nav-story__pane">
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
} satisfies PlaygroundStory<SideNavArgs>;

const RailCollapsed = {
  name: 'Rail, collapsed',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <RailDemo {...args} collapsed />,
} satisfies PlaygroundStory<SideNavArgs>;

const STATE_ITEMS = [item('sessions', 'Sessions', 'sessions')];

const renderState = (props: StateProps) => (
  <SideNav
    config={{ groups: [{ id: 'play', label: 'Play', items: STATE_ITEMS.map((entry) => ({ ...entry, disabled: props.disabled === true })) }] }}
    activeId={props.selected === true ? 'sessions' : ''}
    onSelect={() => undefined}
    defaultOpen={props.open === true}
  />
);

const CODE = `import { SideNav } from '@drizztdourden08/tessera';

const [active, setActive] = useState('sessions');
const [query, setQuery] = useState('');

<SideNav
  config={{ home: HOME, groups: GROUPS }}
  activeId={active}
  onSelect={setActive}
  search={{ value: query, onChange: setQuery, placeholder: 'Search sessions' }}
/>`;

const Overview = overviewStory({
  component: 'SideNav',
  description: 'The side nav of a window with several sections: a column of icons that a chevron on its edge opens to show the labels.',
  points: [
    'Use it for the top-level sections of a window; `config` lists the groups, their items and an optional `home`.',
    'It starts collapsed unless `defaultOpen`; `open` with `onOpenChange` or `storageKey` keeps the choice.',
    '`search` adds a field that grows when the nav opens; the host owns the query and shows the results.',
    '`overlay` slides the open nav over the content; [[Esc]], a click outside or a pick closes it.',
    '`variant="rail"` is the app screen list: flush on the window edge, its labels shown unless `collapsed`.',
  ],
  instead: '[SideNavLayout] for a nav beside a content pane that shows the page and the search results.',
  playground: Playground,
  variants: [OpenWithSearch, GroupsOnly, FirstRows, ManyItems, Rail, RailCollapsed],
  states: {
    render: renderState,
    list: [
      ...navItemStates('.side-nav__item'),
      STATE.open,
      STATE.disabled,
    ],
  },
  code: CODE,
});

export default meta;
export { FirstRows, GroupsOnly, ManyItems, OpenWithSearch, Overview, Playground, Rail, RailCollapsed };
