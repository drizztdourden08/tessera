/* @layer stories @kind story */
import { useState } from 'react';
import type { ReactNode } from 'react';
import { SideNav, SettingsPage, WindowTitleBar } from '../../../src/composites';
import type { WindowControl, WindowTitleBarAction } from '../../../src/composites';
import { Box, Icon, P } from '../../../src/primitives';
import { brandLogoUri } from './brand-logo';
import { ROTP_RAIL, ROTP_SCREENS, rotpMenu } from './rotp-shell';

type RotpWindowProps = { profiles: ReactNode };

const LOGO = brandLogoUri('rotp');

const TITLE_ACTIONS: WindowTitleBarAction[] = [
  { id: 'search', icon: 'search', label: 'Search', shortcut: 'Ctrl+K', onSelect: () => undefined },
  { id: 'report-bug', icon: 'bug', label: 'Report a bug', tone: 'danger', onSelect: () => undefined },
  { id: 'mute', icon: 'volume-2', label: 'Mute', onSelect: () => undefined },
];

const RotpWindow = ({ profiles }: RotpWindowProps) => {
  const [screen, setScreen] = useState('profiles');
  const [maximized, setMaximized] = useState(true);
  const [pinned, setPinned] = useState(false);
  const onControl = (control: WindowControl) => {
    if (control === 'maximize') setMaximized(!maximized);
    if (control === 'pin') setPinned(!pinned);
  };
  const page = ROTP_SCREENS.find((entry) => entry.id === screen);
  return (
    <Box className="rotp-window">
      <WindowTitleBar
        title="Relic of the Past"
        logo={LOGO}
        menu={rotpMenu(setScreen)}
        menuLabel="Relic of the Past menu"
        actions={TITLE_ACTIONS}
        maximized={maximized}
        pinned={pinned}
        onControl={onControl}
      />
      <Box className="rotp-window__body">
        <SideNav variant="rail" ariaLabel="Data" config={ROTP_RAIL} activeId={screen} onSelect={setScreen} />
        <Box className="rotp-window__page">
          {screen === 'profiles' ? profiles : (
            <SettingsPage icon={<Icon name={page?.icon ?? 'house'} />} title={page?.label ?? screen} scroll={false}>
              <P tone="muted">{page?.blurb}</P>
            </SettingsPage>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export { RotpWindow };
