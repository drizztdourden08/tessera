/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { FactsPanel } from '../../src/composites';
import type { FactsPanelProps } from '../../src/composites';
import { Box, Text } from '../../src/primitives';
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

const Terms = {
  name: 'Terms and what they mean, inside cards',
  render: () => <FactsPanelTermCards />,
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
    '`layout` lays the facts `inline` along a line, as `rows`, or `boxed` in sunken rows.',
    '`layout="terms"` drops the box for a list of terms, each label in gold with its colon, then its value.',
    '`mono` sets the monospace font; `copyable` draws the value as a [CopyValue], copying it or the string given.',
    'A long value is cut short; its `title` shows the full text in a tooltip.',
    '[Hero] draws its facts with it, on glass.',
  ],
  playground: Playground,
  variants: [TwoGroups, OneGroup, Layouts, Terms],
  code: CODE,
});

export default meta;
export { Layouts, OneGroup, Overview, Playground, Terms, TwoGroups };
