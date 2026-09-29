/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, ToggleGroup } from '../../src/primitives';
import type { ToggleOption } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { ValueReadout } from '../_template/ValueReadout';

type ToggleGroupArgs = {
  label: string;
  description: string;
  disabled: boolean;
};

type Overlay = 'grid' | 'collision' | 'sprites' | 'doors';

const OVERLAYS: ToggleOption<Overlay>[] = [
  { value: 'grid', label: 'Grid' },
  { value: 'collision', label: 'Collision' },
  { value: 'sprites', label: 'Sprites' },
  { value: 'doors', label: 'Doors' },
];

const WITH_LOCKED: ToggleOption<Overlay>[] = OVERLAYS.map((opt) =>
  opt.value === 'doors' ? { ...opt, disabled: true } : opt,
);

const ARGS: Partial<ToggleGroupArgs> = { label: 'Map overlays', description: 'Pick any number of layers to draw.', disabled: false };

const ARG_TYPES: StoryLiteArgTypes<ToggleGroupArgs> = {
    label: { control: 'text' },
    description: { control: 'text' },
    disabled: { control: 'boolean' },
  };

const meta = {
  title: 'Primitives · Inputs/ToggleGroup',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ToggleGroupArgs>;

type StatefulGroupProps = { initial: Overlay[]; options?: ToggleOption<Overlay>[] } & Partial<ToggleGroupArgs>;

const StatefulGroup = (props: StatefulGroupProps) => {
  const { initial, options = OVERLAYS, label, description, disabled } = props;
  const [value, setValue] = useState<Overlay[]>(initial);
  return (
    <ValueReadout value={value}>
      <ToggleGroup
        value={value}
        options={options}
        onChange={setValue}
        label={label}
        description={description}
        disabled={disabled}
      />
    </ValueReadout>
  );
};

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <StatefulGroup initial={['grid', 'sprites']} {...args} />,
} satisfies StoryLiteStoryDefinition<ToggleGroupArgs>;

const Header = {
  name: 'Label and description',
  render: () => (
    <Box className="story-column">
      <StatefulGroup initial={['grid']} label="Map overlays" description="Pick any number of layers to draw." />
      <StatefulGroup initial={['grid']} label="Map overlays" />
      <StatefulGroup initial={['grid']} />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<ToggleGroupArgs>;

const Overlays = (props: { initial: Overlay[]; options: ToggleOption<Overlay>[]; disabled: boolean }) => {
  const { initial, options, disabled } = props;
  const [value, setValue] = useState<Overlay[]>(initial);
  return <ToggleGroup value={value} options={options} onChange={setValue} disabled={disabled} />;
};

const renderState = (props: StateProps) => (
  <Overlays
    initial={props.selected === true ? ['grid', 'sprites'] : []}
    options={props.optionDisabled === true ? WITH_LOCKED : OVERLAYS}
    disabled={props.disabled === true}
  />
);

const Overview = overviewStory({
  component: 'ToggleGroup',
  description: 'A row of joined buttons, each one switched on or off by itself, for choosing any number of options from a short list. Map overlays and filters are the usual fit. The group can carry a label and a description above the row. Single options can be disabled, or the whole group at once.',
  playground: Playground,
  variants: [Header],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      { ...STATE.hover, target: '.toggle-group__btn' },
      { ...STATE.focus, target: '.toggle-group__btn' },
      STATE.selected,
      { name: 'One option disabled', props: { optionDisabled: true } },
      STATE.disabled,
    ],
  },
  code: `import { useState } from 'react';
import { ToggleGroup } from '@drizztdourden08/tessera';

const OVERLAYS = [
  { value: 'grid', label: 'Grid' },
  { value: 'sprites', label: 'Sprites' },
  { value: 'doors', label: 'Doors' },
];

const [overlays, setOverlays] = useState(['grid']);

<ToggleGroup label="Map overlays" options={OVERLAYS} value={overlays} onChange={setOverlays} />`,
});

export default meta;
export { Header, Overview, Playground };
