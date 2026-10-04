/* @layer stories @kind story */
import { useId, useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { SIZE_ARG } from '../_template/control-sizes.constants';
import { sizesStory } from '../_template/sizes-story';
import { Box, RadioGroup } from '../../src/primitives';
import type { ControlSize, RadioOption } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { ValueReadout } from '../_template/ValueReadout';

type Direction = 'horizontal' | 'vertical';

type RadioGroupArgs = {
  label: string;
  description: string;
  direction: Direction;
  disabled: boolean;
  size: ControlSize;
};

type Difficulty = 'casual' | 'normal' | 'hard';

const DIFFICULTIES: RadioOption<Difficulty>[] = [
  { value: 'casual', label: 'Casual', description: 'Hints are free and enemies deal half damage.' },
  { value: 'normal', label: 'Normal', description: 'The game as it shipped.' },
  { value: 'hard', label: 'Hard', description: 'Hints cost double and hearts refill slower.' },
];

const SHORT: RadioOption<Difficulty>[] = DIFFICULTIES.map(({ value, label }) => ({ value, label }));

const ARGS: Partial<RadioGroupArgs> = { label: 'Difficulty', description: 'Applies to new sessions only.', direction: 'vertical', disabled: false, size: 'md' };

const ARG_TYPES: PlaygroundArgTypes<RadioGroupArgs> = {
    label: { group: 'Content', control: 'text' },
    description: { group: 'Content', control: 'text' },
    direction: { group: 'Layout', control: 'select', options: ['horizontal', 'vertical'] },
    disabled: { group: 'State', control: 'boolean' },
    size: SIZE_ARG,
  };

const meta = {
  title: 'Primitives · Inputs/RadioGroup',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<RadioGroupArgs>;

type StatefulRadioProps = { name: string; options?: RadioOption<Difficulty>[] } & Partial<RadioGroupArgs>;

const StatefulRadio = (props: StatefulRadioProps) => {
  const { name, options = DIFFICULTIES, label, description, direction, disabled, size } = props;
  const [value, setValue] = useState<Difficulty>('normal');
  return (
    <ValueReadout value={value}>
      <RadioGroup
        name={name}
        value={value}
        options={options}
        onChange={setValue}
        label={label}
        description={description}
        direction={direction}
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
  render: (args) => <StatefulRadio name="radio-playground" {...args} />,
} satisfies PlaygroundStory<RadioGroupArgs>;

const Layouts = {
  name: 'Layouts',
  render: () => (
    <Box className="story-column">
      <StatefulRadio name="radio-horizontal" options={SHORT} label="Horizontal" direction="horizontal" />
      <StatefulRadio name="radio-vertical" label="Vertical, with option descriptions" direction="vertical" />
      <StatefulRadio name="radio-bare" options={SHORT} direction="horizontal" />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<RadioGroupArgs>;

const Sizes = sizesStory<RadioGroupArgs>((size) => <StatefulRadio name={`radio-size-${size}`} options={SHORT} direction="horizontal" size={size} />);

const DifficultyPick = (props: { disabled: boolean }) => {
  const { disabled } = props;
  const name = useId();
  const [value, setValue] = useState<Difficulty>('normal');
  return <RadioGroup name={name} value={value} options={SHORT} onChange={setValue} direction="horizontal" disabled={disabled} />;
};

const renderState = (props: StateProps) => <DifficultyPick disabled={props.disabled === true} />;

const CODE = `import { useId, useState } from 'react';
import { RadioGroup } from '@drizztdourden08/tessera';

const [difficulty, setDifficulty] = useState('normal');

<RadioGroup
  label="Difficulty"
  value={difficulty}
  onChange={setDifficulty}
  direction="vertical"
  options={[
    { value: 'casual', label: 'Casual', description: 'Hints are free.' },
    { value: 'normal', label: 'Normal' },
    { value: 'hard', label: 'Hard' },
  ]}
/>`;

const Overview = overviewStory({
  component: 'RadioGroup',
  description: 'A set of options where exactly one is picked, all of them in view. Reach for it when there are few choices and each may need its own line of description. It lays out horizontally or vertically, takes a group label and description, and can be disabled as a whole. size md makes each option the standard control height and sm the compact one, with a smaller dot and text.',
  playground: Playground,
  variants: [Layouts, Sizes],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      { ...STATE.hover, target: '.radio-group__option' },
      { ...STATE.focus, target: '.radio-group__option--active .radio-group__input' },
      STATE.disabled,
    ],
  },
  code: CODE,
});

export default meta;
export { Layouts, Overview, Playground, Sizes };
