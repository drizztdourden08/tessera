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

const LayoutDemo = (props: LayoutArgs & { query?: string; phone?: boolean }) => {
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
      <Box className={`story-frame side-nav-layout-story__frame${narrow ? ' side-nav-layout-story__frame--narrow' : ''}${props.phone === true ? ' side-nav-layout-story__frame--phone' : ''}`}>
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

const Phone = {
  name: 'On a phone',
  args: ARGS,
  render: (args) => <LayoutDemo {...args} phone />,
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
  description: 'A side nav beside a content pane: the nav picks the page and the pane shows it.',
  points: [
    '`nav` takes every [SideNav] prop as data.',
    'Its search never narrows the menu: the host passes the matches as `results`, and the pane shows them.',
    '[[Esc]] clears a filled search without leaving the screen.',
    '`narrow` keeps the nav as a strip of icons and slides the open menu over the page.',
    'Under 640 px wide the nav folds into a bar with a menu button and the search; the menu opens as a drawer.',
    '`paneScroll` sets what scrolls: `page` by default, `always`, or `none` for pages that scroll themselves.',
  ],
  instead: '[WorkspaceScreen] for a whole screen, which builds one of these from its pages.',
  playground: Playground,
  variants: [Searching, Narrow, Phone],
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
export { Narrow, Overview, Phone, Playground, Searching };
