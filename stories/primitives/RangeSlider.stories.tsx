/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, RangeSlider, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';

type RangeSliderArgs = {
  step: number;
  labelEvery: number;
  disabled: boolean;
};

const SPEEDS = ['0.5x', '0.75x', '1x', '1.25x', '1.5x', '2x', '3x', '4x', '6x', '8x', '10x'] as const;

const PRICES = Array.from({ length: 21 }, (_, index) => String(index * 5));

const DUNGEONS = ['Eastern', 'Desert', 'Hera', 'Darkness', 'Swamp', 'Skull', 'Thieves', 'Ice', 'Misery', 'Turtle'] as const;

const ARGS: Partial<RangeSliderArgs> = { step: 1, labelEvery: 2, disabled: false };

const ARG_TYPES: StoryLiteArgTypes<RangeSliderArgs> = {
    step: { control: 'number', description: 'Keyboard stride, in stops.' },
    labelEvery: { control: 'number' },
    disabled: { control: 'boolean' },
  };

const meta = {
  title: 'Primitives · Inputs/RangeSlider',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<RangeSliderArgs>;

type StatefulRangeProps = {
  stops: readonly string[];
  initial: [number, number];
  caption: string;
} & Partial<RangeSliderArgs>;

const StatefulRange = (props: StatefulRangeProps) => {
  const { stops, initial, caption, step, labelEvery, disabled } = props;
  const [value, setValue] = useState<[number, number]>(initial);
  return (
    <Box className="story-column">
      <Text className="story-label">{caption}</Text>
      <RangeSlider
        stops={stops}
        value={value}
        onChange={setValue}
        step={step}
        labelEvery={labelEvery}
        disabled={disabled}
        ariaLabel={caption}
      />
      <Text className="story-label">
        From {stops[value[0]]} to {stops[value[1]]}
      </Text>
    </Box>
  );
};

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <StatefulRange stops={SPEEDS} initial={[2, 5]} caption="Turbo speed range" {...args} />,
} satisfies StoryLiteStoryDefinition<RangeSliderArgs>;

const Stops = {
  name: 'Stops',
  render: () => (
    <Box className="story-column">
      <StatefulRange stops={SPEEDS} initial={[0, 10]} caption="Full range" labelEvery={2} />
      <StatefulRange stops={SPEEDS} initial={[4, 4]} caption="Both thumbs on one stop" labelEvery={2} />
      <StatefulRange stops={PRICES} initial={[4, 12]} caption="Hint cost window, labels every 5 stops" labelEvery={5} step={2} />
      <StatefulRange stops={DUNGEONS} initial={[1, 6]} caption="Dungeons in the pool" />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<RangeSliderArgs>;

const TurboRange = (props: { disabled: boolean }) => {
  const { disabled } = props;
  const [value, setValue] = useState<[number, number]>([2, 7]);
  return <RangeSlider stops={SPEEDS} value={value} onChange={setValue} labelEvery={2} disabled={disabled} ariaLabel="Turbo speed range" />;
};

const renderState = (props: StateProps) => <TurboRange disabled={props.disabled === true} />;

const CODE = `import { useState } from 'react';
import { RangeSlider } from '@drizztdourden08/tessera';

const SPEEDS = ['0.5x', '1x', '1.5x', '2x', '3x', '4x'];
const [range, setRange] = useState<[number, number]>([1, 3]);

<RangeSlider stops={SPEEDS} value={range} onChange={setRange} ariaLabel="Turbo speed range" />`;

const Overview = overviewStory({
  component: 'RangeSlider',
  description: 'A two-thumb slider that picks a range over a list of named stops, such as speeds or price points. The low thumb can never pass the high one. It is built from two native range inputs, so arrows, Home, End and screen readers work; step sets a coarser keyboard stride, and labelEvery thins out the tick labels.',
  playground: Playground,
  variants: [Stops],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      { ...STATE.hover, target: '.range-slider__input' },
      { ...STATE.focus, target: '.range-slider__input' },
      STATE.disabled,
    ],
  },
  code: CODE,
});

export default meta;
export { Overview, Playground, Stops };
