/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { CommandPaletteRow } from '../../src/composites';
import type { CommandPaletteItem } from '../../src/composites';
import { Box, Icon, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import './CommandPaletteRow.stories.css';

type RowArgs = {
  label: string;
  description: string;
  breadcrumb: string;
  end: 'none' | 'check' | 'toggle';
  disabled: boolean;
};

const ARGS: Partial<RowArgs> = {
  label: 'Play sounds', description: 'Chimes when an item arrives', breadcrumb: 'Settings / Audio', end: 'toggle', disabled: false,
};

const ARG_TYPES: PlaygroundArgTypes<RowArgs> = {
  label: { group: 'Content', control: 'text' },
  description: { group: 'Content', control: 'text' },
  breadcrumb: { group: 'Content', control: 'text', description: 'Parts split on a slash.' },
  end: { group: 'Content', control: 'select', options: ['none', 'check', 'toggle'] },
  disabled: { group: 'State', control: 'boolean' },
};

const RowDemo = (props: RowArgs) => {
  const { label, description, breadcrumb, end, disabled } = props;
  const [on, setOn] = useState(true);
  const [picked, setPicked] = useState(0);
  const item: CommandPaletteItem = {
    id: 'row',
    label,
    icon: <Icon name="volume-2" size={16} />,
    description: description || undefined,
    breadcrumb: breadcrumb ? breadcrumb.split('/').map((part) => part.trim()) : undefined,
    checked: end === 'check' ? on : undefined,
    toggle: end === 'toggle' ? { checked: on, onChange: setOn } : undefined,
    disabled,
  };
  return (
    <Box className="story-column command-palette-row-story">
      <CommandPaletteRow item={item} onSelect={() => setPicked(picked + 1)} />
      <Text variant="caption">{`Picked ${picked} times. The toggle is ${on ? 'on' : 'off'}.`}</Text>
    </Box>
  );
};

const meta = {
  title: 'Composites · Menus/CommandPaletteRow',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<RowArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <RowDemo {...args} />,
} satisfies PlaygroundStory<RowArgs>;

const Plain = {
  name: 'Label only',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <RowDemo {...args} description="" breadcrumb="" end="none" />,
} satisfies PlaygroundStory<RowArgs>;

const WithCheck = {
  name: 'Breadcrumb and check dot',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <RowDemo {...args} label="Show developer tools" description="" breadcrumb="Actions" end="check" />,
} satisfies PlaygroundStory<RowArgs>;

const WithToggle = {
  name: 'Inline toggle',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <RowDemo {...args} />,
} satisfies PlaygroundStory<RowArgs>;

const STATE_ITEM: CommandPaletteItem = {
  id: 'logs', label: 'Logs', icon: <Icon name="file-text" size={16} />, description: 'Everything the app has said', breadcrumb: ['Tools'],
};

const renderState = (props: StateProps) => (
  <Box className="command-palette-row-story">
    <CommandPaletteRow item={{ ...STATE_ITEM, disabled: props.disabled === true }} active={props.active === true} />
  </Box>
);

const Overview = overviewStory({
  component: 'CommandPaletteRow',
  description: 'One result in a CommandPalette: an icon, the label with an optional description under it, then a breadcrumb that says where the result lives, and at the end a check dot or an inline toggle. The toggle flips in place without picking the row. The palette draws these for you; use the row on its own for a list of search hits that should look the same.',
  playground: Playground,
  variants: [Plain, WithCheck, WithToggle],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      STATE.hover,
      { name: 'Active', props: { active: true } },
      STATE.disabled,
    ],
  },
});

export default meta;
export { Overview, Plain, Playground, WithCheck, WithToggle };
