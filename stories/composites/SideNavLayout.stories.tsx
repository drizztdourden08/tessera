/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { SearchResults, SideNavLayout } from '../../src/composites';
import { Box, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { LIBRARY_NAV, searchLibrary } from './_samples/library-search';
import { LibraryPageView } from './_samples/LibraryPageView';
import './SideNavLayout.stories.css';

type LayoutArgs = {
  withSearch: boolean;
  narrow: boolean;
  searchPlaceholder: string;
};

const countOf = (groups: ReturnType<typeof searchLibrary>): number => groups.reduce((sum, group) => sum + (group.count ?? 0), 0);

const LayoutDemo = (props: LayoutArgs & { query?: string }) => {
  const { withSearch, narrow, searchPlaceholder } = props;
  const [active, setActive] = useState('hosting');
  const [flash, setFlash] = useState<string | undefined>(undefined);
  const [query, setQuery] = useState(props.query ?? '');
  const groups = searchLibrary(query);
  const open = (page: string, entry?: string) => {
    setQuery('');
    setFlash(entry);
    setActive(page);
  };
  const search = withSearch ? { value: query, onChange: setQuery, placeholder: searchPlaceholder } : undefined;
  return (
    <Box className="story-column">
      <Text className="story-label">Search for port, password or saves: the matches come from every page</Text>
      <Box className={`story-frame side-nav-layout-story__frame${narrow ? ' side-nav-layout-story__frame--narrow' : ''}`}>
        <SideNavLayout
          narrow={narrow}
          paneScroll="none"
          nav={{ config: LIBRARY_NAV, activeId: active, onSelect: (id) => open(id), search, defaultOpen: !narrow }}
          results={(
            <SearchResults
              query={query}
              count={countOf(groups)}
              groups={groups}
              onOpenGroup={(id) => open(id)}
              onOpenHit={(hit) => open(hit.id.split('/')[0] ?? hit.id, hit.id.split('/')[1])}
            />
          )}
        >
          <LibraryPageView id={active} flash={flash} />
        </SideNavLayout>
      </Box>
    </Box>
  );
};

const ARGS: Partial<LayoutArgs> = { withSearch: true, narrow: false, searchPlaceholder: 'Search the guides' };

const ARG_TYPES: PlaygroundArgTypes<LayoutArgs> = {
  withSearch: { group: 'Content', control: 'boolean', description: 'A search field in the side nav. It searches the content of every page, never the menu.' },
  searchPlaceholder: { group: 'Content', control: 'text' },
  narrow: { group: 'Layout', control: 'boolean', description: 'For a narrow window: the menu slides over the page, which keeps its width.' },
};

const meta = {
  title: 'Composites · Layout/SideNavLayout',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<LayoutArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <LayoutDemo {...args} />,
} satisfies PlaygroundStory<LayoutArgs>;

const Searching = {
  name: 'Searching every page',
  args: ARGS,
  render: (args) => <LayoutDemo {...args} query="pass" />,
} satisfies StoryLiteStoryDefinition<LayoutArgs>;

const Narrow = {
  name: 'In a narrow window',
  args: ARGS,
  render: (args) => <LayoutDemo {...args} narrow />,
} satisfies StoryLiteStoryDefinition<LayoutArgs>;

const renderState = (props: StateProps) => {
  const query = props.searching === true ? 'port' : '';
  const groups = searchLibrary(query);
  return (
    <Box className="side-nav-layout-story__state">
      <SideNavLayout
        paneScroll="none"
        nav={{ config: LIBRARY_NAV, activeId: 'hosting', onSelect: () => undefined, defaultOpen: true, search: { value: query, onChange: () => undefined, placeholder: 'Search the guides' } }}
        results={<SearchResults query={query} count={countOf(groups)} groups={groups} />}
      >
        <LibraryPageView id="hosting" />
      </SideNavLayout>
    </Box>
  );
};

const CODE = `import { SearchResults, SideNavLayout } from '@drizztdourden08/tessera';

const [query, setQuery] = useState('');
const groups = searchEveryPage(query);

<SideNavLayout
  paneScroll="none"
  nav={{ config, activeId: page, onSelect: openPage, search: { value: query, onChange: setQuery, placeholder: 'Search the guides' } }}
  results={<SearchResults query={query} count={total} groups={groups} onOpenHit={openHit} onOpenGroup={openPage} />}
>
  <CurrentPage />
</SideNavLayout>`;

const Overview = overviewStory({
  component: 'SideNavLayout',
  description: 'A side nav beside a content pane: the nav picks the page, the pane shows it. Reach for it inside an app frame; for a whole screen with settings, use WorkspaceScreen, which builds one from its content. The nav is data and takes every SideNav prop. Its search never narrows the menu: the host searches the content of every page with the query and passes the matches as results, and the pane shows them while the field has focus or holds text, with no nav item current. Escape clears a filled search without leaving the screen. narrow is for a narrow window: the nav stays a strip of icons beside the page, and its toggle slides the open menu over the page, which keeps its full width. paneScroll sets what the pane scrolls: page, the default, scrolls the page and leaves the results to scroll themselves; always scrolls both; none scrolls neither, for pages that scroll themselves, such as a SettingsPage.',
  playground: Playground,
  variants: [Searching, Narrow],
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
export { Narrow, Overview, Playground, Searching };
