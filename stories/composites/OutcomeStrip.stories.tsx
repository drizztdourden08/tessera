/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { OutcomeStrip } from '../../src/composites';
import type { OutcomeKind, OutcomeSize, OutcomeStep } from '../../src/composites';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { ValueReadout } from '../_template/ValueReadout';

type OutcomeStripArgs = { size: OutcomeSize; selectable: boolean };

const ARGS: OutcomeStripArgs = { size: 'sm', selectable: true };

const ARG_TYPES: PlaygroundArgTypes<OutcomeStripArgs> = {
  size: { group: 'Appearance', control: 'select', options: ['xs', 'sm'], description: 'xs is for a card and sm is for a runner.' },
  selectable: { group: 'Behaviour', control: 'boolean', description: 'Gives onSelect, so every cell is a button.' },
};

const meta = {
  title: 'Composites · Feedback/OutcomeStrip',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<OutcomeStripArgs>;

const OUTCOMES: readonly OutcomeKind[] = ['pass', 'pass', 'fail', 'partial', 'blocked', 'skip', 'current', 'pending', 'pending', 'pending'];

const STEPS: readonly OutcomeStep[] = OUTCOMES.map((outcome, index) => ({ id: `t${String(index + 1)}`, outcome, label: `Case ${String(index + 1)}: ${outcome}` }));

const Picking = ({ size, selectable = true }: { size?: OutcomeSize; selectable?: boolean }) => {
  const [picked, setPicked] = useState('none');
  return (
    <ValueReadout value={picked}>
      <OutcomeStrip aria-label="Test plan" steps={STEPS} size={size} onSelect={selectable ? setPicked : undefined} />
    </ValueReadout>
  );
};

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <Picking size={args.size} selectable={args.selectable} />,
} satisfies PlaygroundStory<OutcomeStripArgs>;

const Card = {
  name: 'xs: the small strip of a card',
  render: () => <Picking size="xs" />,
} satisfies StoryLiteStoryDefinition<OutcomeStripArgs>;

const Runner = {
  name: 'sm: the strip of the runner, arrows move between cells',
  render: () => <Picking size="sm" />,
} satisfies StoryLiteStoryDefinition<OutcomeStripArgs>;

const Static = {
  name: 'Without onSelect the cells are static',
  render: () => <Picking selectable={false} />,
} satisfies StoryLiteStoryDefinition<OutcomeStripArgs>;

const CODE = `import { OutcomeStrip } from '@drizztdourden08/tessera';

<OutcomeStrip
  aria-label="Test plan"
  size="sm"
  steps={[
    { id: 't1', outcome: 'pass', label: 'Sign in' },
    { id: 't2', outcome: 'fail', label: 'Reset password' },
    { id: 't3', outcome: 'current', label: 'Change email' },
  ]}
  onSelect={openStep}
/>`;

const Overview = overviewStory({
  component: 'OutcomeStrip',
  description: 'One toned cell per step of a test plan, with the current step outlined.',
  points: [
    '`steps` take an `id`, an `outcome` and a `label`; the app keeps the state.',
    '`outcome` is pass, fail, partial, blocked, skip, pending or current; each is toned, and current is outlined.',
    'The label shows in a tooltip on hover and focus.',
    '`size` is xs for a card or sm for a runner.',
    '`onSelect` makes each cell a button; the arrow keys move between cells.',
  ],
  instead: '[Stepper] for the numbered stages of one task.',
  playground: Playground,
  variants: [Card, Runner, Static],
  code: CODE,
});

export default meta;
export { Card, Overview, Playground, Runner, Static };
