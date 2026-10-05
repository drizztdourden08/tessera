/* @layer stories @kind story */
import { useState } from 'react';
import type { ReactNode } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { SIZE_ARG } from '../_template/control-sizes.constants';
import { sizesStory } from '../_template/sizes-story';
import { Box, Field, NumberInput, Text, type ControlSize, type NumberInputButtons } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';

type NumberInputArgs = {
  min: number;
  max: number;
  step: number;
  disabled: boolean;
  buttons: NumberInputButtons;
  sizeToContent: boolean;
  size: ControlSize;
};

const ARGS: Partial<NumberInputArgs> = { min: 0, max: 100, step: 5, disabled: false, buttons: 'stacked', sizeToContent: true, size: 'md' };

const ARG_TYPES: PlaygroundArgTypes<NumberInputArgs> = {
    min: { group: 'Value', control: 'number' },
    max: { group: 'Value', control: 'number' },
    step: { group: 'Value', control: 'number' },
    buttons: { group: 'Layout', control: 'select', options: ['stacked', 'sides'], description: 'Stacked at the end, or a minus and a plus on either side.' },
    sizeToContent: { group: 'Layout', control: 'boolean' },
    disabled: { group: 'State', control: 'boolean' },
    size: SIZE_ARG,
  };

const meta = {
  title: 'Primitives · Inputs/NumberInput',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<NumberInputArgs>;

const StatefulNumber = (props: { initial: number } & Partial<NumberInputArgs>) => {
  const { initial, min, max, step, disabled, buttons, sizeToContent, size } = props;
  const [value, setValue] = useState(initial);
  return (
    <Box className="story-row">
      <NumberInput
        value={Number.isNaN(value) ? '' : value}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        buttons={buttons}
        sizeToContent={sizeToContent}
        size={size}
        onChange={setValue}
      />
      <Text className="story-label">Value: {Number.isNaN(value) ? '(empty)' : value}</Text>
    </Box>
  );
};

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Box className="story-column">
      <Text className="story-label">Hint cost, percent of rupees</Text>
      <StatefulNumber initial={25} {...args} />
    </Box>
  ),
} satisfies PlaygroundStory<NumberInputArgs>;

const SIZINGS: Readonly<Record<string, ReactNode>> = {
  'sized to max 100': <StatefulNumber initial={25} min={0} max={100} step={5} sizeToContent />,
  'sized to max 9999': <StatefulNumber initial={300} min={0} max={9999} sizeToContent />,
  'fractional step, game speed': <StatefulNumber initial={1.5} min={0.25} max={10} step={0.25} sizeToContent />,
  'fills the row': <StatefulNumber initial={3} min={1} max={8} />,
};

const Sizing = {
  name: 'Sizing',
  render: () => <Demonstrator rows={axis(Object.keys(SIZINGS))} align="stretch" cell={(row) => SIZINGS[row]} />,
} satisfies StoryLiteStoryDefinition<NumberInputArgs>;

const TurnTimer = (props: { size: ControlSize }) => {
  const { size } = props;
  const [seconds, setSeconds] = useState(45);
  return (
    <NumberInput
      value={Number.isNaN(seconds) ? '' : seconds}
      min={5}
      max={300}
      step={5}
      size={size}
      aria-label="Turn timer, seconds"
      start={{ icon: 'clock' }}
      end={{ icon: 'rotate-ccw', label: 'Reset to 45 seconds', onClick: () => setSeconds(45) }}
      onChange={setSeconds}
    />
  );
};

const Icons = { ...sizesStory<NumberInputArgs>((size) => <TurnTimer size={size} />), name: 'Icons at either end' };

const Sizes = sizesStory<NumberInputArgs>((size) => <StatefulNumber initial={25} min={0} max={100} step={5} sizeToContent size={size} />);

const SIDES: Readonly<Record<string, ReactNode>> = {
  'players, 1 to 20': <StatefulNumber initial={4} min={1} max={20} buttons="sides" />,
  'at the minimum': <StatefulNumber initial={1} min={1} max={20} buttons="sides" />,
  'steps of five, hint cost percent': <StatefulNumber initial={25} min={0} max={100} step={5} buttons="sides" />,
  'small': <StatefulNumber initial={4} min={1} max={20} buttons="sides" size="sm" />,
};

const Sides = {
  name: 'Buttons on the sides',
  render: () => <Demonstrator rows={axis(Object.keys(SIDES))} cell={(row) => SIDES[row]} />,
} satisfies StoryLiteStoryDefinition<NumberInputArgs>;

const HintCost = (props: { initial: number; disabled?: boolean }) => {
  const { initial, disabled } = props;
  const [value, setValue] = useState(initial);
  return (
    <NumberInput value={Number.isNaN(value) ? '' : value} min={0} max={100} step={5} sizeToContent disabled={disabled} onChange={setValue} />
  );
};

const renderState = (props: StateProps) => <HintCost initial={25} disabled={props.disabled === true} />;

const renderError = () => (
  <Field error="The cost tops out at 100.">
    <HintCost initial={150} />
  </Field>
);

const CODE = `import { useState } from 'react';
import { NumberInput } from '@drizztdourden08/tessera';

const [cost, setCost] = useState(25);

<NumberInput value={cost} onChange={setCost} min={0} max={100} step={5} sizeToContent />`;

const Overview = overviewStory({
  component: 'NumberInput',
  description: 'A number field with its own step up and step down buttons, for a count, a cost or a speed.',
  points: [
    'The buttons move by `step` and stop at `min` and `max`.',
    '**`onChange` hands back a number,** and `NaN` when the field is cleared.',
    '`buttons="sides"` puts a minus and a plus on either side of a short field, for small counts.',
    '`sizeToContent` narrows the field to the widest value `max` allows.',
    '`start` and `end` put an icon at either end, a button when it has `onClick`.',
    '`invalid`, or a [Field] with an error, draws the error look.',
  ],
  instead: '[Slider] for a value the user drags between two ends.',
  playground: Playground,
  variants: [Sizing, Sides, Sizes, Icons],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      STATE.hover,
      { ...STATE.focus, target: '.number-input__field' },
      { ...STATE.error, render: renderError },
      STATE.disabled,
    ],
  },
  code: CODE,
});

export default meta;
export { Icons, Overview, Playground, Sides, Sizes, Sizing };
