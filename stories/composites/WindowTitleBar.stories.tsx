/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { WindowTitleBar } from '../../src/composites';
import type { WindowControl, WindowControlsConfig, WindowTitleBarProps } from '../../src/composites';
import { Box, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { brandLogoUri } from './_samples/brand-logo';
import { buildTitleMenu } from './_samples/data-title-menu';
import { titleBarActions } from './_samples/title-bar-actions';
import { TitleBarWidths } from './_samples/TitleBarWidths';
import { TITLE_BAR_CODE } from './_samples/title-bar-code.constants';
import './WindowTitleBar.stories.css';

type TitleBarArgs = {
  title: string;
  withLogo: boolean;
  instanceName: string;
  withMenu: boolean;
  withActions: boolean;
  updateAvailable: boolean;
  concealed: boolean;
  fullscreenButton: boolean;
  pinButton: boolean;
  minimizeButton: boolean;
  maximizeButton: boolean;
};

const LOGO = brandLogoUri('brock');
const DEV_LOGO = brandLogoUri('tessera');

const ignore = () => undefined;

const STATE_MENU = buildTitleMenu(ignore, false);

const STATE_ACTIONS = titleBarActions(ignore);

const controlsOf = (args: TitleBarArgs): WindowControlsConfig => ({
  fullscreen: args.fullscreenButton,
  pin: args.pinButton,
  minimize: args.minimizeButton,
  maximize: args.maximizeButton,
});

const TitleBarDemo = (props: TitleBarArgs & { maximized?: boolean }) => {
  const { title, withLogo, instanceName, withMenu, withActions, updateAvailable, concealed } = props;
  const [pinned, setPinned] = useState(false);
  const [maximized, setMaximized] = useState(props.maximized === true);
  const [fullscreen, setFullscreen] = useState(false);
  const [said, setSaid] = useState('Nothing pressed yet.');
  const pick = (label: string) => setSaid(`${label} picked.`);

  const onControl = (control: WindowControl) => {
    setSaid(`${control} pressed.`);
    if (control === 'pin') setPinned((on) => !on);
    if (control === 'maximize') setMaximized((on) => !on);
    if (control === 'fullscreen') setFullscreen((on) => !on);
  };

  return (
    <Box className="story-frame window-title-bar-story__frame">
      <WindowTitleBar
        title={title}
        logo={withLogo ? LOGO : undefined}
        instance={instanceName ? { name: instanceName, logo: DEV_LOGO } : null}
        menu={withMenu ? buildTitleMenu(pick, false) : undefined}
        actions={withActions ? titleBarActions(pick, updateAvailable ? 'Update available' : null) : undefined}
        controls={controlsOf(props)}
        pinned={pinned}
        maximized={maximized}
        fullscreen={fullscreen}
        onControl={onControl}
        concealed={concealed}
      />
      <Box className="window-title-bar-story__body">
        <Text variant="caption">{said}</Text>
        {(concealed || fullscreen) && (
          <Text variant="caption">The bar is tucked away. Move the pointer to the top edge of this frame to peek at it.</Text>
        )}
        {fullscreen && <Text variant="caption">Full screen hides the bar too: peek, then press the full screen button again.</Text>}
      </Box>
    </Box>
  );
};

const ARGS: Partial<TitleBarArgs> = {
  title: 'Brock Demo',
  withLogo: true,
  instanceName: '',
  withMenu: true,
  withActions: true,
  updateAvailable: true,
  concealed: false,
  fullscreenButton: true,
  pinButton: true,
  minimizeButton: true,
  maximizeButton: true,
};

const ARG_TYPES: PlaygroundArgTypes<TitleBarArgs> = {
  title: { group: 'Content', control: 'text' },
  withLogo: { group: 'Content', control: 'boolean' },
  instanceName: { group: 'Content', control: 'text', description: 'Names a second copy of the app, such as a dev build, in a Status pill.' },
  withMenu: { group: 'Content', control: 'boolean', description: 'Pass menu groups; the bar draws the hamburger and its menu.' },
  withActions: { group: 'Content', control: 'boolean', description: 'Pass actions: Report a bug as a button and Check for updates as green status text.' },
  fullscreenButton: { group: 'Content', control: 'boolean', description: 'controls.fullscreen' },
  pinButton: { group: 'Content', control: 'boolean', description: 'controls.pin' },
  minimizeButton: { group: 'Content', control: 'boolean', description: 'controls.minimize' },
  maximizeButton: { group: 'Content', control: 'boolean', description: 'controls.maximize' },
  updateAvailable: { group: 'State', control: 'boolean', description: 'Sets the status of Check for updates, which shows the green text in the bar and the menu subtitle.' },
  concealed: { group: 'State', control: 'boolean' },
};

const meta = {
  title: 'Composites · Windows/WindowTitleBar',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<TitleBarArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <TitleBarDemo {...args} />,
} satisfies PlaygroundStory<TitleBarArgs>;

const AppWindow = {
  name: 'App window with a menu from config',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <TitleBarDemo {...args} />,
} satisfies PlaygroundStory<TitleBarArgs>;

const FewerButtons = {
  name: 'Buttons removed by config',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <TitleBarDemo {...args} withActions={false} fullscreenButton={false} pinButton={false} maximizeButton={false} />,
} satisfies PlaygroundStory<TitleBarArgs>;

const SecondInstance = {
  name: 'Second instance',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <TitleBarDemo {...args} instanceName="Dev" withActions={false} />,
} satisfies PlaygroundStory<TitleBarArgs>;

const Maximized = {
  name: 'Maximized, no menu or actions',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <TitleBarDemo {...args} maximized withMenu={false} withActions={false} />,
} satisfies PlaygroundStory<TitleBarArgs>;

const Concealed = {
  name: 'Concealed until the pointer, Tab or Alt reaches it',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <TitleBarDemo {...args} concealed />,
} satisfies PlaygroundStory<TitleBarArgs>;

const Resizable = {
  name: 'Drag the corner to watch the items slide',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Box className="window-title-bar-story__resizable">
      <WindowTitleBar title={args.title} logo={LOGO} menu={STATE_MENU} actions={STATE_ACTIONS} onControl={ignore} />
    </Box>
  ),
} satisfies PlaygroundStory<TitleBarArgs>;

