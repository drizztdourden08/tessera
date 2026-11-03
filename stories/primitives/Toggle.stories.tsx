/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { CONTROL_SIZES, SIZE_ARG } from '../_template/control-sizes.constants';
import { Box, Text, Toggle, type ControlSize } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import { NamedByRow } from '../composites/_samples/NamedByRow';
import type { StateProps } from '../_template/states/states.type';

type ToggleArgs = {
  label: string;
  description: string;
  link: string;
  disabled: boolean;
  size: ControlSize;
};

const ARGS: Partial<ToggleArgs> = {
    label: 'Auto-save',
    description: 'Write a save state every time you enter a new room.',
    link: '',
    disabled: false,
    size: 'md',
  };

const ARG_TYPES: PlaygroundArgTypes<ToggleArgs> = {
    label: { group: 'Content', control: 'text' },
    description: { group: 'Content', control: 'text' },
    link: { group: 'Content', control: 'text' },
    disabled: { group: 'State', control: 'boolean' },
    size: SIZE_ARG,
  };

const meta = {
  title: 'Primitives · Inputs/Toggle',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ToggleArgs>;

const StatefulToggle = (props: { initial: boolean } & Partial<ToggleArgs>) => {
  const { initial, label, description, link, disabled, size } = props;
  const [checked, setChecked] = useState(initial);
  return (
    <Box className="story-column">
      <Toggle
        checked={checked}
        onChange={setChecked}
        label={label}
        description={description}
        link={link === '' ? undefined : link}
        disabled={disabled}
        size={size}
      />
      <Text className="story-label">{checked ? 'on' : 'off'}</Text>
    </Box>
  );
};

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <StatefulToggle initial {...args} />,
} satisfies PlaygroundStory<ToggleArgs>;

const Labels = {
  name: 'Label and description',
  render: () => (
    <Box className="story-column">
      <StatefulToggle initial label="Music" />
      <StatefulToggle initial label="Music" description="Play the soundtrack during gameplay." />
      <StatefulToggle
        initial={false}
        label="MSU-1 audio"
        description="Replace the soundtrack with a CD-quality pack."
        link="https://example.com/msu"
      />
      <StatefulToggle initial />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<ToggleArgs>;

const Sizes = {
  name: 'Sizes',
  render: () => (
    <Demonstrator
      rows={axis(CONTROL_SIZES)}
      columns={axis(['off', 'on'])}
      cell={(size, state) => <Toggle size={size} checked={state === 'on'} onChange={() => undefined} aria-label={`Music, ${size}, ${state}`} />}
    />
  ),
} satisfies StoryLiteStoryDefinition<ToggleArgs>;

const LABEL_SIZES = ['md', 'sm'] as const;

const LabelSizes = {
  name: 'Label sizes, apart from the switch',
  render: () => (
    <Demonstrator
      rows={axis(LABEL_SIZES)}
      columns={axis(CONTROL_SIZES)}
      cell={(labelSize, size) => <Toggle size={size} labelSize={labelSize} checked onChange={() => undefined} label="Music" description="Play the soundtrack during gameplay." />}
    />
  ),
} satisfies StoryLiteStoryDefinition<ToggleArgs>;

const NamedSwitch = ({ labelledBy }: { labelledBy: string }) => {
  const [checked, setChecked] = useState(true);
  return <Toggle checked={checked} onChange={setChecked} aria-labelledby={labelledBy} />;
};

const Named = {
  name: 'Named by the label of a FormRow, through aria-labelledby',
  render: () => (
    <NamedByRow
      rows={[
        { id: 'death-link', label: 'Death Link', description: 'When one player dies, everyone dies.', control: (labelId) => <NamedSwitch labelledBy={labelId} /> },
        { id: 'hints', label: 'Hints', control: (labelId) => <NamedSwitch labelledBy={labelId} /> },
      ]}
    />
  ),
} satisfies StoryLiteStoryDefinition<ToggleArgs>;

const MixedToggle = (props: { size: ControlSize }) => {
  const { size } = props;
  const [checked, setChecked] = useState(false);
  const [differs, setDiffers] = useState(true);
  return (
    <Toggle
      size={size}
      checked={checked}
      mixed={differs}
      onChange={(next) => {
        setDiffers(false);
        setChecked(next);
      }}
      label={differs ? 'Clip, layers differ' : 'Clip'}
    />
  );
};

const Mixed = {
  name: 'Mixed: the layers differ, and a press turns it on',
  render: () => (
    <Demonstrator rows={axis(CONTROL_SIZES)} cell={(size) => <MixedToggle key={size} size={size} />} />
  ),
} satisfies StoryLiteStoryDefinition<ToggleArgs>;

const AutoSave = (props: { initial: boolean; disabled?: boolean; mixed?: boolean }) => {
  const { initial, disabled, mixed = false } = props;
  const [checked, setChecked] = useState(initial);
  const [differs, setDiffers] = useState(mixed);
  return <Toggle checked={checked} mixed={differs} onChange={(next) => {
    setDiffers(false);
    setChecked(next);
  }} disabled={disabled} label="Auto-save" description="Write a save state every time you enter a new room." />;
};

const renderState = (props: StateProps) => <AutoSave initial={props.checked === true} disabled={props.disabled === true} mixed={props.mixed === true} />;

const Overview = overviewStory({
  component: 'Toggle',
  description: 'An on and off switch for a setting that takes effect at once, such as auto-save or music.',
  points: [
    'It can carry a `label`, a line of `description` and a `link` to a page about the setting.',
    'The whole row is one label, so a click flips it; `mixed` parks the thumb mid-way until a press sets on.',
    '`hint` reports a one-line description to a [HintLine] while it is pointed at or focused.',
    '`aria-label` or `aria-labelledby` names it when it has no `label`, such as the name of a [FormRow].',
    '`sm` is the compact switch for dense rows; `labelSize` `sm` or `md` sets the label text apart from `size`.',
    '`help` puts a ? after the label that shows its note on hover, focus or click, without flipping it.',
  ],
  instead: '[Checkbox] for a choice saved with a form.',
  playground: Playground,
  variants: [Labels, Named, Mixed, Sizes, LabelSizes],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      STATE.hover,
      { ...STATE.focus, target: '.toggle__input' },
      STATE.checked,
      { name: 'Mixed', props: { mixed: true } },
      STATE.disabled,
    ],
  },
  code: `import { useState } from 'react';
import { Toggle } from '@drizztdourden08/tessera';

const [autoSave, setAutoSave] = useState(true);

<Toggle
  checked={autoSave}
  onChange={setAutoSave}
  label="Auto-save"
  description="Write a save state every time you enter a new room."
/>`,
});

export default meta;
export { LabelSizes, Labels, Mixed, Named, Overview, Playground, Sizes };
