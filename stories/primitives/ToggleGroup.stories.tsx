/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, ToggleGroup } from '../../src/primitives';
import type { ToggleOption } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
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

const States = {
  name: 'States',
  render: () => (
    <Box className="story-column">
      <StatefulGroup initial={[]} label="Nothing picked" />
      <StatefulGroup initial={['grid', 'collision', 'sprites', 'doors']} label="Everything picked" />
      <StatefulGroup initial={['grid']} options={WITH_LOCKED} label="One option disabled" />
      <StatefulGroup initial={['collision']} disabled label="Whole group disabled" />
      <StatefulGroup initial={['sprites']} />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<ToggleGroupArgs>;

const Overview = overviewStory({
  component: 'ToggleGroup',
  description: 'A row of joined buttons, each one switched on or off by itself, for choosing any number of options from a short list. Map overlays and filters are the usual fit. The group can carry a label and a description above the row. Single options can be disabled, or the whole group at once.',
  playground: Playground,
  variants: [States],
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
export { Overview, Playground, States };
