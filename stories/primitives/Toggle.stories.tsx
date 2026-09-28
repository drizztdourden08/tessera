/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, Text, Toggle } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';

type ToggleArgs = {
  label: string;
  description: string;
  link: string;
  disabled: boolean;
};

const ARGS: Partial<ToggleArgs> = {
    label: 'Auto-save',
    description: 'Write a save state every time you enter a new room.',
    link: '',
    disabled: false,
  };

const ARG_TYPES: StoryLiteArgTypes<ToggleArgs> = {
    label: { control: 'text' },
    description: { control: 'text' },
    link: { control: 'text' },
    disabled: { control: 'boolean' },
  };

const meta = {
  title: 'Primitives · Inputs/Toggle',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ToggleArgs>;

const StatefulToggle = (props: { initial: boolean } & Partial<ToggleArgs>) => {
  const { initial, label, description, link, disabled } = props;
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

const States = {
  name: 'States',
  render: () => (
    <Box className="story-column">
      <StatefulToggle initial={false} label="Off" />
      <StatefulToggle initial label="On" />
      <StatefulToggle initial label="Music" description="Play the soundtrack during gameplay." />
      <StatefulToggle
        initial={false}
        label="MSU-1 audio"
        description="Replace the soundtrack with a CD-quality pack."
        link="https://example.com/msu"
      />
      <StatefulToggle initial={false} disabled label="Disabled, off" description="Available once a ROM is loaded." />
      <StatefulToggle initial disabled label="Disabled, on" />
      <Box className="story-row">
        <Text className="story-label">no label</Text>
        <StatefulToggle initial />
      </Box>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<ToggleArgs>;

const Overview = overviewStory({
  component: 'Toggle',
  description: 'An on and off switch for a setting that takes effect at once, such as auto-save or music. It can carry a label and a line of description, and a link that opens a page about the setting in a new tab. The whole row is one label, so a click anywhere on it flips the switch. It can be disabled in either position.',
  playground: Playground,
  variants: [States],
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
export { Overview, Playground, States };
