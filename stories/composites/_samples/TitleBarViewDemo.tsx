/* @layer stories @kind component */
import { DropdownMenu, WindowTitleBar } from '../../../src/composites';
import type { MenuGroup, MenuNode, WindowTitleBarAction, WindowTitleBarProps } from '../../../src/composites';
import { titleBarMenu } from '../../../src/composites/WindowTitleBar/behavior/title-bar-menu';
import { titleBarStrings } from '../../../src/composites/WindowTitleBar/behavior/title-bar-strings';
import { Box, Text } from '../../../src/primitives';
import { useTesseraStrings } from '../../../src/primitives/TesseraProvider/behavior/useTesseraStrings';

interface TitleBarViewDemoProps {
  title: string;
  logo: string;
  menu: readonly MenuGroup[];
  actions: readonly WindowTitleBarAction[];
  view: WindowTitleBarProps['view'];
  viewItems?: readonly MenuNode[];
  caption: string;
  code: string;
}

const ignore = () => undefined;

const TitleBarViewDemo = (props: TitleBarViewDemoProps) => {
  const { title, logo, menu, actions, view, viewItems, caption, code } = props;
  const { windows, common } = useTesseraStrings();
  const input = { menu, actions, pin: true, fullscreenButton: true, pinned: false, fullscreen: false, onControl: ignore, strings: titleBarStrings(windows, common) };

  return (
    <Box className="story-column">
      <Text variant="caption">{caption}</Text>
      <Box className="window-title-bar-story__strip window-title-bar-story__strip--720">
        <WindowTitleBar title={title} logo={logo} menu={menu} actions={actions} view={view} viewItems={viewItems} onControl={ignore} />
      </Box>
      <Box className="window-title-bar-story__menus">
        <Box className="story-column">
          <Text variant="caption">The main menu by default</Text>
          <DropdownMenu inline label="The main menu by default" groups={titleBarMenu(input)} />
        </Box>
        <Box className="story-column">
          <Text variant="caption">{`The main menu with ${code}`}</Text>
          <DropdownMenu inline label={`The main menu with ${code}`} groups={titleBarMenu({ ...input, view, viewItems })} />
        </Box>
      </Box>
    </Box>
  );
};

export { TitleBarViewDemo };
