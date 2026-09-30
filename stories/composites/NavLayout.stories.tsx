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
    <Box className="story-frame nav-layout-story__frame">
      <NavLayout
        compact={compact}
        nav={{ config: HUB_NAV, activeId: active, onSelect: open, search, defaultOpen: true }}
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
  compact: { control: 'boolean' },
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
  name: 'Compact, no search',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <LayoutDemo {...args} compact withSearch={false} />,
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
  description: 'A window of sections: a SectionNav on the left and the current page on the right, in a pane that scrolls. Reach for it for a hub or a settings screen. The nav is data and takes every SectionNav prop. When the nav has a search and results is set, the pane shows the results while the field has focus or holds text, and no nav item reads as current. Escape clears a filled search without leaving the screen. compact tightens the gap beside the nav. The pane takes a SettingsPage, a SearchResults or any page.',
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
