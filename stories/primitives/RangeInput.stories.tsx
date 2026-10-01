/* @layer stories @kind story */
import { useState } from 'react';
import type { ReactNode } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { SIZE_ARG } from '../_template/control-sizes.constants';
import { sizesStory } from '../_template/sizes-story';
import { Box, RangeInput, Text, type ControlSize } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';

type RangeInputArgs = {
  min: number;
  max: number;
  step: number;
  disabled: boolean;
  size: ControlSize;
};

const ARGS: Partial<RangeInputArgs> = { min: 0, max: 100, step: 5, disabled: false, size: 'md' };

const ARG_TYPES: StoryLiteArgTypes<RangeInputArgs> = {
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    disabled: { control: 'boolean' },
    size: SIZE_ARG,
  };

const meta = {
  title: 'Primitives · Inputs/RangeInput',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<RangeInputArgs>;

const StatefulRange = (props: { initial: number; caption: string } & Partial<RangeInputArgs>) => {
  const { initial, caption, min = 0, max = 100, step = 1, disabled, size } = props;
  const [value, setValue] = useState(initial);
  return (
    <Box className="story-row">
      <RangeInput
        value={value}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        size={size}
        aria-label={caption}
        onChange={(event) => setValue(Number(event.target.value))}
      />
      <Text className="story-label">{value}</Text>
    </Box>
  );
};

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <RangeInput
      defaultValue={25}
      min={args.min}
      max={args.max}
      step={args.step}
      disabled={args.disabled}
      size={args.size}
      aria-label="Hint cost, percent"
    />
  ),
} satisfies StoryLiteStoryDefinition<RangeInputArgs>;

const VALUES: Readonly<Record<string, ReactNode>> = {
  'At the minimum': <StatefulRange initial={0} caption="At the minimum" />,
  Midway: <StatefulRange initial={50} caption="Midway" />,
  'At the maximum': <StatefulRange initial={100} caption="At the maximum" />,
  'Coarse steps, hearts at start': <StatefulRange initial={4} min={1} max={8} caption="Coarse steps, hearts at start" />,
};

const Values = {
  name: 'Values',
  render: () => <Demonstrator rows={axis(Object.keys(VALUES))} align="stretch" cell={(row) => VALUES[row]} />,
} satisfies StoryLiteStoryDefinition<RangeInputArgs>;

const Sizes = sizesStory<RangeInputArgs>((size) => <StatefulRange initial={40} size={size} caption={`Hint cost, ${size}`} />, { align: 'stretch' });

const renderState = (props: StateProps) => (
  <RangeInput defaultValue={40} min={0} max={100} step={5} disabled={props.disabled === true} aria-label="Hint cost, percent" />
);

const Overview = overviewStory({
  component: 'RangeInput',
  description: 'The native range input, styled to match the rest of the design system. Use it for a plain single-value slider inside a form, where the value and its label are handled by the caller. Every input attribute passes through: min, max, step, value, disabled and onChange. size md draws the browser control at its own scale and sm draws it at three quarters, for compact rows. For a label, a readout and a mute button, reach for Slider.',
  playground: Playground,
  variants: [Values, Sizes],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      STATE.focus,
      STATE.disabled,
    ],
  },
});

export default meta;
export { Overview, Playground, Sizes, Values };
