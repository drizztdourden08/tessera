/* @layer stories @kind story */
import { useState } from 'react';
import type { ReactNode } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { SIZE_ARG } from '../_template/control-sizes.constants';
import { sizesStory } from '../_template/sizes-story';
import { Box, Field, NumberInput, Text, type ControlSize } from '../../src/primitives';
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
  sizeToContent: boolean;
  size: ControlSize;
};

const ARGS: Partial<NumberInputArgs> = { min: 0, max: 100, step: 5, disabled: false, sizeToContent: true, size: 'md' };

const ARG_TYPES: PlaygroundArgTypes<NumberInputArgs> = {
    min: { group: 'Value', control: 'number' },
    max: { group: 'Value', control: 'number' },
    step: { group: 'Value', control: 'number' },
    sizeToContent: { group: 'Layout', control: 'boolean' },
    disabled: { group: 'State', control: 'boolean' },
    size: SIZE_ARG,
  };

const meta = {
  title: 'Primitives · Inputs/NumberInput',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<NumberInputArgs>;

const StatefulNumber = (props: { initial: number } & Partial<NumberInputArgs>) => {
  const { initial, min, max, step, disabled, sizeToContent, size } = props;
  const [value, setValue] = useState(initial);
  return (
    <Box className="story-row">
      <NumberInput
        value={Number.isNaN(value) ? '' : value}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
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
  description: 'A number field with its own step up and step down buttons. Use it for a count, a cost or a speed, where typing a value and nudging it both make sense. The buttons move by step and stop at min and max, onChange hands back a number (NaN when the field is cleared), sizeToContent narrows the field to the widest value max allows, size picks md, the standard control height, or the compact sm, start and end put an icon at either end, a button when it has onClick, and invalid, or a Field with an error, draws the error look.',
  playground: Playground,
  variants: [Sizing, Sizes, Icons],
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
export { Icons, Overview, Playground, Sizes, Sizing };
