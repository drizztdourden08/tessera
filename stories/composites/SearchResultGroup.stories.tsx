/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { filterSettingsSections, SearchResultGroup, SearchResultHit, SettingsSection } from '../../src/composites';
import { Box, Icon } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { audioSections } from './_samples/settings-sample-sections';
import { useSampleSettings } from './_samples/settings-sample-state';

type GroupArgs = {
  label: string;
  count: number;
  withOpen: boolean;
};

const LiveRows = (props: GroupArgs) => {
  const { label, count, withOpen } = props;
  const sections = filterSettingsSections(audioSections(useSampleSettings()), 'volume');
  return (
    <Box className="story-column">
      <SearchResultGroup label={label} icon={<Icon name="volume-2" />} count={count} onOpen={withOpen ? () => undefined : undefined}>
        {sections.map((section) => <SettingsSection key={section.id} {...section} />)}
      </SearchResultGroup>
    </Box>
  );
};

const ARGS: Partial<GroupArgs> = { label: 'Audio', count: 1, withOpen: true };

const ARG_TYPES: PlaygroundArgTypes<GroupArgs> = {
  label: { group: 'Content', control: 'text' },
  count: { group: 'Content', control: 'number' },
  withOpen: { group: 'Content', control: 'boolean', description: 'The Open page button on the right of the heading.' },
};

const meta = {
  title: 'Composites · Lists/SearchResultGroup',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<GroupArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <LiveRows {...args} />,
} satisfies PlaygroundStory<GroupArgs>;

const WithHits = {
  name: 'Holding hits',
  render: () => (
    <Box className="story-column">
      <SearchResultGroup label="Guides" icon={<Icon name="globe" />} count={2} onOpen={() => undefined}>
        <SearchResultHit label="Open a port" description="Players reach your session on the port you pick." path={['Guides', 'Hosting']} query="port" />
        <SearchResultHit label="Use the relay" description="When the port is closed, the relay server carries the traffic." path={['Guides', 'Hosting']} query="port" />
      </SearchResultGroup>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<GroupArgs>;

const Bare = {
  name: 'No icon, no count',
  render: () => (
    <Box className="story-column">
      <SearchResultGroup label="Other matches">
        <SearchResultHit label="Data folder" path={['General']} query="data" />
      </SearchResultGroup>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<GroupArgs>;

const Overview = overviewStory({
  component: 'SearchResultGroup',
  description: 'One group in the search results, most often one page: the page icon with its glow, the page name, a pill with how many matches it holds and an Open page button at the far end, then the matches themselves. It takes any content: the live rows of a SettingsSection, or SearchResultHit rows. SearchResults draws one per entry of its groups; use it alone to build a results pane of your own. It carries data-group with its id, so a test or a tour can find it.',
  playground: Playground,
  variants: [WithHits, Bare],
});

export default meta;
export { Bare, Overview, Playground, WithHits };
