/* @layer stories @kind component */
import { useState } from 'react';
import { DropdownMenu, WindowTitleBar } from '../../../src/composites';
import type { MenuGroup } from '../../../src/composites';
import { titleBarMenu } from '../../../src/composites/WindowTitleBar/behavior/title-bar-menu';
import { Box, Text } from '../../../src/primitives';
import { useTesseraStrings } from '../../../src/primitives/TesseraProvider/behavior/useTesseraStrings';
import { groupActions } from './title-bar-group-action';
import type { TitleBarGroupLook } from './title-bar-group.type';

interface TitleBarGroupDemoProps {
  title: string;
  logo: string;
  menu: readonly MenuGroup[];
  look?: TitleBarGroupLook;
}

const ignore = () => undefined;

const TitleBarGroupDemo = (props: TitleBarGroupDemoProps) => {
  const { title, logo, menu, look } = props;
  const { windows } = useTesseraStrings();
  const [group, setGroup] = useState(0);
  const [sync, setSync] = useState(true);
  const [said, setSaid] = useState('Nothing picked yet.');
  const actions = groupActions({
    group,
    sync,
    syncing: true,
    onGroup: (next) => {
      setGroup(next);
      setSaid(next === 0 ? 'Left the window group.' : `Joined group ${next}.`);
    },
    onSync: () => setSync((on) => !on),
    onBug: () => setSaid('Report a bug picked.'),
    onSaves: () => setSaid('Cloud saves picked.'),
  }, look);
  const groups = titleBarMenu({ menu: [], actions, pin: false, fullscreenButton: false, pinned: false, fullscreen: false, onControl: ignore, strings: windows });
  const folded = groups.flatMap((entry) => entry.items).find((node) => 'children' in node && node.id === 'window-group');

  return (
    <Box className="story-column">
      <Text variant="caption">Window group opens its own menu under its button. Syncing saves pulses while the work runs.</Text>
      <Box className="window-title-bar-story__strip window-title-bar-story__strip--720">
        <WindowTitleBar title={title} logo={logo} menu={menu} actions={actions} pinned onControl={ignore} />
      </Box>
      <Text variant="caption">{said}</Text>
      <Text variant="caption">At 400 px every item moves to the main menu: Window group becomes a sub-menu with the same items.</Text>
      <Box className="window-title-bar-story__strip window-title-bar-story__strip--400">
        <WindowTitleBar title={title} logo={logo} menu={menu} actions={actions} pinned onControl={ignore} />
      </Box>
      <Box className="window-title-bar-story__menus">
        {look && <DropdownMenu inline label={windows.view} groups={groups} />}
        {folded && 'children' in folded && <DropdownMenu inline label={folded.label} groups={[{ id: 'folded', label: folded.label, items: folded.children ?? [] }]} />}
      </Box>
    </Box>
  );
};

export { TitleBarGroupDemo };
