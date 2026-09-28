/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Box } from '../../primitives/Box';
import { WindowHeader } from '../WindowHeader';
import './FullScreenLayer.css';
import { type FullScreenLayerProps } from './FullScreenLayer.type';

const FullScreenLayer = (props: FullScreenLayerProps) => {
  const { children, onClose, hidden, title, subtitle, extra, floating } = props;
  const titleId = useId();

  return (
    <Box className={`fullscreen-layer${hidden ? ' fullscreen-layer--hidden' : ''}`}>
      <Box className="fullscreen-layer__frame">
        <Box className="fullscreen-layer__card" role="dialog" aria-modal="true" aria-labelledby={title ? titleId : undefined}>
          <WindowHeader title={title} titleId={titleId} subtitle={subtitle} extra={extra} onClose={onClose} className="fullscreen-layer__header" />
          <Box className="fullscreen-layer__content">
            {children}
          </Box>
        </Box>
        {floating && <Box className="fullscreen-layer__floating">{floating}</Box>}
      </Box>
    </Box>
  );
};

export {
  FullScreenLayer,
};
