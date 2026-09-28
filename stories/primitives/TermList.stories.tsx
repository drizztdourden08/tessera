/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, Card, Stack, TermList, Text } from '../../src/primitives';
import type { TermListItem } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';

type TermListArgs = {
  entries: string;
};

const SHORTCUTS: readonly TermListItem[] = [
  { term: 'F1', detail: 'Save to the current slot' },
  { term: 'F2', detail: 'Load from the current slot' },
  { term: 'F5', detail: 'Reset the game' },
  { term: 'Tab', detail: 'Hold to fast forward' },
  { term: 'Ctrl + M', detail: 'Mute or unmute audio' },
];

const RELEASE_MODES: readonly TermListItem[] = [
  { term: 'Auto', detail: 'Remaining items go out when a player finishes their goal.' },
  { term: 'Manual', detail: 'A finished player sends their items with a command.' },
  { term: 'Disabled', detail: 'Items stay put until each player collects them in their own world.' },
];

const parseLine = (line: string): TermListItem[] => {
  const [term = '', ...rest] = line.split(':');
  return rest.length > 0 && term.trim() !== '' ? [{ term: term.trim(), detail: rest.join(':').trim() }] : [];
};

const parseEntries = (text: string): TermListItem[] => text.split('\n').flatMap(parseLine);

const ARGS: Partial<TermListArgs> = { entries: SHORTCUTS.map(({ term, detail }) => `${term}: ${detail}`).join('\n') };

const ARG_TYPES: StoryLiteArgTypes<TermListArgs> = {
    entries: { control: 'textarea', description: 'One entry per line, as "term: detail".' },
  };

const meta = {
  title: 'Primitives · Display/TermList',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<TermListArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <TermList items={parseEntries(args.entries)} />,
} satisfies StoryLiteStoryDefinition<TermListArgs>;

const InCards = {
  name: 'Inside cards',
  render: () => (
    <Box className="story-column">
      <Card>
        <Stack gap="sm">
          <Text variant="title">Keyboard shortcuts</Text>
          <TermList items={SHORTCUTS} />
        </Stack>
      </Card>
      <Card>
        <Stack gap="sm">
          <Text variant="title">Release modes</Text>
          <TermList items={RELEASE_MODES} />
        </Stack>
      </Card>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<TermListArgs>;

const Overview = overviewStory({
  component: 'TermList',
  description: 'A short list of terms and what they mean, one entry per line. Use it for keyboard shortcuts, modes or any key and its meaning. Each term leads in gold with its colon, and the detail follows in the surrounding text colour. It is a real definition list, and it takes its size and colour from the parent.',
  playground: Playground,
  variants: [InCards],
});

export default meta;
export { InCards, Overview, Playground };
