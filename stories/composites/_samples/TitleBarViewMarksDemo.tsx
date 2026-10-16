/* @layer stories @kind component */
import { useState } from 'react';
import { DropdownMenu, WindowTitleBar } from '../../../src/composites';
import type { MenuGroup, MenuNode, WindowControl, WindowTitleBarAction } from '../../../src/composites';
import { titleBarMenu } from '../../../src/composites/WindowTitleBar/behavior/title-bar-menu';
import { VIEW_ITEM_ID } from '../../../src/composites/WindowTitleBar/WindowTitleBar.constants';
import { Box, Text } from '../../../src/primitives';
import { useTesseraStrings } from '../../../src/primitives/TesseraProvider/behavior/useTesseraStrings';

interface TitleBarViewMarksDemoProps {
  title: string;
  logo: string;
  menu: readonly MenuGroup[];
  actions: readonly WindowTitleBarAction[];
}

const ignore = () => undefined;

const VIEW_STATES = [
  { id: 'off', caption: 'Not pinned, not in full screen', pinned: false, fullscreen: false },
  { id: 'pinned', caption: 'Pinned', pinned: true, fullscreen: false },
  { id: 'fullscreen', caption: 'Pinned and in full screen', pinned: true, fullscreen: true },
] as const;

const TitleBarViewMarksDemo = (props: TitleBarViewMarksDemoProps) => {
  const { title, logo, menu, actions } = props;
  const { windows } = useTesseraStrings();
  const [pinned, setPinned] = useState(false);
  const onControl = (control: WindowControl) => control === 'pin' && setPinned((on) => !on);
  const viewOf = (state: (typeof VIEW_STATES)[number]): readonly MenuNode[] => {
    const groups = titleBarMenu({ menu, actions, pin: true, fullscreenButton: true, pinned: state.pinned, fullscreen: state.fullscreen, onControl: ignore, strings: windows });
    const view = groups.flatMap((group) => group.items).find((node) => 'id' in node && node.id === VIEW_ITEM_ID);
    return view && 'children' in view ? view.children ?? [] : [];
  };

  return (
    <Box className="story-column">
      <Text variant="caption">Pin and full screen are actions: the label and icon say what a pick does, and no check mark is drawn.</Text>
      <Box className="window-title-bar-story__strip window-title-bar-story__strip--720">
        <WindowTitleBar title={title} logo={logo} menu={menu} actions={actions} pinned={pinned} onControl={onControl} />
      </Box>
      <Box className="window-title-bar-story__menus">
        {VIEW_STATES.map((state) => (
          <Box key={state.id} className="story-column">
            <Text variant="caption">{state.caption}</Text>
            <DropdownMenu inline label={`${windows.view}, ${state.caption}`} groups={[{ id: 'view', label: windows.view, items: viewOf(state) }]} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export { TitleBarViewMarksDemo };
