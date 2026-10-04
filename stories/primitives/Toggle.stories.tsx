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

const AutoSave = (props: { initial: boolean; disabled?: boolean }) => {
  const { initial, disabled } = props;
  const [checked, setChecked] = useState(initial);
  return <Toggle checked={checked} onChange={setChecked} disabled={disabled} label="Auto-save" description="Write a save state every time you enter a new room." />;
};

const renderState = (props: StateProps) => <AutoSave initial={props.checked === true} disabled={props.disabled === true} />;

const Overview = overviewStory({
  component: 'Toggle',
  description: 'An on and off switch for a setting that takes effect at once, such as auto-save or music. It can carry a label and a line of description, and a link that opens a page about the setting in a new tab. The whole row is one label, so a click anywhere on it flips the switch. It can be disabled in either position. size md is the standard switch and sm the compact one for widget panels and dense rows, and hint gives it a value and a one-line description that it reports through onHint and to the HintScope around it while it is pointed at or focused.',
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
