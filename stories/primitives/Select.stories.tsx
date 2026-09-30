/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, NativeSelect, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { REGION_OPTIONS } from './_samples/picker-data';
import { SELECT_CODE } from './_samples/picker-emoji';
import { PICKER_ARG_TYPES, pickerStates, pickerVariant } from './_samples/picker-story';
import { SelectPlayground } from './_samples/select-playground';
import {
  AsyncList, Categories, ConditionalColumns, DetailsCompact, DetailsFull, FullTrigger, MultiSelect, ObjectColumns, OneProperty, Optional,
  OptionsAndGroups, PlainStrings,
} from './_samples/select-variants';
import type { SelectArgs } from './_samples/select-playground';
import './Select.stories.css';

type Story = StoryLiteStoryDefinition<SelectArgs>;

const ARGS: Partial<SelectArgs> = {
  placeholder: 'Pick a build',
  look: 'status emoji',
  grouped: false,
  valueDisplay: 'label',
  min: 1,
  max: 1,
  searchable: false,
  loading: false,
  size: 'md',
  disabled: false,
  invalid: false,
};

const ARG_TYPES: StoryLiteArgTypes<SelectArgs> = {
  placeholder: { control: 'text' },
  look: { control: 'select', options: ['columns', 'status emoji', 'custom item'], description: 'Plain columns with a header, columns that react to the status, or a multi-line item component.' },
  grouped: { control: 'boolean', description: 'Group the builds by status, under category headers with an emoji.' },
  valueDisplay: { control: 'select', options: ['label', 'full'], description: 'What the trigger shows: the label, or the item drawn in full.' },
  searchable: { control: 'boolean' },
  ...PICKER_ARG_TYPES,
};

const meta = {
  title: 'Primitives · Inputs/Select',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<SelectArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <SelectPlayground {...args} />,
} satisfies Story;

const VARIANTS: readonly Story[] = [
  pickerVariant('Plain strings', PlainStrings),
  pickerVariant('Objects with columns', ObjectColumns),
  pickerVariant('Conditional columns', ConditionalColumns),
  pickerVariant('Multi-line items, full trigger', DetailsFull),
  pickerVariant('Multi-line items, compact trigger', DetailsCompact),
  pickerVariant('Columns in the trigger', FullTrigger),
  pickerVariant('Categories', Categories),
  pickerVariant('Multi select, up to three', MultiSelect),
  pickerVariant('Optional, min 0', Optional),
  pickerVariant('Return one property', OneProperty),
  pickerVariant('Async and dynamic list', AsyncList),
  pickerVariant('Options and groups', OptionsAndGroups),
];

const StatefulNativeSelect = (props: { disabled?: boolean }) => {
  const { disabled } = props;
  const [value, setValue] = useState(REGION_OPTIONS[0]?.label ?? '');
  return (
    <Box className="story-column">
      <NativeSelect value={value} disabled={disabled} onChange={(event) => setValue(event.target.value)}>
        {REGION_OPTIONS.map((region) => (
          <Box as="option" key={region.value}>{region.label}</Box>
        ))}
      </NativeSelect>
      <Text className="story-label">Value: {value}</Text>
    </Box>
  );
};

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
} satisfies Story;

const Overview = overviewStory({
  component: 'Select',
  description: 'A dropdown that picks from a list. The trigger and the list read as one shape: where they meet, the line and the corners go, and a curved corner fills the step when the list is wider. items takes plain strings, { value, label } objects or any object; getKey names what identifies an item, so the selection holds while the list changes or loads late. An object item is a row of columns on one grid shared by every row, set up by configuration: a field, a value map, a tone map, rules and a format. Each of them can be a function that also gets the item, its place in the list and whether it is selected, active or disabled. itemComponent draws each row with your own component, as tall as it needs. valueDisplay full draws the picked item in the trigger at its full height, and valueComponent gives the trigger its own compact look. groupBy and categories split the list under headers with an icon or an emoji. min and max drive the picking: max above 1 adds a checkbox per row, and min 0 lets the user clear the field. valueField returns one property of the item. The arrow keys, Home, End, Page Up and Page Down move, typing jumps to a label, and Space or Enter picks. NativeSelect wraps the browser\'s own select, for a form or a touch screen.',
  playground: Playground,
  variants: VARIANTS,
  states: pickerStates('select', {}),
  code: SELECT_CODE,
});

export default meta;
export { Native, Overview, Playground };
