/* @layer stories @kind story */
import type { ReactNode } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { CONTROL_SIZES, SIZE_ARG } from '../_template/control-sizes.constants';
import { Box, type ControlSize } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { BalancingSlider } from './_samples/BalancingSlider';
import { ChannelTracksDemo } from './_samples/ChannelTracksDemo';
import { HintCostSlider } from './_samples/HintCostSlider';
import { LabelsDemo } from './_samples/slider-labels';
import { DUNGEONS, PRICES, SPEEDS } from './_samples/slider-stops.constants';
import { SliderWithInput } from './_samples/SliderWithInput';
import { StatefulSlider } from './_samples/StatefulSlider';
import { UprightSliders } from './_samples/UprightSliders';
import './Slider.stories.css';

type SliderArgs = {
  label: string;
  description: string;
  range: boolean;
  min: number;
  max: number;
  step: number;
  labels: string;
  showValue: boolean;
  disabled: boolean;
  size: ControlSize;
};

const percent = (value: number): string => `${value}%`;

const ARGS: Partial<SliderArgs> = {
    label: 'Hint cost',
    description: 'Share of your rupees one hint takes.',
    range: false,
    min: 0,
    max: 100,
    step: 5,
    labels: 'every 25 | {v}%',
    showValue: true,
    disabled: false,
    size: 'md',
  };

const ARG_TYPES: PlaygroundArgTypes<SliderArgs> = {
    label: { group: 'Content', control: 'text' },
    description: { group: 'Content', control: 'text' },
    labels: { group: 'Content', control: 'text', description: 'A value rule, read live. Try every 10, count 5 | {p}%, ends + 50=Half or [Low, Medium, High]. The ScaleLabels page lists the whole syntax.' },
    range: { group: 'Value', control: 'boolean', description: 'Two thumbs, and the value becomes [low, high].' },
    min: { group: 'Value', control: 'number' },
    max: { group: 'Value', control: 'number' },
    step: { group: 'Value', control: 'number' },
    showValue: { group: 'Appearance', control: 'boolean' },
    disabled: { group: 'State', control: 'boolean' },
    size: SIZE_ARG,
  };

const meta = {
  title: 'Primitives · Inputs/Slider',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<SliderArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => {
    const { range, ...rest } = args;
    return (
      <Box className="slider-stage">
        <StatefulSlider key={String(range)} initial={range ? [25, 75] : 25} format={percent} {...rest} />
      </Box>
    );
  },
} satisfies PlaygroundStory<SliderArgs>;

