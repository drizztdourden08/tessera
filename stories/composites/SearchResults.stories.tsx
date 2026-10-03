/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { SearchResults } from '../../src/composites';
import { Box, Icon, SearchInput, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import { searchLibrary } from './_samples/library-search';
import { SettingsResultsDemo } from './_samples/SettingsResultsDemo';
import './SearchResults.stories.css';

type ResultsArgs = {
  query: string;
  idleMessage: string;
};

const LiveDemo = (props: ResultsArgs) => {
  const { idleMessage } = props;
  const [query, setQuery] = useState(props.query);
  const [opened, setOpened] = useState('');
  return (
    <Box className="story-column">
      <SearchInput value={query} onChange={setQuery} placeholder="Search all settings" aria-label="Search all settings" />
      <Box className="search-results-story__frame">
        <SettingsResultsDemo query={query} onOpen={setOpened} idleMessage={idleMessage} />
      </Box>
      <Text className="story-label">{opened ? `Opened ${opened}` : 'The rows are the real controls; the chips and Open page open a page'}</Text>
    </Box>
  );
};

const HitsDemo = (props: { query: string }) => {
  const { query } = props;
  const groups = searchLibrary(query);
  return (
    <Box className="search-results-story__frame">
      <SearchResults query={query} count={groups.reduce((sum, group) => sum + (group.count ?? 0), 0)} groups={groups} onOpenHit={() => undefined} onOpenGroup={() => undefined} />
    </Box>
  );
};

const ARGS: Partial<ResultsArgs> = { query: 'o', idleMessage: 'Type to search every setting, on every page.' };

const ARG_TYPES: StoryLiteArgTypes<ResultsArgs> = {
  query: { control: 'text' },
  idleMessage: { control: 'text' },
};

const meta = {
  title: 'Composites · Lists/SearchResults',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ResultsArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <LiveDemo key={args.query} {...args} />,
} satisfies StoryLiteStoryDefinition<ResultsArgs>;

const LiveSettings = {
  name: 'Settings from every page, with their controls',
  render: () => <Box className="search-results-story__frame"><SettingsResultsDemo query="tray" /></Box>,
} satisfies StoryLiteStoryDefinition<ResultsArgs>;

const Hits = {
  name: 'Hits with their path',
  render: () => <HitsDemo query="pass" />,
} satisfies StoryLiteStoryDefinition<ResultsArgs>;

const Idle = {
  name: 'Idle, with the search glass',
  render: () => (
    <Box className="search-results-story__frame search-results-story__frame--short">
      <SearchResults query="" count={0} idleMessage="Type to search every setting, on every page." />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<ResultsArgs>;

const ZeroMatches = {
  name: 'No match, with a page chip',
  render: () => (
    <Box className="search-results-story__frame search-results-story__frame--short">
      <SearchResults
        query="overview"
        count={0}
        jumps={[{ id: 'home', label: 'Overview', icon: <Icon name="house" /> }]}
        emptyMessage="Try a shorter word, or the name of what the setting changes."
      />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<ResultsArgs>;

const renderState = (props: StateProps) => (
  <Box className="search-results-story__state">
    <SettingsResultsDemo query={typeof props.query === 'string' ? props.query : ''} />
  </Box>
);

const CODE = `import { filterSettingsSections, SearchResults, SettingsSection } from '@drizztdourden08/tessera';

<SearchResults
  query={query}
  count={total}
  summary={\`\${total} settings match "\${query}"\`}
  jumps={pagesNamedLikeTheQuery}
  onJump={openPage}
  groups={pages.map((page) => ({
    id: page.id,
    label: page.title,
    icon: page.icon,
    count: page.count,
    children: filterSettingsSections(page.sections, query).map((section) => <SettingsSection key={section.id} {...section} />),
  }))}
  onOpenGroup={openPage}
/>`;

const Overview = overviewStory({
  component: 'SearchResults',
  description: 'The pane a search fills, on the same card as a settings page so the two read as one surface. A fixed head holds the summary and a chip for each page whose name matches; the body under it scrolls. The body holds one SearchResultGroup per page: a glowing icon, the page name, a count and an Open page button, then what matched on that page. For settings, that is the matching rows with their real controls, drawn by SettingsSection from filterSettingsSections; for anything else, SearchResultHit rows with the match marked and their path. With no query it shows the search glass and idleMessage; with no match it keeps the head and shows emptyMessage. WorkspaceScreen builds all of this from its content.',
  points: [
    'The chips read "Open" and the page name, from the string table. onJump gets the page id.',
    'It scrolls its own body, so SideNavLayout leaves the results unwrapped.',
  ],
  playground: Playground,
  variants: [LiveSettings, Hits, Idle, ZeroMatches],
  states: {
    render: renderState,
    list: [
      { name: 'No query', props: { query: '' } },
      { name: 'Results', props: { query: 'volume' } },
      { name: 'No match', props: { query: 'zebra' } },
    ],
  },
  code: CODE,
});

export default meta;
export { Hits, Idle, LiveSettings, Overview, Playground, ZeroMatches };
