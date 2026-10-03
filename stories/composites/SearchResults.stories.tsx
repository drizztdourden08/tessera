/* @layer stories @kind story */
import { useMemo, useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { SearchResults } from '../../src/composites';
import type { SearchResultsGroupHeading } from '../../src/composites';
import { Box, Icon, SearchInput, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import { matchHub } from './_samples/hub';
import { countOf, hubGroups, hubJumps, settingsSummary, useSwitches } from './_samples/hub-search';
import { SettingsHubDemo } from './_samples/SettingsHubDemo';
import './SearchResults.stories.css';

type ResultsArgs = {
  query: string;
  framed: boolean;
  idleMessage: string;
};

const FlatDemo = (props: ResultsArgs) => {
  const { framed, idleMessage } = props;
  const [query, setQuery] = useState(props.query);
  const [opened, setOpened] = useState('');
  const hits = useMemo(() => matchHub(query), [query]);
  return (
    <Box className="story-column">
      <SearchInput value={query} onChange={setQuery} placeholder="Search this hub" aria-label="Search this hub" />
      <Box className="search-results-story__frame">
        <SearchResults query={query} count={hits.length} hits={hits} onOpenHit={(hit) => setOpened(hit.label)} framed={framed} idleMessage={idleMessage} />
      </Box>
      <Text className="story-label">{opened ? `Opened ${opened}` : 'Try "se" or "players"'}</Text>
    </Box>
  );
};

const GroupedDemo = (props: { query: string; heading?: SearchResultsGroupHeading }) => {
  const { query, heading } = props;
  const switches = useSwitches();
  const [opened, setOpened] = useState('');
  const groups = hubGroups(query, switches);
  const count = countOf(groups);
  return (
    <Box className="story-column">
      <Box className="search-results-story__frame">
        <SearchResults
          framed
          query={query}
          count={count}
          summary={settingsSummary(count, query)}
          jumps={hubJumps(query)}
          onJump={setOpened}
          groups={groups}
          onOpenGroup={setOpened}
          groupHeading={heading}
        />
      </Box>
      <Text className="story-label">{opened ? `Opened ${opened}` : 'The chips and the group actions open a page'}</Text>
    </Box>
  );
};

const ARGS: Partial<ResultsArgs> = { query: 'se', framed: true, idleMessage: 'Type to search this hub.' };

const ARG_TYPES: StoryLiteArgTypes<ResultsArgs> = {
  query: { control: 'text' },
  framed: { control: 'boolean' },
  idleMessage: { control: 'text' },
};

const meta = {
  title: 'Composites · Navigation/SearchResults',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ResultsArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <FlatDemo key={args.query} {...args} />,
} satisfies StoryLiteStoryDefinition<ResultsArgs>;

const FixedHead = {
  name: 'Fixed head with page chips',
  render: () => <GroupedDemo query="s" />,
} satisfies StoryLiteStoryDefinition<ResultsArgs>;

const ButtonHeading = {
  name: 'Whole heading as a button',
  render: () => <GroupedDemo query="tray" heading="button" />,
} satisfies StoryLiteStoryDefinition<ResultsArgs>;

const Idle = {
  name: 'Idle, with the search spark',
  render: () => (
    <Box className="search-results-story__frame">
      <SearchResults framed query="" count={0} idleMessage="Type to search every setting, on every tab." />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<ResultsArgs>;

const ZeroMatches = {
  name: 'Zero matches, with a page chip',
  render: () => (
    <Box className="search-results-story__frame search-results-story__frame--short">
      <SearchResults
        framed
        query="overview"
        count={0}
        jumps={[{ id: 'home', label: 'Overview', icon: <Icon name="house" /> }]}
        emptyMessage="Try a shorter word, or the name of what the setting changes."
      />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<ResultsArgs>;

const InHub = {
  name: 'In a settings hub, one scroll',
  render: () => <SettingsHubDemo query="s" />,
} satisfies StoryLiteStoryDefinition<ResultsArgs>;

const renderState = (props: StateProps) => {
  const query = typeof props.query === 'string' ? props.query : 'se';
  const hits = matchHub(query);
  return (
    <Box className="search-results-story__state">
      <SearchResults query={query} count={hits.length} hits={hits} />
    </Box>
  );
};

const CODE = `import { NavLayout, SearchResults } from '@drizztdourden08/tessera';

<SearchResults query={query} count={hits.length} hits={hits} onOpenHit={openHit} />

<NavLayout nav={nav} paneScroll="none" results={(
  <SearchResults
    framed
    query={query}
    count={total}
    summary={\`\${total} settings match "\${query}"\`}
    jumps={pagesByName}
    onJump={openPage}
    groups={pagesWithRows.map((page) => ({ id: page.id, label: page.label, icon: page.icon, count: page.count, children: page.rows }))}
    onOpenGroup={openPage}
    openLabel="Open tab"
  />
)}>
  <CurrentSettingsPage />
</NavLayout>`;

const Overview = overviewStory({
  component: 'SearchResults',
  description: 'The results of a search inside a window. A fixed head holds the summary and a chip for each page whose name matches; the body below it scrolls. Hits are flat buttons with a detail line, or groups, one per page, that hold hits or any content, such as the matching settings rows. Reach for it in the pane of a NavLayout while its search runs. With no query it shows idleIcon above idleMessage; with no match it keeps the head and shows emptyMessage in the body. framed draws it on a panel.',
  points: [
    'groupHeading picks the group heading. split, the default, draws a glowing icon, the title, a count and an openLabel button on the right. button makes the whole heading one button.',
    'The chips read "Open" and the page name, from the string table. onJump gets the page id.',
    'It scrolls its own body, so NavLayout leaves the results unwrapped.',
  ],
  playground: Playground,
  variants: [FixedHead, ButtonHeading, Idle, ZeroMatches, InHub],
  states: {
    render: renderState,
    list: [
      { name: 'No query', props: { query: '' } },
      { name: 'Results', props: { query: 'se' } },
      { name: 'No match', props: { query: 'zebra' } },
    ],
  },
  code: CODE,
});

export default meta;
export { ButtonHeading, FixedHead, Idle, InHub, Overview, Playground, ZeroMatches };
