/* @layer renderer-components @kind component */
import { useRef, useState } from 'react';
import { Box } from '../../primitives/Box';
import { titleBarClass } from './behavior/title-bar-class';
import { usePeek } from './behavior/usePeek';
import { WindowControls } from './sub-components/WindowControls';
import { WindowTitleBarBrand } from './sub-components/WindowTitleBarBrand';
import { WindowTitleBarStart } from './sub-components/WindowTitleBarStart';
import type { WindowTitleBarProps } from './WindowTitleBar.type';
import './WindowTitleBar.css';

const WindowTitleBar = (props: WindowTitleBarProps) => {
  const {
    title, logo, instance, menu, menuLabel, controls = {}, maximized, fullscreen = false,
    pinned, onControl, left, concealed = false, peek, className = '',
  } = props;
  const barRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const tucked = (concealed || fullscreen) && !menuOpen;
  const { peeking, handleMouseLeave } = usePeek(tucked && peek === undefined, barRef);

  return (
    <Box ref={barRef} className={titleBarClass(tucked, peek ?? peeking, className)} onMouseLeave={handleMouseLeave}>
      <WindowTitleBarStart
        menu={menu}
        menuLabel={menuLabel}
        onMenuOpenChange={setMenuOpen}
        pin={controls.pin !== false}
        pinned={pinned}
        onControl={onControl}
        left={left}
      />
      <WindowTitleBarBrand title={title} logo={logo} instance={instance} />
      <WindowControls controls={controls} maximized={maximized} fullscreen={fullscreen} onControl={onControl} />
    </Box>
  );
};

export { WindowTitleBar };
