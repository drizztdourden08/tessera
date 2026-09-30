/* @layer stories @kind story */
import { useRef, useState } from 'react';
import type { RefObject } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { DropdownMenu, WindowTitleBar } from '../../src/composites';
import type { MenuEntry, WindowTitleBarProps } from '../../src/composites';
import { Box, Icon, IconButton, Status, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { brandLogoUri } from './_samples/brand-logo';
import './WindowTitleBar.stories.css';

type TitleBarArgs = {
  title: string;
  withLogo: boolean;
  instanceName: string;
  withMenu: boolean;
  withSlots: boolean;
  concealed: boolean;
};

const LOGO = brandLogoUri('brock');
const DEV_LOGO = brandLogoUri('tessera');

const MENU: MenuEntry[] = [
  { key: 'about', label: 'About', icon: <Icon name="info" size={14} /> },
  { key: 'updates', label: 'Check for updates', icon: <Icon name="refresh-cw" size={14} /> },
  'separator',
  { key: 'settings', label: 'Settings', icon: <Icon name="settings" size={14} /> },
];

const ignore = () => undefined;

const TitleBarMenu = (props: { open: boolean; onToggle: () => void; anchorRef: RefObject<HTMLElement | null> }) => {
  const { open, onToggle, anchorRef } = props;
  const items = MENU.map((entry) => (entry === 'separator' ? entry : { ...entry, onClick: onToggle }));
  return (
    <>
      <IconButton size="sm" label="Menu" active={open} onClick={onToggle}>
        <Icon name="ellipsis-vertical" />
      </IconButton>
      {open && <DropdownMenu items={items} anchorRef={anchorRef} />}
    </>
  );
};

const SLOTS = (
  <>
    <IconButton tone="danger" size="sm" label="Report a bug"><Icon name="bug" size={14} /></IconButton>
    <Status tone="success" pulse>Update available</Status>
  </>
);

const TitleBarDemo = (props: TitleBarArgs & { maximized?: boolean }) => {
  const { title, withLogo, instanceName, withMenu, withSlots, concealed } = props;
  const [menuOpen, setMenuOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [maximized, setMaximized] = useState(props.maximized === true);
  const [fullscreen, setFullscreen] = useState(false);
  const [said, setSaid] = useState('Nothing pressed yet.');
  const menuRef = useRef<HTMLElement>(null);
  const toggleMenu = () => setMenuOpen((open) => !open);

  return (
    <Box className="story-frame window-title-bar-story__frame">
      <WindowTitleBar
        title={title}
        logo={withLogo ? LOGO : undefined}
        instance={instanceName ? { name: instanceName, logo: DEV_LOGO } : null}
        menu={withMenu ? <TitleBarMenu open={menuOpen} onToggle={toggleMenu} anchorRef={menuRef} /> : undefined}
        menuOpen={menuOpen}
        menuAnchorRef={menuRef}
        pinned={pinned}
        onPinToggle={() => setPinned((on) => !on)}
        left={withSlots ? SLOTS : undefined}
        maximized={maximized}
        fullscreen={fullscreen}
        onFullscreenToggle={() => setFullscreen((on) => !on)}
        onMinimize={() => setSaid('Minimize pressed.')}
        onMaximizeToggle={() => setMaximized((on) => !on)}
        onClose={() => setSaid('Close pressed.')}
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
  title: 'Brock Demo', withLogo: true, instanceName: '', withMenu: true, withSlots: true, concealed: false,
};

const ARG_TYPES: StoryLiteArgTypes<TitleBarArgs> = {
  title: { control: 'text' },
  withLogo: { control: 'boolean' },
  instanceName: { control: 'text', description: 'Names a second copy of the app, such as a dev build, in a Status pill.' },
  withMenu: { control: 'boolean' },
  withSlots: { control: 'boolean' },
  concealed: { control: 'boolean' },
};

const meta = {
  title: 'Composites · Navigation/WindowTitleBar',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<TitleBarArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <TitleBarDemo {...args} />,
} satisfies StoryLiteStoryDefinition<TitleBarArgs>;

const AppWindow = {
  name: 'App window',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <TitleBarDemo {...args} />,
} satisfies StoryLiteStoryDefinition<TitleBarArgs>;

const SecondInstance = {
  name: 'Second instance',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <TitleBarDemo {...args} instanceName="Dev" withSlots={false} />,
} satisfies StoryLiteStoryDefinition<TitleBarArgs>;

const Maximized = {
  name: 'Maximized, no slots',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <TitleBarDemo {...args} maximized withMenu={false} withSlots={false} />,
} satisfies StoryLiteStoryDefinition<TitleBarArgs>;

const Concealed = {
  name: 'Concealed until the pointer nears it',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <TitleBarDemo {...args} concealed />,
} satisfies StoryLiteStoryDefinition<TitleBarArgs>;

const renderState = (props: StateProps) => (
  <Box className="window-title-bar-story__strip">
    <WindowTitleBar
      title="Brock Demo"
      logo={LOGO}
      menu={(
        <IconButton size="sm" label="Menu" active={props.menuOpen === true}>
          <Icon name="ellipsis-vertical" />
        </IconButton>
      )}
      onPinToggle={ignore}
      onFullscreenToggle={ignore}
      onMinimize={ignore}
      onMaximizeToggle={ignore}
      onClose={ignore}
      {...(props as Partial<WindowTitleBarProps>)}
    />
  </Box>
);

const CODE = `import { WindowTitleBar } from '@drizztdourden08/tessera';

<WindowTitleBar
  title="Brock Demo"
  logo={logoSrc}
  instance={instanceName ? { name: instanceName, logo: instanceLogoSrc } : null}
  menu={<IconButton label="Menu" active={menuOpen} onClick={toggleMenu}>...</IconButton>}
  menuOpen={menuOpen}
  menuAnchorRef={menuRef}
  pinned={pinned}
  onPinToggle={togglePin}
  left={<UpdateStatus />}
  maximized={isMaximized}
  fullscreen={isFullscreen}
  onFullscreenToggle={win.toggleFullscreen}
  onMinimize={win.minimize}
  onMaximizeToggle={win.toggleMaximize}
  onClose={win.close}
  concealed={hidden}
/>`;

const Overview = overviewStory({
  component: 'WindowTitleBar',
  description: 'The title bar of a frameless desktop app window. The brand sits in the middle: the app logo on both sides of the title, and a Status pill naming a second instance, such as a dev build, with its own logo. The left end holds the menu trigger, a pin to keep the window on top and any slots the app adds; the right end holds the full screen, minimize, maximize and close buttons, each shown when its callback is set. The bar drags the window. The concealed prop tucks it away, and so does full screen, until the pointer comes near the top edge; an open menu keeps it in view.',
  playground: Playground,
  variants: [AppWindow, SecondInstance, Maximized, Concealed],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      { ...STATE.hover, name: 'Hover on a control', target: '.window-title-bar__control' },
      { ...STATE.hover, name: 'Hover on close', target: '.window-title-bar__control--close' },
      { ...STATE.focus, target: '.window-title-bar__control' },
      { name: 'Menu open', props: { menuOpen: true } },
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
export { AppWindow, Concealed, Maximized, Overview, Playground, SecondInstance };
