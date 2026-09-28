/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, RangeInput, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';

type RangeInputArgs = {
  min: number;
  max: number;
  step: number;
  disabled: boolean;
};

const ARGS: Partial<RangeInputArgs> = { min: 0, max: 100, step: 5, disabled: false };

const ARG_TYPES: StoryLiteArgTypes<RangeInputArgs> = {
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    disabled: { control: 'boolean' },
  };

const meta = {
  title: 'Primitives · Inputs/RangeInput',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<RangeInputArgs>;

const StatefulRange = (props: { initial: number; caption: string } & Partial<RangeInputArgs>) => {
  const { initial, caption, min = 0, max = 100, step = 1, disabled } = props;
  const [value, setValue] = useState(initial);
  return (
    <Box className="story-column">
      <Text className="story-label">{caption}</Text>
      <Box className="story-row">
        <RangeInput
          value={value}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          aria-label={caption}
          onChange={(event) => setValue(Number(event.target.value))}
        />
        <Text className="story-label">{value}</Text>
      </Box>
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
      aria-label="Hint cost, percent"
    />
  ),
} satisfies StoryLiteStoryDefinition<RangeInputArgs>;

const States = {
  name: 'States',
  render: () => (
    <Box className="story-column">
      <StatefulRange initial={0} caption="At the minimum" />
      <StatefulRange initial={50} caption="Midway" />
      <StatefulRange initial={100} caption="At the maximum" />
      <StatefulRange initial={4} min={1} max={8} caption="Coarse steps, hearts at start" />
      <StatefulRange initial={30} caption="Disabled" disabled />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<RangeInputArgs>;

const Overview = overviewStory({
  component: 'RangeInput',
  description: 'The native range input, styled to match the rest of the design system. Use it for a plain single-value slider inside a form, where the value and its label are handled by the caller. Every input attribute passes through: min, max, step, value, disabled and onChange. For a label, a readout and a mute button, reach for Slider.',
  playground: Playground,
  variants: [States],
});

export default meta;
export { Overview, Playground, States };
