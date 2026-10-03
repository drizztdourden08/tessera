/* @layer stories @kind story */
import { useState } from 'react';
import type { ReactNode } from 'react';
import { SideNav, SettingsPage, WindowTitleBar } from '../../../src/composites';
import type { WindowControl } from '../../../src/composites';
import { Box, Icon, IconButton, P } from '../../../src/primitives';
import { brandLogoUri } from './brand-logo';
import { ROTP_RAIL, ROTP_SCREENS, rotpMenu } from './rotp-shell';

type RotpWindowProps = { profiles: ReactNode };

const LOGO = brandLogoUri('rotp');

const TITLE_SLOTS = (
  <>
    <IconButton variant="ghost" size="sm" label="Search (Ctrl+K)"><Icon name="search" size={14} /></IconButton>
    <IconButton variant="ghost" tone="danger" size="sm" label="Report a bug"><Icon name="bug" size={14} /></IconButton>
    <IconButton variant="ghost" size="sm" label="Mute"><Icon name="volume-2" size={14} /></IconButton>
  </>
);

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
        left={TITLE_SLOTS}
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
