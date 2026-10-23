/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Box } from '../../primitives/Box';
import { ScreenLayer } from '../ScreenLayer';
import { useTopOnlyCheck } from './behavior/useTopOnlyCheck';
import { useWindowLock } from './behavior/useWindowLock';
import { windowClasses } from './behavior/window-classes';
import { windowName } from './behavior/window-name';
import { WindowCorner } from './sub-components/WindowCorner';
import { WindowTop } from './sub-components/WindowTop';
import type { ScreenWindowProps } from './ScreenWindow.type';
import './ScreenWindow.css';

const ScreenWindow = (props: ScreenWindowProps) => {
  const { onClose, children, floating, hidden, size, square } = props;
  const titleId = useId();
  useTopOnlyCheck(props);
  const { bare, legend, label, named } = windowName(props, titleId);
  const lock = useWindowLock(props, bare);

  return (
    <ScreenLayer
      onClose={onClose}
      floating={floating}
      corner={bare ? <WindowCorner lock={lock} onClose={onClose} title={legend} /> : undefined}
      move={lock.move}
      tight={bare}
      hidden={hidden}
      size={size}
      square={square}
      label={label}
      labelledBy={label === undefined ? titleId : undefined}
    >
      <Box className={windowClasses(props, bare)}>
        <WindowTop {...props} bare={bare} titleId={titleId} named={named} />
        <Box className="screen-window__content">{children}</Box>
      </Box>
    </ScreenLayer>
  );
};

export { ScreenWindow };
