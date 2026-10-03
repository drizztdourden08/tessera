/* @layer stories @kind story */
import { useMemo, useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { NavLayout, SearchResults, SettingsGroupList, SettingsPage } from '../../src/composites';
import { Box, Paragraph } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { HUB_NAV, HUB_PAGES, matchHub } from './_samples/hub';
import { SETTINGS_ANCHORS, useSettingsSample } from './_samples/settings-list';
import './NavLayout.stories.css';

type NavLayoutArgs = {
  withSearch: boolean;
  compact: boolean;
  searchPlaceholder: string;
};

const HubPage = (props: { id: string }) => {
  const { id } = props;
  const sections = useSettingsSample();
  const page = HUB_PAGES.find((p) => p.id === id);
  const label = page?.label ?? id;
  const body = id === 'general'
    ? <SettingsGroupList sections={sections} />
    : <Paragraph tone="muted">The {label} page renders here. Pick General for a full settings page.</Paragraph>;
  return (
    <SettingsPage icon={page?.icon} title={label} anchors={id === 'general' ? SETTINGS_ANCHORS : undefined}>
      {body}
    </SettingsPage>
  );
};

const LayoutDemo = (props: NavLayoutArgs) => {
  const { withSearch, compact, searchPlaceholder } = props;
  const [active, setActive] = useState('general');
  const [query, setQuery] = useState('');
  const hits = useMemo(() => matchHub(query), [query]);
  const open = (id: string) => { setQuery(''); setActive(id.split('/')[0] ?? id); };
  const search = withSearch ? { value: query, onChange: setQuery, placeholder: searchPlaceholder } : undefined;
  return (
    <Box className={`story-frame nav-layout-story__frame${compact ? ' nav-layout-story__frame--narrow' : ''}`}>
      <NavLayout
        compact={compact}
        nav={{ config: HUB_NAV, activeId: active, onSelect: open, search, defaultOpen: !compact }}
        results={<SearchResults query={query} count={hits.length} hits={hits} onOpenHit={(hit) => open(hit.id)} />}
      >
        <HubPage id={active} />
      </NavLayout>
    </Box>
  );
};

const ARGS: Partial<NavLayoutArgs> = { withSearch: true, compact: false, searchPlaceholder: 'Search this hub' };

const ARG_TYPES: StoryLiteArgTypes<NavLayoutArgs> = {
  withSearch: { control: 'boolean' },
  compact: { control: 'boolean', description: 'For a narrow window: the menu slides over the page, which keeps its width. The frame narrows to show it.' },
  searchPlaceholder: { control: 'text' },
};

const meta = {
  title: 'Composites · Navigation/NavLayout',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<NavLayoutArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <LayoutDemo {...args} />,
} satisfies StoryLiteStoryDefinition<NavLayoutArgs>;

const Compact = {
  name: 'Compact, in a narrow window',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <LayoutDemo {...args} compact />,
} satisfies StoryLiteStoryDefinition<NavLayoutArgs>;

const renderState = (props: StateProps) => {
  const query = props.searching === true ? 'se' : '';
  const hits = matchHub(query);
  return (
    <Box className="nav-layout-story__state">
      <NavLayout
        nav={{
          config: HUB_NAV,
          activeId: 'general',
          onSelect: () => undefined,
          defaultOpen: true,
          search: { value: query, onChange: () => undefined, placeholder: 'Search this hub' },
        }}
        results={<SearchResults query={query} count={hits.length} hits={hits} />}
      >
        <Paragraph tone="muted">The General page.</Paragraph>
      </NavLayout>
    </Box>
  );
};

const CODE = `import { NavLayout, SearchResults } from '@drizztdourden08/tessera';

const [query, setQuery] = useState('');

<NavLayout
  nav={{ config, activeId: page, onSelect: openPage, search: { value: query, onChange: setQuery, placeholder: 'Search this hub' } }}
  results={<SearchResults query={query} count={hits.length} hits={hits} onOpenHit={openHit} />}
>
  <CurrentPage />
</NavLayout>`;

const Overview = overviewStory({
  component: 'NavLayout',
  description: 'A window of sections: a SideNav on the left and the current page on the right, in a pane that scrolls. Reach for it for a hub or a settings screen. The nav is data and takes every SideNav prop. When the nav has a search and results is set, the pane shows the results while the field has focus or holds text, and no nav item reads as current. Escape clears a filled search without leaving the screen. compact is for a narrow window: the nav stays a strip of icons beside the page, and its toggle slides the open menu over the page, which keeps its full width; the toggle, Escape, a click outside or picking an item closes it, and focus goes back to the toggle. The pane takes a SettingsPage, a SearchResults or any page. paneScroll sets what the pane scrolls: page, the default, scrolls the page and leaves the results to scroll themselves, as SearchResults does; always scrolls both; none scrolls neither, for pages that scroll themselves, such as a SettingsPage.',
  playground: Playground,
  variants: [Compact],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      { name: 'Searching', props: { searching: true } },
    ],
  },
  code: CODE,
});

export default meta;
export { Compact, Overview, Playground };
