/* @layer stories @kind data */
const TITLE_BAR_CODE = `import { WindowTitleBar } from '@drizztdourden08/tessera';
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

export { TITLE_BAR_CODE };
