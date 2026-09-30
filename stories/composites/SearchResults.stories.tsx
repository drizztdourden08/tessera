/* @layer stories @kind story */
import { useMemo, useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { SearchResults, SettingsGroupList } from '../../src/composites';
import type { SearchResultsGroup, SearchResultsJump } from '../../src/composites';
import { Box, Icon, Text, TextInput } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import { matchHub } from './_samples/hub';
import { useSettingsSample } from './_samples/settings-list';

type ResultsArgs = {
  query: string;
  framed: boolean;
  idleMessage: string;
};

const JUMPS: readonly SearchResultsJump[] = [
  { id: 'window', label: 'Window', icon: <Icon name="monitor" /> },
  { id: 'sound', label: 'Sound', icon: <Icon name="volume-2" /> },
];

const FlatDemo = (props: ResultsArgs) => {
  const { framed, idleMessage } = props;
  const [query, setQuery] = useState(props.query);
  const [opened, setOpened] = useState('');
  const hits = useMemo(() => matchHub(query), [query]);
  return (
    <Box className="story-column">
      <TextInput value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search this hub" aria-label="Search this hub" />
      <SearchResults query={query} count={hits.length} hits={hits} onOpenHit={(hit) => setOpened(hit.label)} framed={framed} idleMessage={idleMessage} />
      <Text className="story-label">{opened ? `Opened ${opened}` : 'Try "se" or "players"'}</Text>
    </Box>
  );
};

const GroupedDemo = () => {
  const sections = useSettingsSample();
  const [opened, setOpened] = useState('');
  const groups: SearchResultsGroup[] = [
    { id: 'window', label: 'Window', icon: <Icon name="monitor" />, count: 2, children: <SettingsGroupList sections={sections.slice(0, 1)} /> },
  ];
  return (
    <Box className="story-column">
      <SearchResults
        framed
        query="tray"
        count={2}
        summary={'2 settings match "tray"'}
        jumps={JUMPS.slice(0, 1)}
        onJump={setOpened}
        groups={groups}
        onOpenGroup={setOpened}
      />
      <Text className="story-label">{opened ? `Opened ${opened}` : 'The jump buttons and group headings open a page'}</Text>
    </Box>
  );
};

const ARGS: Partial<ResultsArgs> = { query: 'se', framed: false, idleMessage: 'Type to search this hub.' };

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

const Grouped = {
  name: 'Grouped, framed, with jumps',
  render: () => <GroupedDemo />,
} satisfies StoryLiteStoryDefinition<ResultsArgs>;

const JumpsOnly = {
  name: 'Page names only',
  render: () => <SearchResults query="sound" count={0} summary={'0 settings match "sound"'} jumps={JUMPS.slice(1)} />,
} satisfies StoryLiteStoryDefinition<ResultsArgs>;

const renderState = (props: StateProps) => {
  const query = typeof props.query === 'string' ? props.query : 'se';
  const hits = matchHub(query);
  return <SearchResults query={query} count={hits.length} hits={hits} />;
};

const CODE = `import { SearchResults } from '@drizztdourden08/tessera';

<SearchResults
  query={query}
  count={hits.length}
  hits={hits}
  onOpenHit={openHit}
/>

<SearchResults
  framed
  query={query}
  count={total}
  summary={\`\${total} settings match "\${query}"\`}
  jumps={pagesByName}
  onJump={openPage}
  groups={pagesWithRows.map((page) => ({ id: page.id, label: page.label, icon: page.icon, count: page.count, children: page.rows }))}
  onOpenGroup={openPage}
/>`;

const Overview = overviewStory({
  component: 'SearchResults',
  description: 'The results of a search inside a window: a count, jump buttons to pages whose names match, and the hits, flat or grouped under a heading per page. Reach for it in the pane of a NavLayout while its search runs. Flat hits are buttons with a detail line; a group heading shows the page icon, its name and a count, and holds hits or any content, such as the matching settings rows. Before a query it shows idleMessage, and when nothing matches it says so. framed draws it on a panel.',
  playground: Playground,
  variants: [Grouped, JumpsOnly],
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
export { Grouped, JumpsOnly, Overview, Playground };
