/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { RampStrip } from '../../src/composites';
import type { RampSize } from '../../src/composites';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { ValueReadout } from '../_template/ValueReadout';
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
    'Each step can carry a `caption`; `numbered` fills the rest with the step number from 1.',
    '`size` is sm or md for control sized swatches, or preview for tall blocks across the full width.',
    'Left, Right, Home and End move to the next open step and pick it; Tab enters on the picked one.',
    'A step can be `unused` (dashed and faded) or `disabled` (skipped by the keys).',
  ],
  instead: '[ChoiceGrid] when the colours are a loose set and not an ordered ramp.',
  playground: Playground,
  variants: [Sizes, Captions, Unused],
  states: {
    render: renderState,
    list: [STATE.idle, STATE.selected, STATE.disabled],
  },
  code: CODE,
});

export default meta;
export { Captions, Overview, Playground, Sizes, Unused };
