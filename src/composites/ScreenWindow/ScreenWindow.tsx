/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Box } from '../../primitives/Box';
import { ScreenLayer } from '../ScreenLayer';
import { WindowHeader } from '../WindowHeader';
import type { ScreenWindowProps } from './ScreenWindow.type';
import './ScreenWindow.css';

const ScreenWindow = (props: ScreenWindowProps) => {
  const { title, onClose, children, subtitle, extra, floating, hidden, size, square, className = '' } = props;
  const titleId = useId();

  return (
    <ScreenLayer floating={floating} hidden={hidden} size={size} square={square} labelledBy={titleId}>
      <Box className={`screen-window${className ? ` ${className}` : ''}`}>
        <WindowHeader title={title} titleId={titleId} subtitle={subtitle} extra={extra} onClose={onClose} className="screen-window__header" />
        <Box className="screen-window__content">{children}</Box>
      </Box>
    </ScreenLayer>
  );
};

export { ScreenWindow };
