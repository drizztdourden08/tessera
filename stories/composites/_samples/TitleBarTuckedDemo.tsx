/* @layer stories @kind component */
import { useState } from 'react';
import { DropdownMenu, WindowTitleBar } from '../../../src/composites';
import type { MenuGroup, WindowTitleBarAction, WindowTitleBarItemId, WindowTitleBarTucked } from '../../../src/composites';
import { titleBarMenu } from '../../../src/composites/WindowTitleBar/behavior/title-bar-menu';
import { titleBarStrings } from '../../../src/composites/WindowTitleBar/behavior/title-bar-strings';
import { Box, Text } from '../../../src/primitives';
import { useTesseraStrings } from '../../../src/primitives/TesseraProvider/behavior/useTesseraStrings';

interface TitleBarTuckedDemoProps {
  title: string;
  logo: string;
  menu: readonly MenuGroup[];
  actions: readonly WindowTitleBarAction[];
  rows?: { tucked: WindowTitleBarTucked; caption: string };
}

const ignore = () => undefined;

const CAPTION = 'At 400 px the bar tucks the pin and full screen away; with view={false} its main menu lists them first in its own group.';

const TitleBarTuckedDemo = (props: TitleBarTuckedDemoProps) => {
  const { title, logo, menu, actions, rows } = props;
  const { windows, common } = useTesseraStrings();
  const [heard, setHeard] = useState<{ tucked: readonly WindowTitleBarItemId[]; calls: number }>({ tucked: [], calls: 0 });
  const { tucked, calls } = heard;
  const onFitChange = (list: readonly WindowTitleBarItemId[]) => setHeard((last) => ({ tucked: list, calls: last.calls + 1 }));
  const input = { menu, actions, view: false, tucked, pin: true, fullscreenButton: true, pinned: false, fullscreen: false, onControl: ignore, strings: titleBarStrings(windows, common) } as const;

  return (
    <Box className="story-column">
      <Text variant="caption">{rows?.caption ?? CAPTION}</Text>
      <Box className="window-title-bar-story__strip window-title-bar-story__strip--400">
        <WindowTitleBar title={title} logo={logo} menu={menu} actions={actions} view={false} tucked={rows?.tucked} onFitChange={onFitChange} onControl={ignore} />
      </Box>
      <Text variant="caption">{`onFitChange ran ${calls} ${calls === 1 ? 'time' : 'times'}, last with: ${tucked.join(', ')}`}</Text>
      {rows ? (
        <Box className="window-title-bar-story__menus">
          <Box className="story-column">
            <Text variant="caption">The main menu by default</Text>
            <DropdownMenu inline label="The main menu by default" groups={titleBarMenu(input)} />
          </Box>
          <Box className="story-column">
            <Text variant="caption">The main menu with these tucked rows</Text>
            <DropdownMenu inline label="The main menu with these tucked rows" groups={titleBarMenu({ ...input, tuckedRows: rows.tucked })} />
          </Box>
        </Box>
      ) : <DropdownMenu inline label="The main menu of this bar" groups={titleBarMenu(input)} />}
    </Box>
  );
};

export { TitleBarTuckedDemo };
