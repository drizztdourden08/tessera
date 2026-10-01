/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { FactsPanel } from '../../src/composites';
import { overviewStory } from '../_template/overview-story';
import { BUILD_FACTS, PROFILE_FACTS } from './_samples/data-facts';

type FactsArgs = {
  label: string;
  secondGroup: boolean;
};

const ARGS: Partial<FactsArgs> = { label: 'Profile', secondGroup: true };

const ARG_TYPES: StoryLiteArgTypes<FactsArgs> = {
  label: { control: 'text', description: 'The accessible name of the panel.' },
  secondGroup: { control: 'boolean', description: 'Adds the second group under a hairline.' },
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
    <FactsPanel label={args.label || undefined} groups={args.secondGroup ? PROFILE_FACTS : PROFILE_FACTS.slice(0, 1)} />
  ),
} satisfies StoryLiteStoryDefinition<FactsArgs>;

const TwoGroups = {
  name: 'Two groups under a hairline',
  render: () => <FactsPanel label="Profile" groups={PROFILE_FACTS} />,
} satisfies StoryLiteStoryDefinition<FactsArgs>;

const OneGroup = {
  name: 'One group',
  render: () => <FactsPanel label="Build" groups={BUILD_FACTS} />,
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
  description: 'A bordered box of label and value pairs, for the facts about one thing: a profile, a save, a build. Facts come in groups; each group runs along one row and wraps when the row is full, with a hairline between groups. Labels are small capitals in a muted tone and values follow them. mono sets a value in the monospace font, for a seed or an address. A long value is cut short; give it a title and the full text shows in a tooltip. Hero draws its facts with it, on glass.',
  playground: Playground,
  variants: [TwoGroups, OneGroup],
  code: CODE,
});

export default meta;
export { OneGroup, Overview, Playground, TwoGroups };
