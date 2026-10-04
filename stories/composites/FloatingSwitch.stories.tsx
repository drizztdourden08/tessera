/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { FloatingSwitch } from '../../src/composites';
import type { FloatingSwitchItem } from '../../src/composites';
import { Box, Icon, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { NAV_ICONS } from './_samples/nav';
import type { NavIcon } from './_samples/nav';
import { navItemStates } from './_samples/nav-states';

type SwitchArgs = {
  label: string;
  disableLast: boolean;
};

const icon = (name: NavIcon) => <Icon name={NAV_ICONS[name]} />;

const TWO: FloatingSwitchItem[] = [
  { id: 'sessions', label: 'Sessions', icon: icon('sessions') },
  { id: 'players', label: 'Players', icon: icon('players') },
];

const THREE: FloatingSwitchItem[] = [
  { id: 'presets', label: 'Game presets', icon: icon('presets') },
  { id: 'servers', label: 'Servers', icon: icon('servers') },
  { id: 'logs', label: 'Item logs', icon: icon('logs') },
];

const SwitchDemo = (props: SwitchArgs & { items: FloatingSwitchItem[] }) => {
  const { label, disableLast, items } = props;
  const [active, setActive] = useState(items[0]?.id ?? '');
  const shown = items.map((it, i) => ({ ...it, disabled: disableLast && i === items.length - 1 }));
  return (
    <Box className="story-column">
      <Text className="story-label">Pick another place and watch the lit pill slide over to it</Text>
      <Box className="story-row">
        <FloatingSwitch items={shown} activeId={active} onSelect={setActive} label={label} />
      </Box>
      <Text className="story-label">Current: {active}</Text>
    </Box>
  );
};

const ARGS: Partial<SwitchArgs> = { label: 'Switch window', disableLast: false };

const ARG_TYPES: PlaygroundArgTypes<SwitchArgs> = {
    label: { group: 'Content', control: 'text' },
    disableLast: { group: 'State', control: 'boolean' },
  };

const meta = {
  title: 'Composites · Navigation/FloatingSwitch',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<SwitchArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <SwitchDemo {...args} items={TWO} />,
} satisfies PlaygroundStory<SwitchArgs>;

const ThreePlaces = {
  name: 'Three places',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <SwitchDemo {...args} items={THREE} />,
} satisfies PlaygroundStory<SwitchArgs>;

const renderState = (props: StateProps) => (
  <FloatingSwitch
    items={[{ id: 'sessions', label: 'Sessions', icon: icon('sessions'), disabled: props.disabled === true }]}
    activeId={props.selected === true ? 'sessions' : ''}
    onSelect={() => undefined}
    label="Switch window"
  />
);

const CODE = `import { FloatingSwitch, Icon } from '@drizztdourden08/tessera';

const [active, setActive] = useState('sessions');

<FloatingSwitch
  items={[
    { id: 'sessions', label: 'Sessions', icon: <Icon name="layers" /> },
    { id: 'players', label: 'Players', icon: <Icon name="users" /> },
  ]}
  activeId={active}
  onSelect={setActive}
  label="Switch window"
/>`;

const Overview = overviewStory({
  component: 'FloatingSwitch',
  description: 'A floating pill that switches between two or more sibling places, with the current one lit. The lit pill slides to the place you pick, and its text brightens as it arrives; hovering another place brightens its text and gives it a soft glow without filling it. Reach for it when a window has a few peer views to jump between, such as the switch on the top edge of a ScreenWindow. It holds no state: the host passes the active id and handles the pick. An item can be disabled, and picking the lit item does nothing.',
  playground: Playground,
  variants: [ThreePlaces],
  states: {
    render: renderState,
    list: [
      ...navItemStates('.floating-switch__item'),
      STATE.disabled,
    ],
  },
  code: CODE,
});

export default meta;
export { Overview, Playground, ThreePlaces };
