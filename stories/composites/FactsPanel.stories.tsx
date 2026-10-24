/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { FactsPanel } from '../../src/composites';
import type { FactsPanelLayout, FactsPanelProps } from '../../src/composites';
import { Box, Card, Text } from '../../src/primitives';
import type { StatRowAlign } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { BUILD_FACTS, PROFILE_FACTS, SERVER_FACTS } from './_samples/data-facts';
import { FactsPanelTermCards } from './_samples/FactsPanelTermCards';

type FactsArgs = {
  label: string;
  secondGroup: boolean;
  layout: NonNullable<FactsPanelProps['layout']>;
};

const ARGS: Partial<FactsArgs> = { label: 'Profile', secondGroup: true, layout: 'inline' };

const ARG_TYPES: PlaygroundArgTypes<FactsArgs> = {
  label: { group: 'Content', control: 'text', description: 'The accessible name of the panel.' },
  secondGroup: { group: 'Content', control: 'boolean', description: 'Adds the second group under a hairline.' },
  layout: { group: 'Layout', control: 'select', options: ['inline', 'rows', 'boxed', 'terms'], description: 'Facts along a line, one per row, one per sunken box, or terms and what they mean.' },
};

const meta = {
  title: 'Composites · Content/FactsPanel',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<FactsArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <FactsPanel label={args.label || undefined} layout={args.layout} groups={args.secondGroup ? PROFILE_FACTS : PROFILE_FACTS.slice(0, 1)} />
  ),
} satisfies PlaygroundStory<FactsArgs>;

const TwoGroups = {
  name: 'Two groups under a hairline',
  render: () => <FactsPanel label="Profile" groups={PROFILE_FACTS} />,
} satisfies StoryLiteStoryDefinition<FactsArgs>;

const OneGroup = {
  name: 'One group',
  render: () => <FactsPanel label="Build" groups={BUILD_FACTS} />,
} satisfies StoryLiteStoryDefinition<FactsArgs>;

const LAYOUTS = ['inline', 'rows', 'boxed'] as const;

const Layouts = {
  name: 'Layouts, with copyable values',
  render: () => (
    <Box className="story-column">
      {LAYOUTS.map((layout) => (
        <Box key={layout} className="story-column">
          <Text className="story-label">{`layout="${layout}"`}</Text>
          <FactsPanel label={`Server, ${layout}`} layout={layout} groups={SERVER_FACTS} />
        </Box>
      ))}
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<FactsArgs>;

const ALIGNED: readonly { layout: FactsPanelLayout; align?: StatRowAlign; note: string }[] = [
  { layout: 'rows', note: 'layout="rows": each row stops at 512 px' },
  { layout: 'rows', align: 'end', note: 'layout="rows" align="end": each value on the right edge of the panel' },
  { layout: 'boxed', align: 'end', note: 'layout="boxed" align="end"' },
  { layout: 'inline', align: 'end', note: 'layout="inline" align="end": one fact per row' },
  { layout: 'terms', align: 'end', note: 'layout="terms" align="end"' },
];

const ValuesAtTheEnd = {
  name: 'Values on the right edge',
  render: () => (
    <Box className="story-column">
      {ALIGNED.map((entry) => (
        <Box key={entry.note} className="story-column">
          <Text className="story-label">{entry.note}</Text>
          <FactsPanel label={`Profile, ${entry.note}`} layout={entry.layout} align={entry.align} groups={PROFILE_FACTS} />
        </Box>
      ))}
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<FactsArgs>;

const Terms = {
  name: 'Terms and what they mean, inside cards',
  render: () => <FactsPanelTermCards />,
} satisfies StoryLiteStoryDefinition<FactsArgs>;

const FramelessInACard = {
  name: 'Rows inside a Card, frameless',
  render: () => (
    <Card title="Server">
      <FactsPanel label="Server, frameless" layout="rows" framed={false} groups={SERVER_FACTS} />
    </Card>
  ),
} satisfies StoryLiteStoryDefinition<FactsArgs>;

const CODE = `import { FactsPanel } from '@drizztdourden08/tessera';

<FactsPanel
  label="Profile"
  groups={[
    [
      { label: 'Game', value: 'A Link to the Past (USA).sfc', title: romPath },
      { label: 'Last played', value: '2 hours ago' },
    ],
    [
      { label: 'Seed', value: 'K7Q2-M9XA', mono: true },
      { label: 'Slot', value: 'Link' },
    ],
  ]}
/>`;

const Overview = overviewStory({
  component: 'FactsPanel',
  description: 'A bordered box of label and value pairs, for the facts about one thing, such as a profile, a save or a build.',
  points: [
    '`groups` holds the facts; each group runs along one row, with a hairline between groups.',
    '`layout` lays facts `inline` along a line, as `rows` or `boxed` in sunken rows.',
    '`align="end"` sets each label on the left and its value on the right edge of the panel, one fact per row.',
    '`layout="terms"` drops the box for a list of terms, each label in gold with its colon, then its value.',
    '`framed={false}` drops border, background and padding, so the panel sits in a [Card] without a second box.',
    '`mono` sets the monospace font; `copyable` draws a [CopyValue]; a cut value shows its `title` in a tooltip.',
  ],
  playground: Playground,
  variants: [TwoGroups, OneGroup, Layouts, ValuesAtTheEnd, Terms, FramelessInACard],
  code: CODE,
});

export default meta;
export { FramelessInACard, Layouts, OneGroup, Overview, Playground, Terms, TwoGroups, ValuesAtTheEnd };
