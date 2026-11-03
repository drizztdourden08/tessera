/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { ToggleSweepDemo } from './_samples/ToggleSweepDemo';
import './ToggleSweep.stories.css';

type ToggleSweepArgs = {
  count: number;
  ordered: boolean;
  plainOnly: boolean;
  grouped: boolean;
};

const ARGS: Partial<ToggleSweepArgs> = { count: 8, ordered: true, plainOnly: false, grouped: false };

const ARG_TYPES: PlaygroundArgTypes<ToggleSweepArgs> = {
  count: { group: 'Content', control: 'range', min: 3, max: 20, step: 1, description: 'How many toggles the column holds.' },
  ordered: { group: 'Behaviour', control: 'boolean', description: 'Pass order, so a fast drag also sets the rows it skipped.' },
  plainOnly: { group: 'Behaviour', control: 'boolean', description: 'startWhen: a press with Ctrl or Command held starts no sweep and clicks as usual.' },
  grouped: { group: 'Behaviour', control: 'boolean', description: 'expandStart: pressing Layer 2, 3 or 4 sets all three together.' },
};

const meta = {
  title: 'Composites · Data views/ToggleSweep',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ToggleSweepArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <ToggleSweepDemo count={args.count} ordered={args.ordered} plainOnly={args.plainOnly} grouped={args.grouped} />,
} satisfies PlaygroundStory<ToggleSweepArgs>;

const Column = {
  name: 'A column of toggles: press one and drag over the others',
  render: () => <ToggleSweepDemo count={8} ordered />,
} satisfies StoryLiteStoryDefinition<ToggleSweepArgs>;

const Unordered = {
  name: 'Without order: only the rows the pointer touches are set',
  render: () => <ToggleSweepDemo count={8} ordered={false} />,
} satisfies StoryLiteStoryDefinition<ToggleSweepArgs>;

const Modifiers = {
  name: 'startWhen: a press with Ctrl held starts no sweep and the toggle clicks as usual',
  render: () => <ToggleSweepDemo count={8} ordered plainOnly />,
} satisfies StoryLiteStoryDefinition<ToggleSweepArgs>;

const Grouped = {
  name: 'expandStart: pressing a picked layer sets all the picked layers',
  render: () => <ToggleSweepDemo count={8} ordered grouped />,
} satisfies StoryLiteStoryDefinition<ToggleSweepArgs>;

const CODE = `import { useToggleSweep } from '@drizztdourden08/tessera';

const sweep = useToggleSweep({ order: ids, onEnd: (keys, value) => setHidden(keys, value) });

<Box {...sweep.bind(id, hidden.has(id))}>
  <Toggle label={id} checked={sweep.touched.includes(id) ? sweep.value === true : hidden.has(id)} onChange={(value) => setHidden([id], value)} />
</Box>`;

const Overview = overviewStory({
  component: 'ToggleSweep',
  importName: 'useToggleSweep',
  description: 'Press one toggle and drag over the others: they all take the value the first one got.',
  points: [
    '`bind(key, current)` goes on the element around each toggle; the first press sets the opposite value.',
    '`onEnd(keys, value)` runs once when the drag ends, with all the keys: one change, one undo step.',
    '`touched` and `value` show the keys reached so far while the drag runs; `onSet` is the live option.',
    '`order` lists the keys as shown, so a fast drag also sets the rows it skipped.',
    '`startWhen(event)` limits which presses start a sweep; `expandStart(key)` widens the start to a set of keys.',
    'The key press of each toggle still works, since the drag is not the only way to switch.',
  ],
  instead: '[Toggle] for one switch, or [MarqueeBox] to pick items by a rectangle.',
  playground: Playground,
  variants: [Column, Unordered, Modifiers, Grouped],
  code: CODE,
});

export default meta;
export { Column, Grouped, Modifiers, Overview, Playground, Unordered };
