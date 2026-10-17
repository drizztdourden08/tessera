/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Box } from '../../primitives/Box';
import { ScreenLayer } from '../ScreenLayer';
import { useTopOnlyCheck } from './behavior/useTopOnlyCheck';
import { useWindowLock } from './behavior/useWindowLock';
import { WindowCorner } from './sub-components/WindowCorner';
import { WindowTop } from './sub-components/WindowTop';
import type { ScreenWindowProps } from './ScreenWindow.type';
import './ScreenWindow.css';

const ScreenWindow = (props: ScreenWindowProps) => {
  const { title, onClose, children, header, titleRow = true, floating, hidden, size, square, className } = props;
  const titleId = useId();
  useTopOnlyCheck(props);
  const bare = !titleRow && header === undefined;
  const lock = useWindowLock(props, bare);
  const label = bare && typeof title === 'string' ? title : undefined;
  const classes = ['screen-window', header && 'screen-window--header', bare && 'screen-window--bare', className].filter(Boolean).join(' ');

  return (
    <ScreenLayer
      onClose={onClose}
      floating={floating}
      corner={bare ? <WindowCorner lock={lock} onClose={onClose} /> : undefined}
      move={lock.move}
      tight={bare}
      hidden={hidden}
      size={size}
      square={square}
      label={label}
      labelledBy={label === undefined ? titleId : undefined}
    >
      <Box className={classes}>
        <WindowTop {...props} bare={bare} titleId={titleId} named={label !== undefined} />
        <Box className="screen-window__content">{children}</Box>
      </Box>
    </ScreenLayer>
  );
};

export { ScreenWindow };
