/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta } from '@storylite/storylite';
import type { PlaygroundStory } from '../_template/controls/playground.type';
import { WindowTitleBar } from '../../src/composites';
import type { WindowControl, WindowControlsConfig, WindowTitleBarProps } from '../../src/composites';
import { Box, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { brandLogoUri } from './_samples/brand-logo';
import { buildTitleMenu } from './_samples/data-title-menu';
import { titleBarActions } from './_samples/title-bar-actions';
import { ARGS, ARG_TYPES } from './_samples/title-bar-args.constants';
import type { TitleBarArgs } from './_samples/title-bar-args.type';
import type { TitleBarGroupLook } from './_samples/title-bar-group.type';
import { TitleBarFrameRate } from './_samples/TitleBarFrameRate';
import { TitleBarGroupDemo } from './_samples/TitleBarGroupDemo';
import { TitleBarViewDemo } from './_samples/TitleBarViewDemo';
import { TitleBarWidths } from './_samples/TitleBarWidths';
import { TITLE_BAR_CODE } from './_samples/title-bar-code.constants';
import { DisabledActions } from './_samples/title-bar-disabled-story';
import { Morph } from './_samples/title-bar-morph-story';
import { TuckedRowsPlaced } from './_samples/title-bar-tucked-rows-story';
import { ViewHiddenNarrow } from './_samples/title-bar-tucked-story';
import { ViewStates } from './_samples/title-bar-view-states-story';
import './WindowTitleBar.stories.css';

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
  close: args.closeButton,
});

const TitleBarDemo = (props: TitleBarArgs & { maximized?: boolean; noControls?: boolean }) => {
  const { title, withLogo, instanceName, withMenu, withActions, updateAvailable, pulse, concealed } = props;
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
        actions={withActions ? titleBarActions(pick, updateAvailable ? 'Update available' : null, pulse) : undefined}
        controls={props.noControls === true ? false : controlsOf(props)}
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

const NoControls = {
  name: 'No window buttons, for a host without them',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <TitleBarDemo {...args} noControls />,
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

const groupStory = (name: string, look?: TitleBarGroupLook) => ({
  name,
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <TitleBarGroupDemo title={args.title} logo={LOGO} menu={STATE_MENU} look={look} />,
} satisfies PlaygroundStory<TitleBarArgs>);

const OwnMenu = groupStory('An action with its own menu, and a status that pulses');

const FrameRate = {
  name: 'A status that counts, like a frame rate',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <TitleBarFrameRate title={args.title} logo={LOGO} menu={STATE_MENU} />,
} satisfies PlaygroundStory<TitleBarArgs>;

const MarkedMenu = groupStory('A dropdown action with a tone and an effect, on the bar and folded', { tone: 'warning', effect: 'ping' });

const viewStory = (name: string, view: WindowTitleBarProps['view'], code: string, caption: string) => ({
  name,
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <TitleBarViewDemo title={args.title} logo={LOGO} menu={STATE_MENU} actions={STATE_ACTIONS} view={view} code={code} caption={caption} />,
} satisfies PlaygroundStory<TitleBarArgs>);

const ViewHidden = viewStory('View hidden from the main menu', false, 'view={false}', 'The pin and full screen stay on the bar; the main menu no longer lists them.');

const ViewMoved = viewStory('View moved among the main menu items', { group: 'tools', position: 1 }, "view={{ group: 'tools', position: 1 }}", 'View becomes the second item of the tools group, between Tools and Settings.');

const renderState = (props: StateProps) => (
  <Box className="window-title-bar-story__strip">
    <WindowTitleBar title="Brock Demo" logo={LOGO} menu={STATE_MENU} actions={STATE_ACTIONS} onControl={ignore} {...(props as Partial<WindowTitleBarProps>)} />
  </Box>
);

const Overview = overviewStory({
  component: 'WindowTitleBar',
  description: 'The title bar of a frameless desktop app window: the brand in the middle, a menu on the left, window buttons on the right.',
  points: [
    '`menu` takes [DropdownMenu] groups; `view` hides its View sub-menu or moves it; `onControl` hears the buttons.',
    '`actions` add icon buttons with a tooltip of their label and `shortcut`; `tone` and `effect` mark the icon; `disabled` makes one inert.',
    "`bar: 'dropdown'` opens a menu of its own from `groups`; `bar: 'volume'` draws a [VolumeControl].",
    "A `bar: 'status'` action shows `status` as text with digits of one width; `pulse` adds a beating dot.",
    'Narrow windows move items into the menu, a dropdown as a sub-menu; `controls` hides buttons, `false` all.',
    '`concealed` and full screen tuck the bar away until the pointer nears the top, focus enters it or [[Alt]] is tapped.',
  ],
  playground: Playground,
  variants: [AppWindow, DisabledActions, Morph, Narrow, OwnMenu, FrameRate, MarkedMenu, Resizable, FewerButtons, NoControls, SecondInstance, Maximized, Concealed, ViewHidden, ViewMoved, ViewHiddenNarrow, ViewStates, TuckedRowsPlaced],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      { ...STATE.hover, name: 'Hover on a control', target: '.window-title-bar__control' },
      { ...STATE.hover, name: 'Hover on close', target: '.window-title-bar__control--close' },
      { ...STATE.hover, name: 'Hover on the menu', target: '.menu-button' },
      { ...STATE.focus, target: '.window-title-bar__control' },
      { name: 'Pinned', props: { pinned: true } },
      { name: 'Status pulse', props: { actions: titleBarActions(ignore, 'Downloading', true) } },
      { name: 'Instance', props: { instance: { name: 'Dev', logo: DEV_LOGO } } },
      { name: 'Maximized', props: { maximized: true } },
      { name: 'Concealed', props: { concealed: true, peek: false } },
      { name: 'Peek', props: { concealed: true, peek: true } },
    ],
  },
  code: TITLE_BAR_CODE,
});

export default meta;
export {
  AppWindow, Concealed, DisabledActions, FewerButtons, FrameRate, MarkedMenu, Maximized, Morph, Narrow, NoControls, Overview, OwnMenu, Playground, Resizable, SecondInstance, TuckedRowsPlaced, ViewHidden, ViewHiddenNarrow, ViewMoved, ViewStates,
};
