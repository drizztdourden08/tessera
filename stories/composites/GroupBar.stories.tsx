/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { GroupBarDemo } from './_samples/GroupBarDemo';

type GroupBarArgs = { maxLevels: number };

const ARGS: Partial<GroupBarArgs> = { maxLevels: 3 };

const ARG_TYPES: PlaygroundArgTypes<GroupBarArgs> = {
  maxLevels: { group: 'Behaviour', control: 'range', min: 1, max: 3, step: 1, description: 'The most grouping levels the bar allows.' },
};

const meta = {
  title: 'Composites · Data views/GroupBar',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<GroupBarArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <GroupBarDemo maxLevels={args.maxLevels} />,
} satisfies PlaygroundStory<GroupBarArgs>;

const OneLevel = {
  name: 'maxLevels 1: the Add group button goes once a grouping is set',
  render: () => <GroupBarDemo maxLevels={1} />,
} satisfies StoryLiteStoryDefinition<GroupBarArgs>;

const Chosen = {
  name: 'Two levels already set',
  render: () => <GroupBarDemo startWith={['game', 'status']} />,
} satisfies StoryLiteStoryDefinition<GroupBarArgs>;

const BesideFilterBar = {
  name: 'Beside a FilterBar: both sit on one centre line',
  render: () => <GroupBarDemo beside startWith={['game']} />,
} satisfies StoryLiteStoryDefinition<GroupBarArgs>;

const CODE = `import { GroupBar } from '@drizztdourden08/tessera';

const [levels, setLevels] = useState<string[]>([]);

<GroupBar
  options={[{ id: 'status', label: 'Status' }, { id: 'owner', label: 'Owner' }]}
  value={levels}
  onChange={setLevels}
  maxLevels={2}
/>`;

const Overview = overviewStory({
  component: 'GroupBar',
  description: 'Group by chips for a list, added with a plus button and removed with an x, like the filter chips.',
  points: [
    '`value` holds the ordered ids, outermost group first; `onChange` reports the next list.',
    'It starts empty, with only an Add group button that lists the fields not used yet.',
    '`maxLevels` caps the levels; at the cap, or with every field used, the button is not drawn.',
    'Each chip has the same look and height as a FilterBar chip, so the two sit side by side.',
    '**It groups nothing itself:** your list reads the ids and builds the sections.',
  ],
  playground: Playground,
  variants: [OneLevel, Chosen, BesideFilterBar],
  code: CODE,
});

export default meta;
export { BesideFilterBar, Chosen, OneLevel, Overview, Playground };
