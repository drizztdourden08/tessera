/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, Stepper, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';

type StepperArgs = {
  min: number;
  max: number;
  step: number;
  disabled: boolean;
};

const ARGS: Partial<StepperArgs> = { min: 1, max: 20, step: 1, disabled: false };

const ARG_TYPES: StoryLiteArgTypes<StepperArgs> = {
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    disabled: { control: 'boolean' },
  };

const meta = {
  title: 'Primitives · Inputs/Stepper',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<StepperArgs>;

const StatefulStepper = (props: { initial: number; caption: string } & Partial<StepperArgs>) => {
  const { initial, caption, min, max, step, disabled } = props;
  const [value, setValue] = useState(initial);
  return (
    <Box className="story-column">
      <Text className="story-label">{caption}</Text>
      <Box className="story-row">
        <Stepper value={value} onChange={setValue} min={min} max={max} step={step} disabled={disabled} ariaLabel={caption} />
        <Text className="story-label">Value: {Number.isNaN(value) ? '(empty)' : value}</Text>
      </Box>
    </Box>
  );
};

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <StatefulStepper initial={4} caption="Players in the session" {...args} />,
} satisfies StoryLiteStoryDefinition<StepperArgs>;

const Values = {
  name: 'Values',
  render: () => (
    <Box className="story-column">
      <StatefulStepper initial={1} min={1} max={20} caption="At the minimum" />
      <StatefulStepper initial={20} min={1} max={20} caption="At the maximum" />
      <StatefulStepper initial={25} min={0} max={100} step={5} caption="Steps of five, hint cost percent" />
      <StatefulStepper initial={Number.NaN} min={0} max={999} caption="Empty field" />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<StepperArgs>;

const Players = (props: { disabled?: boolean }) => {
  const { disabled } = props;
  const [value, setValue] = useState(4);
  return <Stepper value={value} onChange={setValue} min={1} max={20} disabled={disabled} ariaLabel="Players in the session" />;
};

const renderState = (props: StateProps) => <Players disabled={props.disabled === true} />;

const Overview = overviewStory({
  component: 'Stepper',
  description: 'A number field with a minus and a plus button on either side. Use it for small counts and amounts, such as players in a session or a percentage in steps of five. The buttons move the value by step and stop at min and max, and the field takes typed digits. An empty field reports NaN, and the whole control can be disabled.',
  playground: Playground,
  variants: [Values],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      STATE.hover,
      { ...STATE.focus, target: '.stepper__field' },
      STATE.disabled,
    ],
  },
  code: `import { useState } from 'react';
import { Stepper } from '@drizztdourden08/tessera';

const [players, setPlayers] = useState(4);

<Stepper value={players} onChange={setPlayers} min={1} max={20} step={1} ariaLabel="Players in the session" />`,
});

export default meta;
export { Overview, Playground, Values };
