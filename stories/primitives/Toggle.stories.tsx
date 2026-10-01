/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, Text, Toggle } from '../../src/primitives';
import type { ToggleSize } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';

type ToggleArgs = {
  label: string;
  description: string;
  link: string;
  disabled: boolean;
  size: ToggleSize;
};

const ARGS: Partial<ToggleArgs> = {
    label: 'Auto-save',
    description: 'Write a save state every time you enter a new room.',
    link: '',
    disabled: false,
    size: 'md',
  };

const ARG_TYPES: StoryLiteArgTypes<ToggleArgs> = {
    label: { control: 'text' },
    description: { control: 'text' },
    link: { control: 'text' },
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['md', 'xs'], description: 'xs is the compact switch for widget panels.' },
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
} satisfies StoryLiteStoryDefinition<ToggleArgs>;

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

const SIZE_KEYS = ['md', 'xs'] as const;

const Sizes = {
  name: 'Sizes',
  render: () => (
    <Demonstrator
      rows={axis(SIZE_KEYS)}
      columns={axis(['off', 'on'])}
      cell={(size, state) => <Toggle size={size} checked={state === 'on'} onChange={() => undefined} aria-label={`Music, ${size}, ${state}`} />}
    />
  ),
} satisfies StoryLiteStoryDefinition<ToggleArgs>;

const AutoSave = (props: { initial: boolean; disabled?: boolean }) => {
  const { initial, disabled } = props;
  const [checked, setChecked] = useState(initial);
  return <Toggle checked={checked} onChange={setChecked} disabled={disabled} label="Auto-save" description="Write a save state every time you enter a new room." />;
};

const renderState = (props: StateProps) => <AutoSave initial={props.checked === true} disabled={props.disabled === true} />;

const Overview = overviewStory({
  component: 'Toggle',
  description: 'An on and off switch for a setting that takes effect at once, such as auto-save or music. It can carry a label and a line of description, and a link that opens a page about the setting in a new tab. The whole row is one label, so a click anywhere on it flips the switch. It can be disabled in either position. size xs draws a compact switch for widget panels, and hint gives it a value and a one-line description that it reports through onHint and to the HintScope around it while it is pointed at or focused.',
  playground: Playground,
  variants: [Labels, Sizes],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      STATE.hover,
      { ...STATE.focus, target: '.toggle__input' },
      STATE.checked,
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
export { Labels, Overview, Playground, Sizes };
