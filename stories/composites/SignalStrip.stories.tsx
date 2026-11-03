/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Box } from '../../src/primitives';
import { SignalStrip } from '../../src/composites';
import type { SignalItem } from '../../src/composites';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import './SignalStrip.stories.css';

type SignalStripArgs = { max: number; narrow: boolean };

const ARGS: SignalStripArgs = { max: 7, narrow: false };

const ARG_TYPES: PlaygroundArgTypes<SignalStripArgs> = {
  max: { group: 'Layout', control: 'range', min: 1, max: 7, step: 1, description: 'The most chips shown before the +N chip.' },
  narrow: { group: 'Layout', control: 'boolean', description: 'A narrow row, so the chips that do not fit fold into +N.' },
};

const meta = {
  title: 'Composites · Feedback/SignalStrip',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<SignalStripArgs>;

const open = (): undefined => undefined;

const ITEMS: readonly SignalItem[] = [
  { id: 'questions', icon: 'circle-help', count: 2, label: 'Open questions', tone: 'warning', onClick: open },
  { id: 'tests', icon: 'flask', count: 3, label: 'Failing tests', tone: 'danger', onClick: open },
  { id: 'deps', icon: 'link', count: 1, label: 'Waiting on dependencies', tone: 'info', onClick: open },
  { id: 'blocked', icon: 'triangle-alert', label: 'Blocked', tone: 'danger' },
  { id: 'quiet', icon: 'moon', label: 'Quiet for a day', tone: 'neutral' },
  { id: 'agent', icon: 'clock', count: 1, label: 'Agent running', tone: 'success' },
  { id: 'trail', icon: 'git-branch', count: 4, label: 'Trail depth', tone: 'neutral' },
];

const Frame = ({ narrow = false, items = ITEMS, max }: { narrow?: boolean; items?: readonly SignalItem[]; max?: number }) => (
  <Box className={narrow ? 'signal-story signal-story--narrow' : 'signal-story'}>
    <SignalStrip aria-label="Attention" items={items} max={max} />
  </Box>
);

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <Frame narrow={args.narrow} max={args.max} />,
} satisfies PlaygroundStory<SignalStripArgs>;

const Clickable = {
  name: 'Chips with onClick are buttons; the others are static',
  render: () => <Frame items={ITEMS.slice(0, 4)} />,
} satisfies StoryLiteStoryDefinition<SignalStripArgs>;

const Folded = {
  name: 'A narrow row folds what does not fit into +N',
  render: () => <Frame narrow />,
} satisfies StoryLiteStoryDefinition<SignalStripArgs>;

const Capped = {
  name: 'max 3: the rest folds even with room',
  render: () => <Frame max={3} />,
} satisfies StoryLiteStoryDefinition<SignalStripArgs>;

const Empty = {
  name: 'No items: nothing is rendered',
  render: () => <Frame items={[]} />,
} satisfies StoryLiteStoryDefinition<SignalStripArgs>;

const CODE = `import { SignalStrip } from '@drizztdourden08/tessera';

<SignalStrip
  aria-label="Attention"
  max={5}
  items={[
    { id: 'questions', icon: 'circle-help', count: 2, label: 'Open questions', tone: 'warning', onClick: openQuestions },
    { id: 'quiet', icon: 'moon', label: 'Quiet for a day', tone: 'neutral' },
  ]}
/>`;

const Overview = overviewStory({
  component: 'SignalStrip',
  description: 'One row of attention chips that never wraps and folds the overflow into a +N chip.',
  points: [
    '`items` take an `id`, an `icon`, a `label`, a `tone` and optionally a `count` and an `onClick`.',
    '`tone` is danger, warning, info, success or neutral; each chip shows its icon and count.',
    'An item with `onClick` is a button chip; without it the chip is static.',
    'What does not fit the width, or goes past `max`, folds into a +N chip; its tooltip lists the hidden labels.',
    'An empty `items` list renders nothing.',
  ],
  instead: '[Tag] for one label or state.',
  playground: Playground,
  variants: [Clickable, Folded, Capped, Empty],
  code: CODE,
});

export default meta;
export { Capped, Clickable, Empty, Folded, Overview, Playground };
