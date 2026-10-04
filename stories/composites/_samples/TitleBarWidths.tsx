/* @layer stories @kind component */
import { DropdownMenu, WindowTitleBar } from '../../../src/composites';
import type { MenuGroup, WindowTitleBarAction } from '../../../src/composites';
import { titleBarMenu } from '../../../src/composites/WindowTitleBar/behavior/title-bar-menu';
import { Box, Text } from '../../../src/primitives';
import { useTesseraStrings } from '../../../src/primitives/TesseraProvider/behavior/useTesseraStrings';
import { TITLE_BAR_STEPS } from './title-bar-steps.constants';

interface TitleBarWidthsProps {
  title: string;
  logo: string;
  menu: readonly MenuGroup[];
  actions: readonly WindowTitleBarAction[];
}

const ignore = () => undefined;

const TitleBarWidths = (props: TitleBarWidthsProps) => {
  const { title, logo, menu, actions } = props;
  const { windows } = useTesseraStrings();
  const groups = titleBarMenu({ menu, actions, pin: true, fullscreenButton: true, pinned: true, fullscreen: false, onControl: ignore, strings: windows });
  const view = groups.flatMap((group) => group.items).find((node) => 'children' in node && node.label === windows.view);

  return (
    <Box className="story-column">
      {TITLE_BAR_STEPS.map((step) => (
        <Box key={step.width} className="window-title-bar-story__step">
          <Text variant="caption">{step.note}</Text>
          <Box className={`window-title-bar-story__strip window-title-bar-story__strip--${step.width}`}>
            <WindowTitleBar title={title} logo={logo} menu={menu} actions={actions} pinned onControl={ignore} />
          </Box>
        </Box>
      ))}
      <Text variant="caption">The menu holds every bar item, always: the View sub-menu with the pin and full screen, Check for updates with its status as the subtitle, and Report a bug.</Text>
      <Box className="window-title-bar-story__menus">
        <DropdownMenu inline label="Menu" groups={groups} />
        {view && 'children' in view && <DropdownMenu inline label={windows.view} groups={[{ id: 'view', label: windows.view, items: view.children ?? [] }]} />}
      </Box>
    </Box>
  );
};

export { TitleBarWidths };
