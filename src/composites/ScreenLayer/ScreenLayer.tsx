/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Overlay } from '../../primitives/Overlay';
import { useLayerEscape } from './behavior/useLayerEscape';
import { useLayerFocus } from './behavior/useLayerFocus';
import type { ScreenLayerProps } from './ScreenLayer.type';
import './ScreenLayer.css';

const ScreenLayer = (props: ScreenLayerProps) => {
  const { children, onClose, floating, hidden = false, size = 'fill', square = false, label, labelledBy, className = '' } = props;
  const classes = ['screen-layer', `screen-layer--${size}`, hidden ? 'screen-layer--hidden' : '', square ? 'screen-layer--square' : ''].filter(Boolean).join(' ');
  const focus = useLayerFocus(!hidden, labelledBy);
  useLayerEscape(hidden ? null : focus.node, onClose);

  return (
    <Overlay ref={focus.layerRef} visible tone="clear" className={classes}>
      <Box className="screen-layer__inset">
        <Box
          ref={focus.ref}
          className="screen-layer__frame"
          role="dialog"
          aria-modal="true"
          aria-label={label}
          aria-labelledby={labelledBy}
          tabIndex={-1}
          onKeyDown={focus.onKeyDown}
        >
          {floating != null && <Box className="screen-layer__floating">{floating}</Box>}
          <Box className={`screen-layer__card${className ? ` ${className}` : ''}`}>
            {children}
          </Box>
        </Box>
      </Box>
    </Overlay>
  );
};

export { ScreenLayer };