const Kinds = {
  name: 'Kinds',
  render: () => (
    <Box className="story-column">
      <StatefulSlider initial={40} label="Hint cost" format={percent} step={5} />
      <StatefulSlider initial={80} label="Music volume" description="For a mute button, use VolumeControl." format={percent} />
      <StatefulSlider initial={3} min={1} max={8} label="Hearts at start" showValue={false} />
      <StatefulSlider initial={[20, 60]} label="Hint cost window" format={percent} step={5} />
      <StatefulSlider initial={50} ariaLabel="Plain" />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<SliderArgs>;

const STOPS: Readonly<Record<string, ReactNode>> = {
  'Full range': <StatefulSlider initial={[0, 10]} stops={SPEEDS} labels="every 2" ariaLabel="Full range" />,
  'Both thumbs on one stop': <StatefulSlider initial={[4, 4]} stops={SPEEDS} labels="every 2" ariaLabel="Both thumbs on one stop" />,
  'Arrow keys move 2 stops': <StatefulSlider initial={[4, 12]} stops={PRICES} labels="every 5" keyStep={2} ariaLabel="Hint cost window" />,
  'Dungeons in the pool': <StatefulSlider initial={[1, 6]} stops={DUNGEONS} ariaLabel="Dungeons in the pool" />,
  'One value over stops': <StatefulSlider initial={2} stops={SPEEDS} ariaLabel="Turbo speed" />,
};

const Stops = {
  name: 'Named stops',
  render: () => <Demonstrator rows={axis(Object.keys(STOPS))} align="stretch" cell={(row) => STOPS[row]} />,
} satisfies StoryLiteStoryDefinition<SliderArgs>;

const Labels = {
  name: 'Labels',
  render: () => <LabelsDemo />,
} satisfies StoryLiteStoryDefinition<SliderArgs>;

const Sizes = {
  name: 'Sizes',
  render: () => (
    <Demonstrator
      rows={axis(CONTROL_SIZES)}
      columns={axis(['One value', 'Range'])}
      align="stretch"
      fill
      cell={(size, mode) => (mode === 'Range'
        ? <StatefulSlider initial={[2, 5]} stops={SPEEDS} labels="every 2" size={size} ariaLabel={`Turbo speed range, ${size}`} />
        : <StatefulSlider initial={60} size={size} format={percent} step={5} labels="every 25" ariaLabel={`Hint cost, ${size}`} />)}
    />
  ),
} satisfies StoryLiteStoryDefinition<SliderArgs>;

const WithInput = {
  name: 'With an exact number field',
  render: () => <Box className="story-column"><SliderWithInput /></Box>,
} satisfies StoryLiteStoryDefinition<SliderArgs>;

const LOG_LADDER: readonly number[] = [25, 50, 100, 200, 400, 800, 1600, 3200, 6400, 12800];

const LOG_ROWS: Readonly<Record<string, ReactNode>> = {
  'Log scale: 25 to 12800 percent on one track, Arrow keys land on the ladder': (
    <StatefulSlider initial={100} min={25} max={12800} scale="log" ladder={LOG_LADDER} labels={LOG_LADDER.map((stop) => [stop, `${stop}`] as const)} format={percent} ariaLabel="Zoom" />
  ),
  'Log scale without a ladder: Arrow keys move a fixed share of the track': (
    <StatefulSlider initial={400} min={25} max={12800} scale="log" format={percent} ariaLabel="Zoom, free" />
  ),
};

const LogScale = {
  name: 'Log scale, and a ladder for the Arrow keys',
  render: () => <Demonstrator rows={axis(Object.keys(LOG_ROWS))} align="stretch" cell={(row) => LOG_ROWS[row]} />,
} satisfies StoryLiteStoryDefinition<SliderArgs>;

const MIXED_ROWS: Readonly<Record<string, ReactNode>> = {
  'Mixed with a number box: the box shows the word Mixed': <StatefulSlider initial={60} label="Opacity" input mixed />,
  'Mixed without a box: the readout shows the word Mixed': <StatefulSlider initial={60} label="Opacity" format={percent} mixed />,
};

const MixedInput = {
  name: 'Mixed, with and without a number box',
  render: () => <Demonstrator rows={axis(Object.keys(MIXED_ROWS))} align="stretch" cell={(row) => MIXED_ROWS[row]} />,
} satisfies StoryLiteStoryDefinition<SliderArgs>;

const ChannelTrack = {
  name: 'A gradient as the track',
  render: () => <ChannelTracksDemo />,
} satisfies StoryLiteStoryDefinition<SliderArgs>;

const BALANCING_ROWS: Readonly<Record<string, ReactNode>> = {
  'A named value': <BalancingSlider start={50} />,
  'Any value between': <BalancingSlider start={65} />,
  'The readout names a named value': <BalancingSlider start={50} names />,
};

const Balancing = {
  name: 'Named values, and any number between',
  render: () => <Demonstrator rows={axis(Object.keys(BALANCING_ROWS))} align="stretch" cell={(row) => BALANCING_ROWS[row]} />,
} satisfies StoryLiteStoryDefinition<SliderArgs>;

const Upright = {
  name: 'Upright, with orientation vertical',
  render: () => <UprightSliders />,
} satisfies StoryLiteStoryDefinition<SliderArgs>;

const renderState = (props: StateProps) => <HintCostSlider disabled={props.disabled === true} />;

const CODE = `import { Slider } from '@drizztdourden08/tessera';

const [volume, setVolume] = useState(80);
const [costs, setCosts] = useState<[number, number]>([20, 60]);

<Slider label="Music volume" value={volume} onChange={setVolume} formatValue={(v) => \`\${v}%\`} />

<Slider range label="Hint cost window" value={costs} onChange={setCosts} step={5} labels="every 25 | {v}%" />

<Slider range stops={['0.5x', '1x', '2x', '4x']} defaultValue={[1, 2]} aria-label="Turbo speed range" />`;

const Overview = overviewStory({
  component: 'Slider',
  description: 'A labelled slider with its value written beside the track.',
  points: [
    'One thumb gives a number and `range` a low and high pair; `stops` names positions, and the value is an index.',
    'With one thumb, `orientation="vertical"` stands it upright; `scale="log"` spaces a wide span by octaves.',
    '`labels` writes labels under the track; [ScaleLabels] lists the whole rule syntax.',
    '`formatValue` sets the readout, `keyStep` and `ladder` the arrow keys, `trackBackground` the track.',
    'It runs controlled with `value` and `onChange`, or on its own from `defaultValue`.',
    '`input` puts a [NumberInput] at its end; `mixed` shows the word Mixed there too.',
  ],
  instead: '[VolumeControl] for a volume slider with a mute button.',
  playground: Playground,
  variants: [Kinds, Stops, Labels, Balancing, Upright, Sizes, WithInput, LogScale, MixedInput, ChannelTrack],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      { ...STATE.hover, target: '.slider__input' },
      { ...STATE.focus, target: '.slider__input' },
      STATE.disabled,
    ],
  },
  code: CODE,
});

export default meta;
export { Balancing, ChannelTrack, Kinds, Labels, LogScale, MixedInput, Overview, Playground, Sizes, Stops, Upright, WithInput };
