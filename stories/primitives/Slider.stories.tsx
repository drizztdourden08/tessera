/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { CONTROL_SIZES, SIZE_ARG } from '../_template/control-sizes.constants';
import { Box, Slider, type ControlSize } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
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
  size: ControlSize;
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
    size: 'md',
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
    size: SIZE_ARG,
  };

const meta = {
  title: 'Primitives · Inputs/Slider',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<SliderArgs>;

const StatefulSlider = (props: { initial: number; format?: (value: number) => string } & Partial<SliderArgs>) => {
  const { initial, format, label, description, min = 0, max = 100, step, showValue, withMute, disabled, size } = props;
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
        size={size}
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

const Kinds = {
  name: 'Kinds',
  render: () => (
    <Box className="story-column">
      <StatefulSlider initial={40} label="Hint cost" format={percent} step={5} />
      <StatefulSlider initial={80} label="Music volume" description="Click the speaker to mute." format={percent} withMute />
      <StatefulSlider initial={3} min={1} max={8} label="Hearts at start" showValue={false} />
      <StatefulSlider initial={50} />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<SliderArgs>;

const Sizes = {
  name: 'Sizes',
  render: () => (
    <Demonstrator rows={axis(CONTROL_SIZES)} cell={(size) => <StatefulSlider initial={60} size={size} format={percent} step={5} />} />
  ),
} satisfies StoryLiteStoryDefinition<SliderArgs>;

const MusicVolume = (props: { initial: number; disabled: boolean }) => {
  const { initial, disabled } = props;
  const [value, setValue] = useState(initial);
  return <Slider value={value} min={0} max={100} onChange={setValue} label="Music volume" formatValue={percent} mute={value === 0} disabled={disabled} />;
};

const renderState = (props: StateProps) => <MusicVolume initial={props.muted === true ? 0 : 60} disabled={props.disabled === true} />;

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
  description: 'A labelled single-value slider with its current value written beside the track. Use it for a setting on a scale, like a volume or a cost. formatValue sets how the value is written, showValue hides it, and passing mute adds a speaker button that drops the value to zero and brings it back. size md is the standard slider and sm the compact one for widget panels, with a smaller thumb, track and text.',
  playground: Playground,
  variants: [Kinds, Sizes],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      { ...STATE.hover, target: '.slider__input' },
      { ...STATE.focus, target: '.slider__input' },
      { name: 'Muted', props: { muted: true } },
      STATE.disabled,
    ],
  },
  code: CODE,
});

export default meta;
export { Kinds, Overview, Playground, Sizes };
