/* @layer stories @kind story */
import { useState } from 'react';
import type { ReactNode } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { SIZE_ARG } from '../_template/control-sizes.constants';
import { sizesStory } from '../_template/sizes-story';
import { NumberStepper, type ControlSize } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { ValueReadout } from '../_template/ValueReadout';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';

type NumberStepperArgs = {
  min: number;
  max: number;
  step: number;
  disabled: boolean;
  size: ControlSize;
};

const ARGS: Partial<NumberStepperArgs> = { min: 1, max: 20, step: 1, disabled: false, size: 'md' };

const ARG_TYPES: PlaygroundArgTypes<NumberStepperArgs> = {
    min: { group: 'Value', control: 'number' },
    max: { group: 'Value', control: 'number' },
    step: { group: 'Value', control: 'number' },
    disabled: { group: 'State', control: 'boolean' },
    size: SIZE_ARG,
  };

const meta = {
  title: 'Primitives · Inputs/NumberStepper',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<NumberStepperArgs>;

const StatefulNumberStepper = (props: { initial: number; caption: string } & Partial<NumberStepperArgs>) => {
  const { initial, caption, min, max, step, disabled, size } = props;
  const [value, setValue] = useState(initial);
  return (
    <ValueReadout value={Number.isNaN(value) ? '(empty)' : value}>
      <NumberStepper value={value} onChange={setValue} min={min} max={max} step={step} disabled={disabled} size={size} ariaLabel={caption} />
    </ValueReadout>
  );
};

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Demonstrator
      rows={axis(['Players in the session'])}
      cell={(caption) => <StatefulNumberStepper initial={4} caption={caption} {...args} />}
    />
  ),
} satisfies PlaygroundStory<NumberStepperArgs>;

const VALUES: Readonly<Record<string, ReactNode>> = {
  'At the minimum': <StatefulNumberStepper initial={1} min={1} max={20} caption="At the minimum" />,
  'At the maximum': <StatefulNumberStepper initial={20} min={1} max={20} caption="At the maximum" />,
  'Steps of five, hint cost percent': <StatefulNumberStepper initial={25} min={0} max={100} step={5} caption="Steps of five, hint cost percent" />,
  'Empty field': <StatefulNumberStepper initial={Number.NaN} min={0} max={999} caption="Empty field" />,
};

const Values = {
  name: 'Values',
  render: () => <Demonstrator rows={axis(Object.keys(VALUES))} cell={(row) => VALUES[row]} />,
} satisfies StoryLiteStoryDefinition<NumberStepperArgs>;

const Sizes = sizesStory<NumberStepperArgs>((size) => <StatefulNumberStepper initial={4} min={1} max={20} size={size} caption={`Players, ${size}`} />);

const Players = (props: { disabled?: boolean }) => {
  const { disabled } = props;
  const [value, setValue] = useState(4);
  return <NumberStepper value={value} onChange={setValue} min={1} max={20} disabled={disabled} ariaLabel="Players in the session" />;
};

const renderState = (props: StateProps) => <Players disabled={props.disabled === true} />;

const Overview = overviewStory({
  component: 'NumberStepper',
  description: 'A number field with a minus and a plus button on either side. Use it for small counts and amounts, such as players in a session or a percentage in steps of five. The buttons move the value by step and stop at min and max, and the field takes typed digits. size md matches the standard control height and sm is the compact one. An empty field reports NaN, and the whole control can be disabled.',
  playground: Playground,
  variants: [Sizes, Values],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      STATE.hover,
      { ...STATE.focus, target: '.number-stepper__field' },
      STATE.disabled,
    ],
  },
  code: `import { useState } from 'react';
import { NumberStepper } from '@drizztdourden08/tessera';

const [players, setPlayers] = useState(4);

<NumberStepper value={players} onChange={setPlayers} min={1} max={20} step={1} ariaLabel="Players in the session" />`,
});

export default meta;
export { Overview, Playground, Sizes, Values };
