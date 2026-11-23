/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Flex, SegmentedBar } from '../../src/primitives';
import type { SegmentedBarSegment } from '../../src/primitives';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';

type SegmentedBarArgs = {
  label: string;
  done: number;
  pressable: boolean;
};

const TOTAL = 8;

const ARGS: Partial<SegmentedBarArgs> = { label: 'Checklist progress', done: 5, pressable: false };

const ARG_TYPES: PlaygroundArgTypes<SegmentedBarArgs> = {
  label: { group: 'Content', control: 'text', description: 'Names the bar for a screen reader.' },
  done: { group: 'Data', control: 'range', min: 0, max: TOTAL, step: 1, description: 'How many segments are filled.' },
  pressable: { group: 'Behaviour', control: 'boolean', description: 'Makes the whole bar a button.' },
};

const meta = {
  title: 'Primitives · Charts/SegmentedBar',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<SegmentedBarArgs>;

const progress = (done: number): readonly SegmentedBarSegment[] =>
  Array.from({ length: TOTAL }, (_, index) => ({
    tone: index < done ? 'success' : 'track',
    label: `Step ${index + 1}: ${index < done ? 'done' : 'to do'}`,
  }));

const MIXED: readonly SegmentedBarSegment[] = [
  { tone: 'success', label: 'Passed' },
  { tone: 'success', label: 'Passed' },
  { tone: 'warning', label: 'Skipped' },
  { tone: 'danger', label: 'Failed' },
  { tone: 'info', label: 'Running' },
  { tone: 'track', label: 'Waiting' },
];

const noop = () => undefined;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <SegmentedBar label={args.label} segments={progress(args.done)} onClick={args.pressable ? noop : undefined} />,
} satisfies PlaygroundStory<SegmentedBarArgs>;

const Tones = {
  name: 'Segments in different tones',
  render: () => <SegmentedBar label="Test run" segments={MIXED} />,
} satisfies StoryLiteStoryDefinition<SegmentedBarArgs>;

const Pressable = {
  name: 'A press on the whole bar',
  render: () => (
    <Flex direction="column" gap="md">
      <SegmentedBar label="Open the checklist" segments={progress(3)} onClick={noop} />
      <SegmentedBar label="Checklist, not pressable" segments={progress(3)} />
    </Flex>
  ),
} satisfies StoryLiteStoryDefinition<SegmentedBarArgs>;

const Overview = overviewStory({
  component: 'SegmentedBar',
  description: 'One bar of equal segments, each with its own tone, such as the steps of a checklist or the results of a run.',
  points: [
    '`segments` lists the parts in order; each has a `tone` and a `label` shown in its tooltip.',
    'Every segment has the same width, whatever its value; use StackedBar when sizes matter.',
    'The tone `track` draws an empty segment; the others are the status and tag colours.',
    '`label` names the whole bar for a screen reader.',
    '`onClick` makes the whole bar a keyboard button; without it the bar is a plain group.',
  ],
  playground: Playground,
  variants: [Tones, Pressable],
  code: `import { SegmentedBar } from '@drizztdourden08/tessera';

<SegmentedBar
  label="Checklist progress"
  segments={[
    { tone: 'success', label: 'Plan done' },
    { tone: 'success', label: 'Build done' },
    { tone: 'track', label: 'Review to do' },
  ]}
  onClick={openChecklist}
/>`,
});

export default meta;
export { Overview, Playground, Pressable, Tones };
