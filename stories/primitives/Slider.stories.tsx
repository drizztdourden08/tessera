/* @layer stories @kind story */
import { useState } from 'react';
import type { ReactNode } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { CONTROL_SIZES, SIZE_ARG } from '../_template/control-sizes.constants';
import { Box, Slider, Text, type ControlSize } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { LABEL_SYNTAX } from './_samples/slider-label-syntax.constants';
import { LabelsDemo } from './_samples/slider-labels';
import { DUNGEONS, PRICES, SPEEDS } from './_samples/slider-stops.constants';
import { StatefulSlider } from './_samples/StatefulSlider';
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
  withMute: boolean;
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
    withMute: false,
    disabled: false,
    size: 'md',
  };

const ARG_TYPES: StoryLiteArgTypes<SliderArgs> = {
    label: { control: 'text' },
    description: { control: 'text' },
    range: { control: 'boolean', description: 'Two thumbs, and the value becomes [low, high].' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    labels: { control: 'text', description: 'A label rule, read live. Try every 10, count 5 | {p}%, ends + 50=Half or [Low, Medium, High].' },
    showValue: { control: 'boolean' },
    withMute: { control: 'boolean', description: 'Passes mute, which draws the speaker button. Single mode only.' },
    disabled: { control: 'boolean' },
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
} satisfies StoryLiteStoryDefinition<SliderArgs>;

const Kinds = {
  name: 'Kinds',
  render: () => (
    <Box className="story-column">
      <StatefulSlider initial={40} label="Hint cost" format={percent} step={5} />
      <StatefulSlider initial={80} label="Music volume" description="Click the speaker to mute." format={percent} withMute />
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

const LabelRules = {
  name: 'Label rule syntax',
  render: () => (
    <Demonstrator
      corner="Write"
      rows={Object.keys(LABEL_SYNTAX).map((key) => ({ key, label: key }))}
      columns={[{ key: 'means', label: 'Means', fill: true }]}
      align="start"
      cell={(row) => <Text>{LABEL_SYNTAX[row]}</Text>}
    />
  ),
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

const MusicVolume = (props: { initial: number; disabled: boolean }) => {
  const { initial, disabled } = props;
  const [value, setValue] = useState(initial);
  return <Slider value={value} min={0} max={100} onChange={setValue} label="Music volume" formatValue={percent} mute={value === 0} disabled={disabled} />;
};

const renderState = (props: StateProps) => <MusicVolume initial={props.muted === true ? 0 : 60} disabled={props.disabled === true} />;

const CODE = `import { useState } from 'react';
import { Slider } from '@drizztdourden08/tessera';

const [volume, setVolume] = useState(80);
const [costs, setCosts] = useState<[number, number]>([20, 60]);

<Slider label="Music volume" value={volume} onChange={setVolume} formatValue={(v) => \`\${v}%\`} mute={volume === 0} />

<Slider range label="Hint cost window" value={costs} onChange={setCosts} step={5} labels="every 25 | {v}%" />

<Slider range stops={['0.5x', '1x', '2x', '4x']} defaultValue={[1, 2]} aria-label="Turbo speed range" />`;

const Overview = overviewStory({
  component: 'Slider',
  description: 'A labelled slider with its value written beside the track. One thumb gives a number; range gives two thumbs and a [low, high] pair, where the low thumb never passes the high one. stops turns the track into named positions, like speeds or dungeons, and the value into an index. labels writes labels under the track from one field: a rule such as "every 0.5 | {v}x", a list of [value, label] pairs, or a function. Labels that would overlap thin out to fit. formatValue sets how the value reads, showValue hides it, keyStep sets a coarser stride for the arrow keys, and passing mute adds a speaker button. It runs controlled with value and onChange, or on its own from defaultValue, and name sends it with a form. size md is the standard slider and sm the compact one.',
  playground: Playground,
  variants: [Kinds, Stops, Labels, LabelRules, Sizes],
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
export { Kinds, LabelRules, Labels, Overview, Playground, Sizes, Stops };
