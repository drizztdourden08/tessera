/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { FactsPanel } from '../../src/composites';
import { overviewStory } from '../_template/overview-story';
import { BUILD_FACTS, PROFILE_FACTS } from './_samples/data-facts';

type FactsArgs = {
  label: string;
  secondGroup: boolean;
};

const ARGS: Partial<FactsArgs> = { label: 'Profile', secondGroup: true };

const ARG_TYPES: PlaygroundArgTypes<FactsArgs> = {
  label: { group: 'Content', control: 'text', description: 'The accessible name of the panel.' },
  secondGroup: { group: 'Content', control: 'boolean', description: 'Adds the second group under a hairline.' },
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
} satisfies PlaygroundStory<FactsArgs>;

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
  description: 'A bordered box of label and value pairs, for the facts about one thing, such as a profile, a save or a build.',
  points: [
    '`groups` holds the facts; each group runs along one row, with a hairline between groups.',
    '`mono` sets a value in the monospace font, for a seed or an address.',
    'A long value is cut short; its `title` shows the full text in a tooltip.',
    '[Hero] draws its facts with it, on glass.',
  ],
  playground: Playground,
  variants: [TwoGroups, OneGroup],
  code: CODE,
});

export default meta;
export { OneGroup, Overview, Playground, TwoGroups };
