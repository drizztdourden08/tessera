/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { RampStrip } from '../../src/composites';
import type { RampSize } from '../../src/composites';
import { axis, Demonstrator, overviewStory, STATE, ValueReadout } from '../_template/value-story-kit';
import type { PlaygroundArgTypes, PlaygroundStory, StateProps } from '../_template/value-story-kit';
import { RampStripGapsDemo } from './_samples/RampStripGapsDemo';
import { BLUES, NAMED, UNUSED_STEPS } from './_samples/ramp-steps';

type RampStripArgs = {
  size: RampSize;
  numbered: boolean;
};

const ARGS: RampStripArgs = { size: 'preview', numbered: true };

const ARG_TYPES: PlaygroundArgTypes<RampStripArgs> = {
  size: { group: 'Appearance', control: 'select', options: ['sm', 'md', 'preview'], description: 'sm and md are control sized swatches; preview stretches the steps over the full width as tall blocks.' },
  numbered: { group: 'Appearance', control: 'boolean', description: 'Captions each step with its place in the ramp.' },
};

const meta = {
  title: 'Composites · Inputs/RampStrip',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<RampStripArgs>;

const StatefulRamp = (props: Partial<RampStripArgs> & { steps?: typeof BLUES; initial?: number | null }) => {
  const { steps = BLUES, initial = 3, size, numbered } = props;
  const [value, setValue] = useState<number | null>(initial);
  return (
    <ValueReadout value={value === null ? 'none' : `step ${String(value + 1)}`}>
      <RampStrip aria-label="Blue ramp" steps={steps} value={value} onChange={setValue} size={size} numbered={numbered} />
    </ValueReadout>
  );
};

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <StatefulRamp {...args} />,
} satisfies PlaygroundStory<RampStripArgs>;

const SIZES: readonly RampSize[] = ['sm', 'md', 'preview'];

const Sizes = {
  name: 'Sizes: small and medium swatches, and the large preview',
  render: () => <Demonstrator rows={axis(SIZES)} align="stretch" cell={(size) => <StatefulRamp size={size} numbered />} />,
} satisfies StoryLiteStoryDefinition<RampStripArgs>;

const Captions = {
  name: 'Captions: your own text on each step',
  render: () => <StatefulRamp steps={NAMED} size="preview" initial={1} />,
} satisfies StoryLiteStoryDefinition<RampStripArgs>;

const Unused = {
  name: 'Unused and disabled steps',
  render: () => (
    <StatefulRamp
      size="preview"
      numbered
      steps={UNUSED_STEPS}
    />
  ),
} satisfies StoryLiteStoryDefinition<RampStripArgs>;

const Several = {
  name: 'selected and onSelectionChange: Shift picks a range, Ctrl or Command toggles a step',
  render: () => <RampStripGapsDemo feature="multi" />,
} satisfies StoryLiteStoryDefinition<RampStripArgs>;

const Marked = {
  name: 'marks: small corner indicators on a step',
  render: () => <RampStripGapsDemo feature="marked" />,
} satisfies StoryLiteStoryDefinition<RampStripArgs>;

const Dragged = {
  name: 'onSwatchDragStart: every step can be dragged out with a payload',
  render: () => <RampStripGapsDemo feature="drag" />,
} satisfies StoryLiteStoryDefinition<RampStripArgs>;

const Menu = {
  name: 'swatchMenu: a context menu on each step, by right click or the menu key',
  render: () => <RampStripGapsDemo feature="menu" />,
} satisfies StoryLiteStoryDefinition<RampStripArgs>;

const renderState = (props: StateProps) => (
  <RampStrip
    aria-label="Blue ramp"
    steps={props.disabled === true ? BLUES.map((step) => ({ ...step, disabled: true })) : BLUES}
    value={props.selected === true ? 2 : null}
    onChange={() => undefined}
    numbered
  />
);

const CODE = `import { useState } from 'react';
import { RampStrip } from '@drizztdourden08/tessera';

const [step, setStep] = useState<number | null>(3);
<RampStrip aria-label="Blue ramp" steps={steps} value={step} onChange={setStep} numbered size="preview" />`;

const Overview = overviewStory({
  component: 'RampStrip',
  description: 'A row of swatches for one colour ramp, with a caption on each step and one step picked.',
  points: [
    'Pass `steps` with a `color` each, `value` as the picked index and `onChange`; the app keeps the pick.',
    'A step takes a `caption`, or `numbered` adds its place; `size` is sm, md or preview for tall blocks.',
    'Left, Right, Home and End move to the next open step and pick it; Tab enters on the picked one.',
    'A step can be `unused` (dashed and faded), `disabled` (skipped by the keys) or carry corner `marks`.',
    '`selected` with `onSelectionChange` picks several steps: Shift for a range, Ctrl or Command to toggle.',
    '`onSwatchDragStart` makes steps draggable; `swatchMenu` gives each step a context menu.',
  ],
  instead: '[ChoiceGrid] when the colours are a loose set and not an ordered ramp.',
  playground: Playground,
  variants: [Sizes, Captions, Unused, Several, Marked, Dragged, Menu],
  states: {
    render: renderState,
    list: [STATE.idle, STATE.selected, STATE.disabled],
  },
  code: CODE,
});

export default meta;
export { Captions, Dragged, Marked, Menu, Overview, Playground, Several, Sizes, Unused };
