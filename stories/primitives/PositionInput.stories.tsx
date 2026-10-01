/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { SIZE_ARG } from '../_template/control-sizes.constants';
import { sizesStory } from '../_template/sizes-story';
import { Box, PositionInput, Text } from '../../src/primitives';
import type { ControlSize, PositionAxis, PositionValue } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';

type PositionInputArgs = {
  label: string;
  xMax: number;
  yMax: number;
  step: number;
  disabled: boolean;
  size: ControlSize;
};

const ARGS: Partial<PositionInputArgs> = { label: 'Spawn tile', xMax: 63, yMax: 63, step: 1, disabled: false, size: 'md' };

const ARG_TYPES: StoryLiteArgTypes<PositionInputArgs> = {
    label: { control: 'text' },
    xMax: { control: 'number' },
    yMax: { control: 'number' },
    step: { control: 'number' },
    disabled: { control: 'boolean' },
    size: SIZE_ARG,
  };

const meta = {
  title: 'Primitives · Inputs/PositionInput',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<PositionInputArgs>;

type StatefulPositionProps = {
  initial: PositionValue;
  x?: PositionAxis;
  y?: PositionAxis;
  label?: string;
  disabled?: boolean;
  size?: ControlSize;
};

const StatefulPosition = (props: StatefulPositionProps) => {
  const { initial, x, y, label, disabled, size } = props;
  const [value, setValue] = useState(initial);
  return (
    <Box className="story-column">
      <PositionInput value={value} onChange={setValue} x={x} y={y} label={label} disabled={disabled} size={size} />
      <Text className="story-label">
        Value: x {value.x}, y {value.y}
      </Text>
    </Box>
  );
};

const PlaygroundDemo = (props: PositionInputArgs) => {
  const { label, xMax, yMax, step, disabled, size } = props;
  return (
    <StatefulPosition
      initial={{ x: 12, y: 30 }}
      x={{ min: 0, max: xMax, step }}
      y={{ min: 0, max: yMax, step }}
      label={label}
      disabled={disabled}
      size={size}
    />
  );
};

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <PlaygroundDemo {...args} />,
} satisfies StoryLiteStoryDefinition<PositionInputArgs>;

const Axes = {
  name: 'Axes',
  render: () => (
    <Box className="story-column">
      <StatefulPosition initial={{ x: 0, y: 0 }} label="Open axes, no bounds" />
      <StatefulPosition
        initial={{ x: 256, y: 224 }}
        x={{ min: 0, max: 511, step: 8 }}
        y={{ min: 0, max: 447, step: 8 }}
        label="Pixel position, snapped to 8"
      />
      <StatefulPosition
        initial={{ x: 3, y: 5 }}
        x={{ min: 1, max: 8, label: 'Col' }}
        y={{ min: 1, max: 8, label: 'Row' }}
        label="Custom axis captions"
      />
      <StatefulPosition initial={{ x: 0.5, y: 0.25 }} x={{ min: 0, max: 1, step: 0.05 }} y={{ min: 0, max: 1, step: 0.05 }} label="Fractional anchor" />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<PositionInputArgs>;

const Sizes = sizesStory<PositionInputArgs>((size) => (
  <StatefulPosition initial={{ x: 12, y: 30 }} x={{ min: 0, max: 63 }} y={{ min: 0, max: 63 }} label={`Spawn tile, ${size}`} size={size} />
), { align: 'stretch' });

const SpawnTile = (props: { disabled: boolean }) => {
  const { disabled } = props;
  const [value, setValue] = useState({ x: 12, y: 30 });
  return <PositionInput value={value} onChange={setValue} x={{ min: 0, max: 63 }} y={{ min: 0, max: 63 }} label="Spawn tile" disabled={disabled} />;
};

const renderState = (props: StateProps) => <SpawnTile disabled={props.disabled === true} />;

const CODE = `import { useState } from 'react';
import { PositionInput } from '@drizztdourden08/tessera';

const [spawn, setSpawn] = useState({ x: 12, y: 30 });

<PositionInput
  label="Spawn tile"
  value={spawn}
  onChange={setSpawn}
  x={{ min: 0, max: 63 }}
  y={{ min: 0, max: 63 }}
/>`;

const Overview = overviewStory({
  component: 'PositionInput',
  description: 'An x and y pair edited as one control, for a tile, a pixel position or an anchor point. Each axis takes its own min, max, step and caption, and an axis given nothing is open at both ends. onChange only ever fires with a valid pair: never NaN, never outside the bounds given. size sets both number fields: md at the standard control height, sm at the compact one.',
  playground: Playground,
  variants: [Axes, Sizes],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      { ...STATE.focus, target: '.number-input__field' },
      STATE.disabled,
    ],
  },
  code: CODE,
});

export default meta;
export { Axes, Overview, Playground, Sizes };
