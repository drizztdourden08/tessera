/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
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

const ARG_TYPES: StoryLiteArgTypes<TitleBarArgs> = {
  title: { control: 'text' },
  withLogo: { control: 'boolean' },
  instanceName: { control: 'text', description: 'Names a second copy of the app, such as a dev build, in a Status pill.' },
  withMenu: { control: 'boolean', description: 'Pass menu groups; the bar draws the hamburger and its menu.' },
  withActions: { control: 'boolean', description: 'Pass actions: Report a bug as a button and Check for updates as a status pill.' },
  updateAvailable: { control: 'boolean', description: 'Sets the status of Check for updates, which shows the pill and the menu subtitle.' },
  concealed: { control: 'boolean' },
  fullscreenButton: { control: 'boolean', description: 'controls.fullscreen' },
  pinButton: { control: 'boolean', description: 'controls.pin' },
  minimizeButton: { control: 'boolean', description: 'controls.minimize' },
  maximizeButton: { control: 'boolean', description: 'controls.maximize' },
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
} satisfies StoryLiteStoryDefinition<TitleBarArgs>;

const AppWindow = {
  name: 'App window with a menu from config',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <TitleBarDemo {...args} />,
} satisfies StoryLiteStoryDefinition<TitleBarArgs>;

const FewerButtons = {
  name: 'Buttons removed by config',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <TitleBarDemo {...args} withActions={false} fullscreenButton={false} pinButton={false} maximizeButton={false} />,
} satisfies StoryLiteStoryDefinition<TitleBarArgs>;

const SecondInstance = {
  name: 'Second instance',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <TitleBarDemo {...args} instanceName="Dev" withActions={false} />,
} satisfies StoryLiteStoryDefinition<TitleBarArgs>;

const Maximized = {
  name: 'Maximized, no menu or actions',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <TitleBarDemo {...args} maximized withMenu={false} withActions={false} />,
} satisfies StoryLiteStoryDefinition<TitleBarArgs>;

const Concealed = {
  name: 'Concealed until the pointer nears it',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <TitleBarDemo {...args} concealed />,
} satisfies StoryLiteStoryDefinition<TitleBarArgs>;

const Narrow = {
  name: 'Narrow windows move the items to the menu, then shrink the brand',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <TitleBarWidths title={args.title} logo={LOGO} menu={STATE_MENU} actions={STATE_ACTIONS} />,
} satisfies StoryLiteStoryDefinition<TitleBarArgs>;

const renderState = (props: StateProps) => (
  <Box className="window-title-bar-story__strip">
    <WindowTitleBar title="Brock Demo" logo={LOGO} menu={STATE_MENU} actions={STATE_ACTIONS} onControl={ignore} {...(props as Partial<WindowTitleBarProps>)} />
  </Box>
);

const CODE = `import { WindowTitleBar } from '@drizztdourden08/tessera';
import type { MenuGroup, WindowTitleBarAction } from '@drizztdourden08/tessera';

const menu: MenuGroup[] = [
  { id: 'screens', label: 'Screens', items: [{ id: 'home', icon: 'house', label: 'Home', onSelect: goHome }] },
  { id: 'app', items: [{ id: 'quit', icon: 'log-out', label: 'Quit', shortcut: 'Ctrl+Q', onSelect: quit }] },
];

const actions: WindowTitleBarAction[] = [
  { id: 'report-bug', icon: 'bug', label: 'Report a bug', tone: 'danger', onSelect: reportBug },
  { id: 'updates', icon: 'download', label: 'Check for updates', bar: 'status', status: update ? 'Update available' : undefined, tone: 'success', onSelect: checkForUpdates },
];

<WindowTitleBar
  title="Brock Demo"
  logo={logoSrc}
  instance={instanceName ? { name: instanceName, logo: instanceLogoSrc } : null}
  menu={menu}
  actions={actions}
  controls={{ fullscreen: false }}
  pinned={pinned}
  maximized={isMaximized}
  fullscreen={isFullscreen}
  onControl={(control) => win[control]()}
  concealed={hidden}
/>`;

const Overview = overviewStory({
  component: 'WindowTitleBar',
  description: 'The title bar of a frameless desktop app window. The brand sits in the middle of the whole bar, whatever the two ends hold: the app logo on both sides of the title, and a Status pill naming a second instance, such as a dev build, with its own logo. menu takes menu groups, the same data DropdownMenu takes, and the bar draws the hamburger at the left end with the menu hanging from it. The pin and the full screen, minimize, maximize and close buttons are built in and report to onControl; controls turns any of them off except close, as in controls={{ fullscreen: false }}. actions adds more: each one is declared once, with a label, an icon and onSelect, and shows in the bar as an icon button, or as a status pill while its status is set, such as Update available. Everything the bar shows is also in the menu, always: the pin and full screen as check items in a View sub-menu, and each action as an item, its status as the subtitle. The group of the bar sits just above the last group of menu. As the window narrows, the bar items hide one by one, the action buttons first, then the pin, then the status pills, then full screen; then the title goes, then the logo shrinks, and only when even the small logo has no room does the middle stay empty. Minimize, maximize and close never hide. The bar drags the window. The concealed prop tucks it away, and so does full screen, until the pointer comes near the top edge; an open menu keeps it in view.',
  playground: Playground,
  variants: [AppWindow, Narrow, FewerButtons, SecondInstance, Maximized, Concealed],
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
  code: CODE,
});

export default meta;
export { AppWindow, Concealed, FewerButtons, Maximized, Narrow, Overview, Playground, SecondInstance };
