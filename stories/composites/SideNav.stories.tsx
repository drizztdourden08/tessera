/* @layer stories @kind story */
import { useMemo, useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { SideNav } from '../../src/composites';
import type { SideNavGroup } from '../../src/composites';
import { Box, Icon, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { NAV_ICONS, SETTINGS_GROUPS, TARGET_GROUPS } from './_samples/nav';
import type { NavIcon } from './_samples/nav';

type SideNavArgs = {
  searchable: boolean;
  searchPlaceholder: string;
  withHeader: boolean;
};

type NavDemoProps = SideNavArgs & { groups: SideNavGroup[]; initial: string };

const NavDemo = (props: NavDemoProps) => {
  const { groups, initial, searchable, searchPlaceholder, withHeader } = props;
  const [active, setActive] = useState(initial);
  return (
    <Box className="story-row">
      <SideNav
        groups={groups}
        activeId={active}
        onSelect={setActive}
        searchable={searchable}
        searchPlaceholder={searchPlaceholder}
        header={withHeader ? <Text variant="title">Settings</Text> : undefined}
      />
      <Text className="story-label">Selected: {active}</Text>
    </Box>
  );
};

const ICON_FOR: Record<string, NavIcon> = {
  general: 'settings', appearance: 'appearance', notifications: 'logs',
  hosting: 'hosting', servers: 'servers', 'game-presets': 'presets',
  logging: 'logs', 'data-folder': 'presets',
};

const IconDemo = (props: SideNavArgs) => {
  const groups = useMemo(() => SETTINGS_GROUPS.map((group) => ({
    ...group,
    items: group.items.map((item) => ({ ...item, icon: <Icon name={NAV_ICONS[ICON_FOR[item.id] ?? 'settings']} /> })),
  })), []);
  return <NavDemo {...props} groups={groups} initial="hosting" />;
};

const ControlledDemo = (props: SideNavArgs) => {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState('general');
  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SETTINGS_GROUPS;
    return SETTINGS_GROUPS
      .map((g) => ({ ...g, items: g.items.filter((i) => `${g.title} ${i.label}`.toLowerCase().includes(q)) }))
      .filter((g) => g.items.length > 0);
  }, [query]);
  return (
    <SideNav
      groups={groups}
      activeId={active}
      onSelect={setActive}
      searchable
      searchPlaceholder={props.searchPlaceholder}
      query={query}
      onQueryChange={setQuery}
    />
  );
};

const ARGS: Partial<SideNavArgs> = { searchable: true, searchPlaceholder: 'Filter settings...', withHeader: false };

const ARG_TYPES: StoryLiteArgTypes<SideNavArgs> = {
    searchable: { control: 'boolean' },
    searchPlaceholder: { control: 'text' },
    withHeader: { control: 'boolean' },
  };

const meta = {
  title: 'Composites · Navigation/SideNav',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<SideNavArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <NavDemo {...args} groups={SETTINGS_GROUPS} initial="general" />,
} satisfies StoryLiteStoryDefinition<SideNavArgs>;

const WithIcons = {
  name: 'With icons',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <IconDemo {...args} />,
} satisfies StoryLiteStoryDefinition<SideNavArgs>;

const HeadingTargets = {
  name: 'Group headings as targets',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <NavDemo {...args} groups={TARGET_GROUPS} initial="overview" searchable={false} withHeader />,
} satisfies StoryLiteStoryDefinition<SideNavArgs>;

const ControlledSearch = {
  name: 'Controlled search',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <ControlledDemo {...args} />,
} satisfies StoryLiteStoryDefinition<SideNavArgs>;

const CODE = `import { SideNav } from '@drizztdourden08/tessera';

const [active, setActive] = useState('general');

<SideNav
  groups={[
    { title: 'App', items: [{ id: 'general', label: 'General' }, { id: 'appearance', label: 'Appearance' }] },
    { title: 'Hosting', items: [{ id: 'servers', label: 'Servers' }] },
  ]}
  activeId={active}
  onSelect={setActive}
  searchable
/>`;

const Overview = overviewStory({
  component: 'SideNav',
  description: 'A grouped list of places to go, with the active item in gold, an optional header and an optional filter box. Reach for it for the left column of a settings page, or any list of places grouped under titles. Items can carry icons, and a group heading with an id becomes a target of its own. By default the filter narrows items by label; pass query and onQueryChange and the host owns the search and filters the groups itself.',
  playground: Playground,
  variants: [WithIcons, HeadingTargets],
  code: CODE,
});

export default meta;
export { ControlledSearch, HeadingTargets, Overview, Playground, WithIcons };
