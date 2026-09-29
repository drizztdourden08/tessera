/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, Field, NativeSelect, Select, Text } from '../../src/primitives';
import type { SelectGroup, SelectOption } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';

type SelectArgs = {
  placeholder: string;
  size: 'md' | 'sm';
  searchable: boolean;
  grouped: boolean;
  disabled: boolean;
  invalid: boolean;
};

const REGIONS: SelectOption[] = [
  { value: 'light', label: 'Light World', description: 'Overworld, 64 screens' },
  { value: 'dark', label: 'Dark World', description: 'Overworld, 64 screens' },
  { value: 'castle', label: 'Hyrule Castle' },
  { value: 'eastern', label: 'Eastern Palace' },
  { value: 'desert', label: 'Desert Palace' },
  { value: 'hera', label: 'Tower of Hera' },
];

const GROUPS: SelectGroup[] = [
  { label: 'Overworld', options: REGIONS.slice(0, 2) },
  { label: 'Dungeons', options: REGIONS.slice(2) },
];

const ARGS: Partial<SelectArgs> = { placeholder: 'Pick a region', size: 'md', searchable: false, grouped: false, disabled: false, invalid: false };

const ARG_TYPES: StoryLiteArgTypes<SelectArgs> = {
    placeholder: { control: 'text' },
    size: { control: 'select', options: ['md', 'sm'] },
    searchable: { control: 'boolean' },
    grouped: { control: 'boolean' },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean', description: 'Draws the error look. A Field with an error sets it on its own.' },
  };

const meta = {
  title: 'Primitives · Inputs/Select',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<SelectArgs>;

const StatefulSelect = (props: { initial: string } & Partial<SelectArgs>) => {
  const { initial, placeholder, size, searchable, grouped, disabled, invalid } = props;
  const [value, setValue] = useState(initial);
  return (
    <Box className="story-column">
      <Select
        value={value}
        onChange={setValue}
        options={grouped ? undefined : REGIONS}
        groups={grouped ? GROUPS : undefined}
        placeholder={placeholder}
        size={size}
        searchable={searchable}
        disabled={disabled}
        invalid={invalid}
      />
      <Text className="story-label">Value: {value === '' ? '(none)' : value}</Text>
    </Box>
  );
};

const StatefulNativeSelect = (props: { disabled?: boolean }) => {
  const { disabled } = props;
  const [value, setValue] = useState(REGIONS[0]?.label ?? '');
  return (
    <Box className="story-column">
      <NativeSelect value={value} disabled={disabled} onChange={(event) => setValue(event.target.value)}>
        {REGIONS.map((region) => (
          <Box as="option" key={region.value}>{region.label}</Box>
        ))}
      </NativeSelect>
      <Text className="story-label">Value: {value}</Text>
    </Box>
  );
};

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <StatefulSelect initial="eastern" {...args} />,
} satisfies StoryLiteStoryDefinition<SelectArgs>;

const Sizes = {
  name: 'Sizes',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">md</Text>
      <StatefulSelect initial="hera" />
      <Text className="story-label">sm</Text>
      <StatefulSelect initial="hera" size="sm" />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<SelectArgs>;

const Grouped = {
  name: 'Grouped and searchable',
  render: () => <StatefulSelect initial="desert" grouped searchable />,
} satisfies StoryLiteStoryDefinition<SelectArgs>;

const Region = (props: { initial: string; open?: boolean; disabled?: boolean }) => {
  const { initial, open, disabled } = props;
  const [value, setValue] = useState(initial);
  return <Select value={value} onChange={setValue} options={REGIONS} placeholder="Pick a region" defaultOpen={open} inline={open} disabled={disabled} />;
};

const renderState = (props: StateProps) => (
  <Region initial={props.filled === true ? 'eastern' : ''} open={props.open === true} disabled={props.disabled === true} />
);

const renderError = () => (
  <Field error="Pick the region the run starts in.">
    <Region initial="" />
  </Field>
);

const Native = {
  name: 'NativeSelect',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">browser select, for forms and touch screens</Text>
      <StatefulNativeSelect />
      <Text className="story-label">disabled</Text>
      <StatefulNativeSelect disabled />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<SelectArgs>;

const CODE = `import { useState } from 'react';
import { Select } from '@drizztdourden08/tessera';

const [region, setRegion] = useState('eastern');

<Select
  value={region}
  onChange={setRegion}
  placeholder="Pick a region"
  options={[
    { value: 'light', label: 'Light World', description: 'Overworld, 64 screens' },
    { value: 'eastern', label: 'Eastern Palace' },
  ]}
/>`;

const Overview = overviewStory({
  component: 'Select',
  description: 'A dropdown that picks one value from a list, drawn with the design system\'s own menu. Options can carry a description and be split into labelled groups. It has two sizes, a placeholder while nothing is picked, an optional search field and arrow-key navigation. defaultOpen starts it open, and inline draws the list right under the field, not as a floating panel. Set invalid for the error look, or wrap it in a Field with an error. For a form or a touch screen, NativeSelect wraps the browser\'s own select.',
  playground: Playground,
  variants: [Sizes, Grouped],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      STATE.hover,
      STATE.focus,
      { name: 'Filled', props: { filled: true } },
      { ...STATE.open, props: { open: true, filled: true } },
      { ...STATE.error, render: renderError },
      { ...STATE.disabled, props: { disabled: true, filled: true } },
    ],
  },
  code: CODE,
});

export default meta;
export { Grouped, Native, Overview, Playground, Sizes };