const Narrow = {
  name: 'Narrow windows move the items to the menu, then shrink the brand',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <TitleBarWidths title={args.title} logo={LOGO} menu={STATE_MENU} actions={STATE_ACTIONS} />,
} satisfies PlaygroundStory<TitleBarArgs>;

const renderState = (props: StateProps) => (
  <Box className="window-title-bar-story__strip">
    <WindowTitleBar title="Brock Demo" logo={LOGO} menu={STATE_MENU} actions={STATE_ACTIONS} onControl={ignore} {...(props as Partial<WindowTitleBarProps>)} />
  </Box>
);

const Overview = overviewStory({
  component: 'WindowTitleBar',
  description: 'The title bar of a frameless desktop app window: the brand in the middle, a menu on the left, window buttons on the right.',
  points: [
    '`onControl` hears the pin, full screen, minimize, maximize and close; `controls` turns off all but close.',
    '`menu` takes the same groups as [DropdownMenu] and hangs from the hamburger at the left.',
    '`actions` add icon buttons, or status text such as Update available while their `status` is set.',
    'Each icon button shows a tooltip with its label, and its `shortcut` as keycaps, on hover and on focus.',
    'As the window narrows, items hide one by one into the menu; minimize, maximize and close never hide.',
    '`concealed` and full screen tuck the bar away until the pointer nears the top, focus enters it or [[Alt]] is tapped.',
  ],
  playground: Playground,
  variants: [AppWindow, Narrow, Resizable, FewerButtons, SecondInstance, Maximized, Concealed],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      { ...STATE.hover, name: 'Hover on a control', target: '.window-title-bar__control' },
      { ...STATE.hover, name: 'Hover on close', target: '.window-title-bar__control--close' },
      { ...STATE.hover, name: 'Hover on the menu', target: '.menu-button' },
      { ...STATE.focus, target: '.window-title-bar__control' },
      { name: 'Pinned', props: { pinned: true } },
      { name: 'Instance', props: { instance: { name: 'Dev', logo: DEV_LOGO } } },
      { name: 'Maximized', props: { maximized: true } },
      { name: 'Concealed', props: { concealed: true, peek: false } },
      { name: 'Peek', props: { concealed: true, peek: true } },
    ],
  },
  code: TITLE_BAR_CODE,
});

export default meta;
export { AppWindow, Concealed, FewerButtons, Maximized, Narrow, Overview, Playground, Resizable, SecondInstance };
