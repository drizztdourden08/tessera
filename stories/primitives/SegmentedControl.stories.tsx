/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { CONTROL_SIZES, SIZE_ARG } from '../_template/control-sizes.constants';
import { Box, Glyph, SegmentedControl, Text } from '../../src/primitives';
import type { ControlSize, SegmentOption } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { DOCK_OPTIONS } from './_samples/dock-options.constants';
import { SegmentHintDemo } from './_samples/SegmentHintDemo';

type SegmentedControlArgs = {
  label: string;
  description: string;
  disabled: boolean;
  deselectable: boolean;
  size: ControlSize;
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

const ARGS: Partial<SegmentedControlArgs> = { label: 'Window scale', description: 'How large the game picture is drawn.', disabled: false, deselectable: false, size: 'md' };

const ARG_TYPES: StoryLiteArgTypes<SegmentedControlArgs> = {
    label: { control: 'text' },
    description: { control: 'text' },
    disabled: { control: 'boolean' },
    deselectable: { control: 'boolean', description: 'Wires onDeselect, so a re-click clears the value.' },
    size: SIZE_ARG,
  };

const meta = {
  title: 'Primitives · Inputs/SegmentedControl',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<SegmentedControlArgs>;

type StatefulSegmentsProps<T extends string> = { initial: T; options: SegmentOption<T>[] } & Partial<SegmentedControlArgs>;

const StatefulSegments = <T extends string>(props: StatefulSegmentsProps<T>) => {
  const { initial, options, label, description, disabled, deselectable, size } = props;
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
        size={size}
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

const Sizes = {
  name: 'Sizes',
  render: () => (
    <Demonstrator
      rows={axis(CONTROL_SIZES)}
      columns={axis(['Text', 'Icons'])}
      cell={(size, kind) => (kind === 'Text'
        ? <StatefulSegments<Scale> initial="2x" options={SCALES} size={size} />
        : <StatefulSegments initial="right" options={DOCK_OPTIONS} size={size} />)}
    />
  ),
} satisfies StoryLiteStoryDefinition<SegmentedControlArgs>;

const HintOutput = {
  name: 'Icon only, with the hint output',
  render: () => <SegmentHintDemo />,
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
  description: 'A row of joined buttons that picks one value out of a few, with a highlight that slides to the active one. Reach for it for short settings where every choice fits on one line, like a scale or an alignment. Options can be text, or an icon with a title; one option or the whole control can be disabled, and onDeselect lets a second click on the active segment clear the value. size md matches the standard control height and sm is the compact control for widget panels, and an option can be an icon alone, named by its hint. Each option can carry a hint, a short value label and a one-line description: while an option is pointed at or focused, the control reports it through onHint and to the nearest HintScope, so a HintLine or any other component can show what the option does. Point at the icons below to see the line fill in.',
  playground: Playground,
  variants: [Kinds, Sizes, HintOutput],
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
export { HintOutput, Kinds, Overview, Playground, Sizes };
