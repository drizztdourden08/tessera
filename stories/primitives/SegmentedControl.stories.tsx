/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, Glyph, SegmentedControl, Text } from '../../src/primitives';
import type { SegmentOption } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';

type SegmentedControlArgs = {
  label: string;
  description: string;
  disabled: boolean;
  deselectable: boolean;
};

type Scale = '1x' | '2x' | '3x' | 'fit';

const SCALES: SegmentOption<Scale>[] = [
  { value: '1x', label: '1x' },
  { value: '2x', label: '2x' },
  { value: '3x', label: '3x' },
  { value: 'fit', label: 'Fit window' },
];

const WITH_LOCKED: SegmentOption<Scale>[] = SCALES.map((opt) =>
  opt.value === '3x' ? { ...opt, disabled: true } : opt,
);

type Align = 'left' | 'center' | 'right';

const ALIGN_ICONS: SegmentOption<Align>[] = [
  { value: 'left', label: <Glyph name="chevronLeft" />, title: 'Align left' },
  { value: 'center', label: <Glyph name="widen" />, title: 'Align center' },
  { value: 'right', label: <Glyph name="chevronRight" />, title: 'Align right' },
];

const ARGS: Partial<SegmentedControlArgs> = { label: 'Window scale', description: 'How large the game picture is drawn.', disabled: false, deselectable: false };

const ARG_TYPES: StoryLiteArgTypes<SegmentedControlArgs> = {
    label: { control: 'text' },
    description: { control: 'text' },
    disabled: { control: 'boolean' },
    deselectable: { control: 'boolean', description: 'Wires onDeselect, so a re-click clears the value.' },
  };

const meta = {
  title: 'Primitives · Inputs/SegmentedControl',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<SegmentedControlArgs>;

type StatefulSegmentsProps<T extends string> = { initial: T; options: SegmentOption<T>[] } & Partial<SegmentedControlArgs>;

const StatefulSegments = <T extends string>(props: StatefulSegmentsProps<T>) => {
  const { initial, options, label, description, disabled, deselectable } = props;
  const [value, setValue] = useState<T | ''>(initial);
  return (
    <Box className="story-column">
      <SegmentedControl<T | ''>
        value={value}
        options={options}
        onChange={setValue}
        onDeselect={deselectable ? () => setValue('') : undefined}
        label={label}
        description={description}
        disabled={disabled}
      />
      <Text className="story-label">Value: {value === '' ? '(unset)' : value}</Text>
    </Box>
  );
};

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <StatefulSegments<Scale> initial="2x" options={SCALES} {...args} />,
} satisfies StoryLiteStoryDefinition<SegmentedControlArgs>;

const Kinds = {
  name: 'Kinds',
  render: () => (
    <Box className="story-column">
      <StatefulSegments<Scale> initial="1x" options={SCALES} label="Text labels" />
      <StatefulSegments<Scale> initial="2x" options={SCALES} label="Deselectable" description="Click the active segment to clear it." deselectable />
      <StatefulSegments<Align> initial="center" options={ALIGN_ICONS} label="Icon labels with titles" />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<SegmentedControlArgs>;

const WindowScale = (props: { options: SegmentOption<Scale>[]; disabled: boolean }) => {
  const { options, disabled } = props;
  const [value, setValue] = useState<Scale>('2x');
  return <SegmentedControl<Scale> value={value} options={options} onChange={setValue} disabled={disabled} />;
};

const renderState = (props: StateProps) => (
  <WindowScale options={props.optionDisabled === true ? WITH_LOCKED : SCALES} disabled={props.disabled === true} />
);

const CODE = `import { useState } from 'react';
import { SegmentedControl } from '@drizztdourden08/tessera';

const [scale, setScale] = useState('2x');

<SegmentedControl
  label="Window scale"
  value={scale}
  onChange={setScale}
  options={[
    { value: '1x', label: '1x' },
    { value: '2x', label: '2x' },
    { value: 'fit', label: 'Fit window' },
  ]}
/>`;

const Overview = overviewStory({
  component: 'SegmentedControl',
  description: 'A row of joined buttons that picks one value out of a few, with a highlight that slides to the active one. Reach for it for short settings where every choice fits on one line, like a scale or an alignment. Options can be text, or an icon with a title; one option or the whole control can be disabled, and onDeselect lets a second click on the active segment clear the value.',
  playground: Playground,
  variants: [Kinds],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      { ...STATE.hover, target: '.segmented__btn' },
      { ...STATE.focus, target: '.segmented__btn' },
      { name: 'One option disabled', props: { optionDisabled: true } },
      STATE.disabled,
    ],
  },
  code: CODE,
});

export default meta;
export { Kinds, Overview, Playground };
