/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { SortControlDemo } from './_samples/SortControlDemo';

type SortControlArgs = {
  label: string;
  direction: 'asc' | 'desc';
};

const ARGS: Partial<SortControlArgs> = { label: 'Sort', direction: 'asc' };

const ARG_TYPES: PlaygroundArgTypes<SortControlArgs> = {
  label: { group: 'Content', control: 'text', description: 'The word on the menu button.' },
  direction: { group: 'Value', control: 'select', options: ['asc', 'desc'], description: 'The starting direction.' },
};

const meta = {
  title: 'Composites · Data views/SortControl',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<SortControlArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <SortControlDemo key={args.direction} start={{ key: 'name', direction: args.direction }} label={args.label} />,
} satisfies PlaygroundStory<SortControlArgs>;

const DefaultOrder = {
  name: 'No field chosen: the default order',
  render: () => <SortControlDemo start={{ key: null, direction: 'asc' }} />,
} satisfies StoryLiteStoryDefinition<SortControlArgs>;

const Descending = {
  name: 'Newest first',
  render: () => <SortControlDemo start={{ key: 'updated', direction: 'desc' }} />,
} satisfies StoryLiteStoryDefinition<SortControlArgs>;

const CODE = `import { SortControl } from '@drizztdourden08/tessera';

const [sort, setSort] = useState<SortState>({ key: 'name', direction: 'asc' });

<SortControl
  options={[{ id: 'name', label: 'Name' }, { id: 'updated', label: 'Last updated' }]}
  value={sort}
  onChange={setSort}
/>`;

const Overview = overviewStory({
  component: 'SortControl',
  description: 'A menu that picks the field a list is sorted by, with one button that flips the direction.',
  points: [
    '`value` holds a `key` and a `direction`; `onChange` reports the next sort.',
    'A `null` key means the default order; the direction button still flips the direction.',
    '`options` are id and label pairs, shown as radio items in a keyboard menu.',
    'The direction button is named by the sort it switches to, such as Sort descending.',
    '**It sorts nothing itself:** your list reads the state and orders its rows.',
  ],
  playground: Playground,
  variants: [DefaultOrder, Descending],
  code: CODE,
});

export default meta;
export { DefaultOrder, Descending, Overview, Playground };
