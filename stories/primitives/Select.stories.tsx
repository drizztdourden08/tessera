/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, NativeSelect, Select, Text } from '../../src/primitives';
import type { SelectGroup, SelectOption } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';

type SelectArgs = {
  placeholder: string;
  size: 'md' | 'sm';
  searchable: boolean;
  grouped: boolean;
  disabled: boolean;
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

const ARGS: Partial<SelectArgs> = { placeholder: 'Pick a region', size: 'md', searchable: false, grouped: false, disabled: false };

const ARG_TYPES: StoryLiteArgTypes<SelectArgs> = {
    placeholder: { control: 'text' },
    size: { control: 'select', options: ['md', 'sm'] },
    searchable: { control: 'boolean' },
    grouped: { control: 'boolean' },
    disabled: { control: 'boolean' },
  };

const meta = {
  title: 'Primitives · Inputs/Select',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<SelectArgs>;

const StatefulSelect = (props: { initial: string } & Partial<SelectArgs>) => {
  const { initial, placeholder, size, searchable, grouped, disabled } = props;
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

const States = {
  name: 'States',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">nothing picked, placeholder</Text>
      <StatefulSelect initial="" placeholder="Pick a region" />
      <Text className="story-label">small</Text>
      <StatefulSelect initial="hera" size="sm" />
      <Text className="story-label">grouped and searchable</Text>
      <StatefulSelect initial="desert" grouped searchable />
      <Text className="story-label">disabled</Text>
      <StatefulSelect initial="castle" disabled />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<SelectArgs>;

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
  description: 'A dropdown that picks one value from a list, drawn with the design system\'s own menu. Options can carry a description and be split into labelled groups. It has two sizes, a placeholder while nothing is picked, an optional search field and arrow-key navigation. For a form or a touch screen, NativeSelect wraps the browser\'s own select.',
  playground: Playground,
  variants: [States],
  code: CODE,
});

export default meta;
export { Native, Overview, Playground, States };
