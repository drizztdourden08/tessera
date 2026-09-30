/* @layer renderer-components @kind component */
import { useRef } from 'react';
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
    title, logo, instance = null, menu, menuOpen = false, menuAnchorRef, pinned = false, onPinToggle, left,
    concealed = false, peek, className = '', ...controls
  } = props;
  const barRef = useRef<HTMLElement>(null);
  const tucked = (concealed || controls.fullscreen === true) && !menuOpen;
  const { peeking, handleMouseLeave } = usePeek(tucked && peek === undefined, barRef);

  return (
    <Box ref={barRef} className={titleBarClass(tucked, peek ?? peeking, className)} onMouseLeave={handleMouseLeave}>
      <WindowTitleBarStart menu={menu} menuAnchorRef={menuAnchorRef} pinned={pinned} onPinToggle={onPinToggle} left={left} />
      <WindowTitleBarBrand title={title} logo={logo} instance={instance} />
      <WindowControls {...controls} />
    </Box>
  );
};

export { WindowTitleBar };
