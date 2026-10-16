/* @layer stories @kind component */
import { useState } from 'react';
import { DropdownMenu, WindowTitleBar } from '../../../src/composites';
import type { MenuGroup, WindowTitleBarAction, WindowTitleBarItemId } from '../../../src/composites';
import { titleBarMenu } from '../../../src/composites/WindowTitleBar/behavior/title-bar-menu';
import { Box, Text } from '../../../src/primitives';
import { useTesseraStrings } from '../../../src/primitives/TesseraProvider/behavior/useTesseraStrings';

interface TitleBarTuckedDemoProps {
  title: string;
  logo: string;
  menu: readonly MenuGroup[];
  actions: readonly WindowTitleBarAction[];
}

const ignore = () => undefined;

const TitleBarTuckedDemo = (props: TitleBarTuckedDemoProps) => {
  const { title, logo, menu, actions } = props;
  const { windows } = useTesseraStrings();
  const [heard, setHeard] = useState<{ tucked: readonly WindowTitleBarItemId[]; calls: number }>({ tucked: [], calls: 0 });
  const { tucked, calls } = heard;
  const onFitChange = (list: readonly WindowTitleBarItemId[]) => setHeard((last) => ({ tucked: list, calls: last.calls + 1 }));
  const groups = titleBarMenu({ menu, actions, view: false, tucked, pin: true, fullscreenButton: true, pinned: false, fullscreen: false, onControl: ignore, strings: windows });

  return (
    <Box className="story-column">
      <Text variant="caption">{'At 400 px the bar tucks the pin and full screen away; with view={false} its main menu lists them first in its own group.'}</Text>
      <Box className="window-title-bar-story__strip window-title-bar-story__strip--400">
        <WindowTitleBar title={title} logo={logo} menu={menu} actions={actions} view={false} onFitChange={onFitChange} onControl={ignore} />
      </Box>
      <Text variant="caption">{`onFitChange ran ${calls} ${calls === 1 ? 'time' : 'times'}, last with: ${tucked.join(', ')}`}</Text>
      <DropdownMenu inline label="The main menu of this bar" groups={groups} />
    </Box>
  );
};

export { TitleBarTuckedDemo };
