/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Box } from '../../primitives/Box';
import { titleBarClass } from './behavior/title-bar-class';
import { useOpenMenus } from './behavior/useOpenMenus';
import { usePeek } from './behavior/usePeek';
import { useTitleBarLayout } from './behavior/useTitleBarLayout';
import { WindowControls } from './sub-components/WindowControls';
import { WindowTitleBarBrand } from './sub-components/WindowTitleBarBrand';
import { WindowTitleBarStart } from './sub-components/WindowTitleBarStart';
import { FULLSCREEN_ITEM, MAIN_MENU_ID } from './WindowTitleBar.constants';
import type { WindowTitleBarProps } from './WindowTitleBar.type';
import './WindowTitleBar.css';

const WindowTitleBar = (props: WindowTitleBarProps) => {
  const { title, logo, instance, menuLabel, onMenuOpenChange, maximized, fullscreen = false, pinned, onControl, concealed = false, peek, className = '' } = props;
  const barRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLElement>(null);
  const { groups, actions, controls, hidden, brand } = useTitleBarLayout(props, barRef, brandRef);
  const menus = useOpenMenus();
  const handleMenuOpenChange = (open: boolean): void => {
    menus.report(MAIN_MENU_ID, open);
    onMenuOpenChange?.(open);
  };
  const tucked = (concealed || fullscreen) && !menus.anyOpen;
  const { peeking, focused, handlers } = usePeek(tucked, barRef, peek === undefined);

  return (
    <Box ref={barRef} className={titleBarClass(tucked, (peek ?? peeking) || focused, className)} data-app-region="drag" {...handlers}>
      <WindowTitleBarStart
        menu={groups}
        menuLabel={menuLabel}
        onMenuOpenChange={handleMenuOpenChange}
        onActionMenuChange={menus.report}
        pin={controls.pin !== false}
        pinned={pinned}
        onControl={onControl}
        actions={actions}
        hidden={hidden}
      />
      <WindowTitleBarBrand ref={brandRef} title={title} logo={logo} instance={instance} fit={brand} />
      <WindowControls controls={controls} maximized={maximized} fullscreen={fullscreen} fullscreenAway={hidden.has(FULLSCREEN_ITEM)} onControl={onControl} />
    </Box>
  );
};

export { WindowTitleBar };
