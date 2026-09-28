/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, Slider } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { ValueReadout } from '../_template/ValueReadout';

type SliderArgs = {
  label: string;
  description: string;
  min: number;
  max: number;
  step: number;
  showValue: boolean;
  withMute: boolean;
  disabled: boolean;
};

const percent = (value: number): string => `${value}%`;

const ARGS: Partial<SliderArgs> = {
    label: 'Hint cost',
    description: 'Share of your rupees one hint takes.',
    min: 0,
    max: 100,
    step: 5,
    showValue: true,
    withMute: false,
    disabled: false,
  };

const ARG_TYPES: StoryLiteArgTypes<SliderArgs> = {
    label: { control: 'text' },
    description: { control: 'text' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    showValue: { control: 'boolean' },
    withMute: { control: 'boolean', description: 'Passes mute, which draws the speaker button.' },
    disabled: { control: 'boolean' },
  };

const meta = {
  title: 'Primitives · Inputs/Slider',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<SliderArgs>;

const StatefulSlider = (props: { initial: number; format?: (value: number) => string } & Partial<SliderArgs>) => {
  const { initial, format, label, description, min = 0, max = 100, step, showValue, withMute, disabled } = props;
  const [value, setValue] = useState(initial);
  return (
    <ValueReadout value={value}>
      <Slider
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={setValue}
        label={label}
        description={description}
        showValue={showValue}
        formatValue={format}
        mute={withMute ? value === 0 : undefined}
        disabled={disabled}
      />
    </ValueReadout>
  );
};

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <StatefulSlider initial={25} format={percent} {...args} />,
} satisfies StoryLiteStoryDefinition<SliderArgs>;

const States = {
  name: 'States',
  render: () => (
    <Box className="story-column">
      <StatefulSlider initial={40} label="Hint cost" format={percent} step={5} />
      <StatefulSlider initial={80} label="Music volume" description="Click the speaker to mute." format={percent} withMute />
      <StatefulSlider initial={0} label="Sound effects, muted" format={percent} withMute />
      <StatefulSlider initial={3} min={1} max={8} label="Hearts at start" showValue={false} />
      <StatefulSlider initial={60} label="Disabled" format={percent} disabled />
      <StatefulSlider initial={50} />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<SliderArgs>;

const CODE = `import { useState } from 'react';
import { Slider } from '@drizztdourden08/tessera';

const [volume, setVolume] = useState(80);

<Slider
  label="Music volume"
  value={volume}
  onChange={setVolume}
  min={0}
  max={100}
  formatValue={(value) => \`\${value}%\`}
  mute={volume === 0}
/>`;

const Overview = overviewStory({
  component: 'Slider',
  description: 'A labelled single-value slider with its current value written beside the track. Use it for a setting on a scale, like a volume or a cost. formatValue sets how the value is written, showValue hides it, and passing mute adds a speaker button that drops the value to zero and brings it back.',
  playground: Playground,
  variants: [States],
  code: CODE,
});

export default meta;
export { Overview, Playground, States };
